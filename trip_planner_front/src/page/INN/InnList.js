import React, { useEffect, useRef, useState } from "react";
import ListSideMenu from "./ListSideMenu";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

const InnList = (props) => {
  const location = useLocation();
  console.log(location.state);
  const place = location.state.detailPlace;
  const checkInDay = dayjs(location.state.detailCheckIn, "YYYY-MM-DD").toDate();
  const checkOutDay = dayjs(
    location.state.detailCheckOut,
    "YYYY-MM-DD"
  ).toDate();
  const bookPeople = location.state.detailPeople;
  const [innList, setInnList] = useState([]);
  console.log(innList);
  console.log(checkInDay);
  console.log(checkOutDay);
  //리뷰,별점,낮은가격,높은가격 순으로 보여주기 위한 기능
  const [optionSort, setOptionSort] = useState([
    {
      text: "리뷰순",
      value: "review",
      active: true,
    },
    {
      text: "별점순",
      value: "star",
      active: false,
    },
    {
      text: "낮은가격순",
      value: "low-price",
      active: false,
    },
    {
      text: "높은가격순",
      value: "high-price",
      active: false,
    },
  ]);
  const navigate = useNavigate();
  const InnDetailView = () => {
    navigate("/innDetailView");
  };

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [innAddr, setInnAddr] = useState(place);
  const [checkInDate, setCheckInDate] = useState(checkInDay);
  const [checkOutDate, setCheckOutDate] = useState(checkOutDay);
  const [bookGuest, setBookGuest] = useState(bookPeople);
  const [roomPrice, setRoomPrice] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [innType, setInnType] = useState();
  const [hashTag, setHashTag] = useState([]);
  const [option, setOption] = useState([]);
  const [selectSort, setSelectSort] = useState("review");
  console.log(checkInDate);
  console.log(checkOutDate);
  const checkIn = dayjs(checkInDate).format("YYYY-MM-DD"); //date picker로 받아온 체크인 날짜
  const checkOut = dayjs(checkOutDate).format("YYYY-MM-DD"); //date picker로 받아온 체크아웃 날짜
  useEffect(() => {
    searchInn();
  }, [innType, minPrice, maxPrice, innType, hashTag, option, selectSort]);
  const searchInn = () => {
    console.log("조회 시작~");
    if (innAddr && checkInDate && checkOutDate && bookGuest) {
      const searchInnList = {
        innAddr: innAddr,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        bookGuest: bookGuest,
        minPrice: minPrice,
        maxPrice: maxPrice,
        innType: innType,
        selectSort: selectSort,
      };
      console.log(hashTag);
      console.log(option);
      console.log(innType);
      console.log(checkIn);
      console.log(checkOut);
      console.log(innAddr);
      console.log(bookGuest);
      console.log(minPrice);
      console.log(maxPrice);
      console.log(searchInnList);
      console.log(selectSort);
      if (hashTag.length != 0) {
        searchInnList.hashTag = hashTag;
      }
      if (option.length != 0) {
        searchInnList.option = option;
      }
      axios
        .post(backServer + "/inn/innList", searchInnList)
        .then((res) => {
          console.log(res.data.data);
          setInnList(res.data.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const selectOptionSort = (index) => {
    const copySortOption = [...optionSort];
    copySortOption[index].active = !copySortOption[index].active;
    let sort = "";
    copySortOption.forEach((item, i) => {
      if (i !== index) {
        item.active = false;
      }
      if (item.active) {
        sort = item.value;
      }
    });

    setOptionSort(copySortOption);
    setSelectSort(sort);
    sortMenu.current.classList.add("hidden");
  };

  console.log(selectSort);
  const sortMenu = useRef();
  const openSortMenu = () => {
    if (sortMenu) {
      sortMenu.current.classList.remove("hidden");
    } else {
      sortMenu.current.classList.add("hidden");
    }
  };
  return (
    <section className="contents">
      <h2 className="hidden">숙소</h2>
      <div className="inn-wrap">
        <ListSideMenu
          innAddr={innAddr}
          setInnAddr={setInnAddr}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          bookGuest={bookGuest}
          setBookGuest={setBookGuest}
          roomPrice={roomPrice}
          setRoomPrice={setRoomPrice}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          innType={innType}
          setInnType={setInnType}
          hashTag={hashTag}
          setHashTag={setHashTag}
          option={option}
          setOption={setOption}
          buttonFunction={searchInn}
          checkIn={checkIn}
          checkOut={checkOut}
        />

        <div className="inn-list-wrap">
          <div className="inn-list-wrap-top">
            <div>
              <span className="searchArea">'{innAddr}' 로 검색한 결과</span>
            </div>
            <div className="sort-option-box">
              <div className="default-sort-option" onClick={openSortMenu}>
                <span className="material-icons">swap_vert</span>
                <span className="default-option">
                  {optionSort.map((item, i) => {
                    return (
                      <React.Fragment key={"sort" + i}>
                        {item.active ? item.text : ""}
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
              <div className="sort-option-menu hidden" ref={sortMenu}>
                <ul>
                  {optionSort.map((item, index) => {
                    return (
                      <li
                        key={"item" + index}
                        value={item.value}
                        onClick={() => selectOptionSort(index)}
                        id="sort-option"
                      >
                        {item.active === true ? (
                          <div className="sort active">
                            <span>{item.text}</span>
                            <span className="material-icons">check</span>
                          </div>
                        ) : (
                          <div className="sort">
                            <span>{item.text}</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="inn-list-wrap">
            <div className="inn-box-wrap">
              {innList.map((item, index) => {
                return (
                  <InnListBox
                    key={"innItem" + index}
                    innItem={item}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="innDetailView hidden">
          <button
            type="button"
            className="btn_primary outline"
            onClick={InnDetailView}
          >
            숙소상세
          </button>
        </div>
      </div>
    </section>
  );
};

const InnListBox = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const innItem = props.innItem;
  const index = props.index;
  return (
    <div className="inn-box">
      <div className="inn-img-box">
        <img src={backServer + "/inn/innList/" + innItem.filepath} />
      </div>
      <div className="content-box">
        <div className="inn-name">{innItem.partnerName}</div>
        <div className="inn-addr">{innItem.innAddr}</div>
        <div className="like-review">
          <span className="like-box">{innItem.likeCount}</span>
          <span className="review-box">{innItem.reviewCount}개의 리뷰</span>
        </div>
        <div className="inn-price">{innItem.roomPrice.toLocaleString()}원</div>
      </div>
    </div>
  );
};
export default InnList;
