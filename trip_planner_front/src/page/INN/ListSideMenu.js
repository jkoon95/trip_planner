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
  const [roomPrice, setRoomPrice] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const checkIn = dayjs(checkInDate).format("YYYY-MM-DD"); //date picker로 받아온 체크인 날짜
  const checkOut = dayjs(checkOutDate).format("YYYY-MM-DD"); //date picker로 받아온 체크아웃 날짜

  const [hashTageMenu, setHashTagMenu] = useState([
    {
      text: "#가족여행",
      active: false,
      value: 1,
    },
    {
      text: "#스파",
      active: false,
      value: 2,
    },
    {
      text: "#파티",
      active: false,
      value: 3,
    },
    {
      text: "#뷰맛집",
      active: false,
      value: 4,
    },
    {
      text: "#연인추천",
      active: false,
      value: 5,
    },
    {
      text: "#감성숙소",
      active: false,
      value: 6,
    },
    {
      text: "#사진맛집",
      active: false,
      value: 7,
    },
    {
      text: "#야경",
      active: false,
      value: 8,
    },
    {
      text: "#반려견동반",
      active: false,
      value: 9,
    },
    {
      text: "#온수풀",
      active: false,
      value: 10,
    },
    {
      text: "#BBQ",
      active: false,
      value: 11,
    },
    {
      text: "#호캉스",
      active: false,
      value: 12,
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
  ]);

  const [innTypeList, setInnTypeList] = useState([
    {
      text: "호텔",
      content: "hotel",
      defaultValue: 1,
      name: "innType",
      type: "checkbox",
      checked: false,
    },
    {
      text: "리조트",
      content: "resort",
      defaultValue: 2,
      name: "innType",
      type: "checkbox",
      checked: false,
    },
    {
      text: "펜션",
      content: "pension",
      defaultValue: 3,
      name: "innType",
      type: "checkbox",
      checked: false,
    },
    {
      text: "게스트하우스",
      content: "guest-house",
      defaultValue: 4,
      name: "innType",
      type: "checkbox",
      checked: false,
    },
  ]);
  const searchInn = () => {
    //장소, 날짜, 인원 선택 후 검색 버튼 누르면 해당하는 리스트 출력하는 함수
    console.log(checkIn);
    console.log(checkOut);
    console.log(innAddr);
    console.log(bookGuest);
  };
  // const array = new Array();
  // hashTageMenu.forEach((item) => {
  //   if (item.active) {
  //     array.push(item.value);
  //   }
  // });
  // const array = hashTageMenu.map((item) => {
  //   if (item.active) {
  //     return item.value;
  //   }
  // });

  const searchInnOption = () => {
    console.log(innTypeList);
    console.log(hashTageMenu);
    console.log(optionMenu);
    console.log(checkIn);
    console.log(checkOut);
    console.log(innAddr);
    console.log(bookGuest);
    console.log(minPrice);
    console.log(maxPrice);
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
        <CheckBoxInput
          innTypeList={innTypeList}
          setInnTypeList={setInnTypeList}
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
            <TagComponent tageMenu={hashTageMenu} setTagMenu={setHashTagMenu} />
          </div>
        </div>
      </div>
      <div className="hashTag-wrap">
        <div className="hashTag-title">
          <h3>공통옵션</h3>
        </div>
        <div className="hashTag-content">
          <div className="hashTag">
            <TagComponent tageMenu={optionMenu} setTagMenu={setOptionMenu} />
          </div>
        </div>
      </div>
      <div className="btn_area">
        <Button
          text="btn_primary md"
          class="btn_primary md"
          onClick={searchInnOption}
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
          defaultValue={dayjs(new Date())}
          format="YYYY-MM-DD"
          value={checkInDate}
          onChange={changeCheckInDate}
          disablePast
        />
        <DatePicker
          label="체크아웃"
          format="YYYY-MM-DD"
          value={checkOutDate}
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
  const innTypeList = props.innTypeList;
  const setInnTypeList = props.setInnTypeList;
  return (
    <>
      {innTypeList.map((item, index) => {
        const selectInnType = () => {
          innTypeList[index].checked = !innTypeList[index].checked;
          setInnTypeList([...innTypeList]);
        };
        return (
          <div className="inn-type-filter" key={"item" + index}>
            <input
              className="checkbox-input"
              type={item.type}
              name={item.name}
              id={item.content}
              checked={item.checked}
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
  const tageMenu = props.tageMenu;
  const setTagMenu = props.setTagMenu;
  const selectValue = (index) => {
    const copyHashTagMenu = [...tageMenu];
    copyHashTagMenu[index].active = !copyHashTagMenu[index].active;
    setTagMenu(copyHashTagMenu);
  };
  return (
    <ul>
      {tageMenu.map((item, index) => {
        const selectValue = (index) => {
          const copyHashTagMenu = [...tageMenu];
          copyHashTagMenu[index].active = !copyHashTagMenu[index].active;
          setTagMenu(copyHashTagMenu);
        };
        return (
          <li key={"item" + index}>
            <Button
              className={item.active ? "active-hashTag" : ""}
              value={item.value}
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
