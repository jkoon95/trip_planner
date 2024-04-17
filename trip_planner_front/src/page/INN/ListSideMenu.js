import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./innMain.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ListSideMenu = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const innAddr = props.innAddr;
  const setInnAddr = props.setInnAddr;
  const checkInDate = props.checkInDate;
  const setCheckInDate = props.setCheckInDate;
  const checkOutDate = props.checkOutDate;
  const setCheckOutDate = props.setCheckOutDate;
  const bookGuest = props.bookGuest;
  const setBookGuest = props.setBookGuest;
  const roomPrice = props.roomPrice;
  const setRoomPrice = props.setRoomPrice;
  const minPrice = props.minPrice;
  const setMinPrice = props.setMinPrice;
  const maxPrice = props.maxPrice;
  const setMaxPrice = props.setMaxPrice;
  const innType = props.innType;
  const setInnType = props.setInnType;
  const hashTag = props.hashTag;
  const setHashTag = props.setHashTag;
  const option = props.option;
  const setOption = props.setOption;
  const buttonFunction = props.buttonFunction;
  const checkIn = props.checkIn;
  const checkOut = props.checkOut;

  //숙소리스트 페이지 작업을위한 reqPage state
  const [reqPage, setReqPage] = useState(1);

  const [hashTagMenu, setHashTagMenu] = useState([
    {
      text: "#가족여행",
      active: false,
      value: 0,
    },
    {
      text: "#스파",
      active: false,
      value: 0,
    },
    {
      text: "#파티",
      active: false,
      value: 0,
    },
    {
      text: "#뷰맛집",
      active: false,
      value: 0,
    },
    {
      text: "#연인추천",
      active: false,
      value: 0,
    },
    {
      text: "#감성숙소",
      active: false,
      value: 0,
    },
    {
      text: "#사진맛집",
      active: false,
      value: 0,
    },
    {
      text: "#야경",
      active: false,
      value: 0,
    },
    {
      text: "#반려견동반",
      active: false,
      value: 0,
    },
    {
      text: "#온수풀",
      active: false,
      value: 0,
    },
    {
      text: "#BBQ",
      active: false,
      value: 0,
    },
    {
      text: "#호캉스",
      active: false,
      value: 0,
    },
  ]);

  const [optionMenu, setOptionMenu] = useState([
    {
      text: "사우나",
      active: false,
      value: 1,
    },
    {
      text: "수영장",
      active: false,
      value: 2,
    },
    {
      text: "레스토랑",
      active: false,
      value: 3,
    },
    {
      text: "매점",
      active: false,
      value: 4,
    },
    {
      text: "편의점",
      active: false,
      value: 5,
    },
    {
      text: "피트니스",
      active: false,
      value: 6,
    },
    {
      text: "무료주차",
      active: false,
      value: 7,
    },
    {
      text: "조식포함",
      active: false,
      value: 8,
    },
    {
      text: "객실 내 취사",
      active: false,
      value: 9,
    },
    {
      text: "와이파이",
      active: false,
      value: 10,
    },
    {
      text: "욕실용품",
      active: false,
      value: 11,
    },
    {
      text: "픽업가능",
      active: false,
      value: 12,
    },
    {
      text: "라운지",
      active: false,
      value: 13,
    },
    {
      text: "얼리체크인",
      active: false,
      value: 14,
    },
    {
      text: "에어컨",
      active: false,
      value: 15,
    },
  ]);

  const [innTypeList, setInnTypeList] = useState([
    {
      text: "호텔",
      content: "hotel",
      defaultValue: 1,
      name: "innType",
      type: "radio",
      checked: false,
    },
    {
      text: "리조트",
      content: "resort",
      defaultValue: 2,
      name: "innType",
      type: "radio",
      checked: false,
    },
    {
      text: "펜션",
      content: "pension",
      defaultValue: 3,
      name: "innType",
      type: "radio",
      checked: false,
    },
    {
      text: "게스트하우스",
      content: "guest-house",
      defaultValue: 4,
      name: "innType",
      type: "radio",
      checked: false,
    },
  ]);

  return (
    <div className="sideMenu-wrap">
      <div className="search-wrap">
        <div className="search-title">
          <h3>검색조건</h3>
        </div>
        <div className="search-place">
          <span className="place-title">장소</span>
          <SearchInput
            type="text"
            content="innAddr"
            data={innAddr}
            setData={setInnAddr}
            placeholder="지역명 및 숙소이름으로 입력해주세요"
          />
        </div>
        <div className="search-day">
          <span className="place-title">날짜</span>
          <DateWrap
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </div>
        <div className="search-guest">
          <span className="guest-title">인원</span>
          <SearchInput
            type="text"
            content="bookGuest"
            data={bookGuest}
            setData={setBookGuest}
          />
        </div>
        <div className="btn_area">
          <Button
            text="btn_primary md"
            className="btn_primary md"
            onClick={buttonFunction}
          >
            검색
          </Button>
        </div>
      </div>
      <div className="filter-wrap">
        <div className="filter-title">
          <h3>숙소 유형</h3>
        </div>
        <CheckBoxInput
          innTypeList={innTypeList}
          setInnTypeList={setInnTypeList}
          innType={innType}
          setInnType={setInnType}
        />
      </div>
      <div className="price-wrap">
        <div className="price-title">
          <h3>가격</h3>
        </div>
        <div className="price-range">
          <PriceRange
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      </div>
      <div className="hashTag-wrap">
        <div className="hashTag-title">
          <h3>#해시테그</h3>
        </div>
        <div className="hashTag-content">
          <div className="hashTag">
            <TagComponent
              tagMenu={hashTagMenu}
              setTagMenu={setHashTagMenu}
              hashTag={hashTag}
              setHashTag={setHashTag}
            />
          </div>
        </div>
      </div>
      <div className="hashTag-wrap">
        <div className="hashTag-title">
          <h3>공통옵션</h3>
        </div>
        <div className="hashTag-content">
          <div className="hashTag">
            <TagComponent
              tagMenu={optionMenu}
              setTagMenu={setOptionMenu}
              hashTag={option}
              setHashTag={setOption}
            />
          </div>
        </div>
      </div>
      <div className="btn_area">
        <Button
          text="btn_primary md"
          className="btn_primary md"
          onClick={buttonFunction}
        >
          검색
        </Button>
      </div>
    </div>
  );
};
const DateWrap = (props) => {
  const checkInDate = props.checkInDate;
  const setCheckInDate = props.setCheckInDate;
  const checkOutDate = props.checkOutDate;
  const setCheckOutDate = props.setCheckOutDate;

  const changeCheckInDate = (newValue) => {
    setCheckInDate(newValue);
  };
  const changeCheckOutDate = (newValue) => {
    setCheckOutDate(newValue);
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={{ monthShort: "M" }}
      adapterLocale="ko"
    >
      <DemoContainer components={["DatePicker, DatePicker"]}>
        <DatePicker
          label="체크인"
          format="YYYY-MM-DD"
          value={dayjs(checkInDate)}
          onChange={changeCheckInDate}
          disablePast
        />
        <DatePicker
          label="체크아웃"
          format="YYYY-MM-DD"
          value={dayjs(checkOutDate)}
          onChange={changeCheckOutDate}
          disablePast
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

const SearchInput = (props) => {
  const type = props.type;
  const content = props.content;
  const data = props.data;
  const setData = props.setData;
  const placeholder = props.placeholder;
  const chageData = (e) => {
    setData(e.target.value);
  };
  return (
    <input
      className="input"
      type={type}
      id={content}
      value={data}
      onChange={chageData}
      placeholder={placeholder}
    />
  );
};

const CheckBoxInput = (props) => {
  const innTypeList = props.innTypeList;
  const setInnTypeList = props.setInnTypeList;
  const innType = props.innType;
  const setInnType = props.setInnType;
  return (
    <>
      {innTypeList.map((item, index) => {
        const selectInnType = () => {
          innTypeList.forEach((type) => {
            type.checked = false;
          });
          innTypeList[index].checked = !item.checked;
          setInnTypeList([...innTypeList]);
          let checkedValue = item.defaultValue;
          setInnType(checkedValue);
        };
        return (
          <div className="inn-type-filter" key={"item" + index}>
            <input
              className="checkbox-input"
              type={item.type}
              name={item.name}
              id={item.content}
              checked={item.checked}
              value={item.defaultValue}
              onChange={(e) => {
                selectInnType();
              }}
            />
            <label htmlFor={item.content}>{item.text}</label>
          </div>
        );
      })}
    </>
  );
};

function valuetext(value) {
  return `${value}원`;
}

const PriceRange = (props) => {
  const [value, setValue] = useState([0, 100]);
  const minPrice = props.minPrice;
  const setMinPrice = props.setMinPrice;
  const maxPrice = props.maxPrice;
  const setMaxPrice = props.setMaxPrice;

  const minDistance = 15;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }

    let max = 500000;
    let min = 0;
    //const max = newValue[1] * 10000;
    if (newValue[1] === 100) {
      max = 500000;
    } else if (newValue[1] === 90) {
      max = 400000;
    } else if (newValue[1] === 75) {
      max = 300000;
    } else if (newValue[1] === 60) {
      max = 200000;
    } else if (newValue[1] === 45) {
      max = 100000;
    } else if (newValue[1] === 30) {
      max = 50000;
    } else if (newValue[1] === 15) {
      max = 30000;
    }

    if (newValue[0] === 15) {
      min = 30000;
    } else if (newValue[0] === 30) {
      min = 50000;
    } else if (newValue[0] === 45) {
      min = 100000;
    } else if (newValue[0] === 60) {
      min = 200000;
    } else if (newValue[0] === 75) {
      min = 300000;
    } else if (newValue[0] === 90) {
      min = 400000;
    }
    setMinPrice(min);
    setMaxPrice(max);
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          step={15}
          disableSwap
        />
      </Box>
      <div className="price-check-zone">
        <span>
          {minPrice + "원"} ~ {maxPrice + "원"}
        </span>
      </div>
    </>
  );
};

