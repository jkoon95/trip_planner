import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./innMain.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ListSideMenu = () => {
  const [innAddr, setInnAddr] = useState("");
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [bookGuest, setBookGuest] = useState("");
  const [innType, setInnType] = useState([]);
  const [roomPrice, setRoomPrice] = useState("");
  const [optionNo, setOptionNo] = useState();
  const [hashTagNo, setHashTagNo] = useState();

  const checkIn = dayjs(checkInDate).format("YYYY-MM-DD"); //date picker로 받아온 체크인 날짜
  const checkOut = dayjs(checkOutDate).format("YYYY-MM-DD"); //date picker로 받아온 체크아웃 날짜

  const searchInn = () => {
    //장소, 날짜, 인원 선택 후 검색 버튼 누르면 해당하는 리스트 출력하는 함수
    console.log(checkIn);
    console.log(checkOut);
  };
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
          />
        </div>
        <div className="search-day">
          <span className="place-title">날짜</span>
          <DateWrap
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
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
            class="btn_primary md"
            onClick={searchInn}
          >
            검색
          </Button>
        </div>
      </div>
      <div className="filter-wrap">
        <div className="filter-title">
          <h3>숙소 유형</h3>
        </div>
        <div className="inn-type-filter">
          <CheckBoxInput
            type="checkbox"
            content="hotel"
            name="innType"
            value={1}
          />
          <label htmlFor="hotel">호텔</label>
        </div>
        <div className="inn-type-filter">
          <CheckBoxInput
            type="checkbox"
            content="resort"
            name="innType"
            value={2}
          />
          <label htmlFor="resort">리조트</label>
        </div>
        <div className="inn-type-filter">
          <CheckBoxInput
            type="checkbox"
            content="pension"
            name="innType"
            value={3}
          />
          <label htmlFor="pension">펜션</label>
        </div>
        <div className="inn-type-filter">
          <CheckBoxInput
            type="checkbox"
            content="guest-house"
            name="innType"
            value={4}
          />
          <label htmlFor="guest-house">게스트하우스</label>
        </div>
      </div>
      <div className="price-wrap">
        <div className="price-title">
          <h3>가격</h3>
        </div>
        <div className="price-range">
          <PriceRange />
        </div>
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
          defaultValue={dayjs(new Date())}
          format="YYYY-MM-DD"
          value={checkInDate}
          onChange={changeCheckInDate}
        />
        <DatePicker
          label="체크아웃"
          format="YYYY-MM-DD"
          value={checkOutDate}
          onChange={changeCheckOutDate}
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
    />
  );
};

const CheckBoxInput = (props) => {
  const type = props.type;
  const contents = props.content;
  const name = props.name;
  const value = props.value;

  return (
    <input
      className="checkbox-input"
      type={type}
      name={name}
      id={contents}
      value={value}
    />
  );
};

function valuetext(value) {
  return `${value}원`;
}

const PriceRange = () => {
  const [value, setValue] = useState([0, 100]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const handleChange = (event, newValue) => {
    let max = 500000;
    let min = 0;
    //const max = newValue[1] * 10000;
    if (newValue[1] === 100 && newValue[0] === 0) {
      console.log("50만원 이상");
      max = 500000;
      min = 0;
    } else if (newValue[1] === 80 && newValue[0] === 20) {
      console.log("40만원 이하");
      max = 400000;
      min = 100000;
    } else if (newValue[1] === 60 && newValue[0] === 40) {
      console.log("30만원 이하");
      max = 300000;
      min = 200000;
    } else if (newValue[1] === 40 && newValue[0] === 60) {
      console.log("20만원 이하");
      max = 200000;
      min = 300000;
    } else if (newValue[1] === 20 && newValue[0] === 80) {
      console.log("10만원 이하");
      max = 100000;
      min = 400000;
    }
    setMinPrice(min);
    setMaxPrice(max);
    setValue(newValue);
    console.log(newValue);
  };
  console.log(minPrice, maxPrice);
  console.log(value);
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          step={20}
        />
      </Box>
      <div>
        {minPrice} ~ {maxPrice}
      </div>
    </>
  );
};
export default ListSideMenu;
