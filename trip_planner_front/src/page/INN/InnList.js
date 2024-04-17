import React, { useEffect, useRef, useState } from "react";
import ListSideMenu from "./ListSideMenu";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import Pagination from "../../component/Pagination";
import InnDetailView from "./InnDetailView";
import Swal from "sweetalert2";

const InnList = (props) => {
  const naviGate = useNavigate();
  const isLogin = props.isLogin;
  const location = useLocation();
  if (location.state == null) {
    const defaultPlace = "";
    const defaultCheckInDay = "";
    const defaultCheckOutDay = "";
    const defaultBookPeople = "";
    location.state = {
      detailPlace: defaultPlace,
      detailCheckIn: defaultCheckInDay,
      detailCheckOut: defaultCheckOutDay,
      detailPeople: defaultBookPeople,
    };
  }
  const place = location.state.detailPlace;
  const checkInDay = dayjs(location.state.detailCheckIn, "YYYY-MM-DD").toDate();
  const checkOutDay = dayjs(
    location.state.detailCheckOut,
    "YYYY-MM-DD"
  ).toDate();
  const bookPeople = location.state.detailPeople;
  const [innList, setInnList] = useState([]);
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
  const checkIn = dayjs(checkInDate).format("YYYY-MM-DD"); //date picker로 받아온 체크인 날짜
  const checkOut = dayjs(checkOutDate).format("YYYY-MM-DD"); //date picker로 받아온 체크아웃 날짜

  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    searchInn();
  }, [minPrice, maxPrice, selectSort, reqPage, innType, hashTag, option]);
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      title: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    }).then(() => {
      naviGate("/");
    });
  }
  const searchInn = () => {
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
        reqPage: reqPage,
      };

      if (hashTag.length != 0) {
        searchInnList.hashTag = hashTag;
      }
      if (option.length != 0) {
        searchInnList.option = option;
      }
      axios
        .post(backServer + "/inn/innList", searchInnList)
        .then((res) => {
          const updatedInnList = res.data.data.selectInnList.map((item) => ({
            ...item,
            bookGuest: Number(bookGuest),
          }));
          setInnList(updatedInnList);
          setPageInfo(res.data.data.pi);
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

  const sortMenu = useRef();
  const openSortMenu = () => {
    if (sortMenu) {
      sortMenu.current.classList.toggle("hidden");
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
              {innAddr == "" ? (
                <span className="seachArea">지역과 날짜를 선택해주세요</span>
              ) : (
                <span className="searchArea">'{innAddr}' 로 검색한 결과</span>
              )}
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
                    clickEvent={InnDetailView}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                );
              })}
            </div>
          </div>
          <div className="inn-Page">
            {innAddr == "" ? (
              ""
            ) : (
              <Pagination
                pageInfo={pageInfo}
                reqPage={reqPage}
                setReqPage={setReqPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const InnListBox = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const innItem = props.innItem;
  const index = props.index;
  const addrSpilt = innItem.innAddr.split(" ");
  const clickEvent = props.clickEvent;
  const navigate = useNavigate();
  const checkInDate = props.checkInDate;
  const checkOutDate = props.checkOutDate;

  const likeRef = useRef();
  const likeCount = (innNo) => {
    console.log(innNo);
    if (likeRef.current) {
      if (innItem.likeCount < 1) {
        axios
          .post(backServer + "/inn/likeUpdate/" + innNo)
          .then((res) => {
            console.log(res.data);
            likeRef.current.classList.toggle("active-btn");
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  };
  const InnDetailView = () => {
    const innNo = innItem.innNo;
    const bookGuest = innItem.bookGuest;
    const checkInOutDates = {
      checkInDate: dayjs(checkInDate).format("YYYY-MM-DD"),
      checkOutDate: dayjs(checkOutDate).format("YYYY-MM-DD"),
      bookGuest: bookGuest,
    };
    navigate("/innDetailView/" + innNo, { state: checkInOutDates });
  };
  return (
    <div className="inn-box">
      <div className="inn-img-box" onClick={InnDetailView}>
        <img src={backServer + "/inn/innList/" + innItem.filepath} />
      </div>
      <div className="content-box">
        {innItem.innType === 1 ? (
          <div className="inn-type">호텔</div>
        ) : innItem.innType === 2 ? (
          <div className="inn-type">리조트</div>
        ) : innItem.innType === 3 ? (
          <div className="inn-type">펜션</div>
        ) : innItem.innType === 4 ? (
          <div className="inn-type">게스트하우스</div>
        ) : (
          ""
        )}
        <div className="inn-name" onClick={clickEvent}>
          {innItem.partnerName}
        </div>
        {/*<div className="inn-addr">{innItem.innAddr}</div> */}
        <div className="inn-addr2">{addrSpilt[1]}</div>
        {innItem.reviewStar !== 0 ? (
          <div className="review-star">
            <span className="material-icons star">star</span>
            <span className="review-star-avg">
              {innItem.reviewStar.toFixed(1)}
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="like-review">
          {/* <span className="like-box">{innItem.likeCount}개의 찜</span> */}
          <span className="material-icons icon">reviews</span>
          <span className="review-box">{innItem.reviewCount}개의 리뷰</span>
        </div>
        <div className="inn-price">{innItem.roomPrice.toLocaleString()}원</div>
        {innItem.likeCount >= 1 ? (
          <div className="like-btn" value={innItem.innNo}>
            <span
              className="material-icons active-btn"
              onClick={() => likeCount(innItem.innNo)}
              ref={likeRef}
            >
              favorite_border
            </span>
          </div>
        ) : (
          <div className="like-btn" value={innItem.innNo}>
            <span
              className="material-icons"
              onClick={() => likeCount(innItem.innNo)}
              ref={likeRef}
            >
              favorite_border
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default InnList;