const TagComponent = (props) => {
  const tagMenu = props.tagMenu;
  const setTagMenu = props.setTagMenu;
  const hashTag = props.hashTag;
  const setHashTag = props.setHashTag;

  return (
    <ul>
      {tagMenu.map((item, index) => {
        const selectValue = (index) => {
          const copyHashTagMenu = [...tagMenu];
          copyHashTagMenu[index].active = !copyHashTagMenu[index].active;
          setTagMenu(copyHashTagMenu);
          let hashTagArr = new Array();
          let optionArr = new Array();
          if (item.value === 0) {
            for (let i = 0; i < copyHashTagMenu.length; i++) {
              if (copyHashTagMenu[i].active == true) {
                hashTagArr.push(copyHashTagMenu[i].text);
              }
            }
            setHashTag(hashTagArr);
          } else {
            for (let i = 0; i < copyHashTagMenu.length; i++) {
              if (copyHashTagMenu[i].active == true) {
                optionArr.push(copyHashTagMenu[i].value);
              }
            }
            setHashTag(optionArr);
          }
        };
        return (
          <li key={"item" + index}>
            <Button
              className={item.active ? "active-hashTag" : ""}
              value={item.text || ""}
              onClick={() => {
                selectValue(index);
              }}
            >
              {item.text}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListSideMenu;
