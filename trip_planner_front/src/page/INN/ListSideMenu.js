import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./innMain.css";

const ListSideMenu = () => {
  const [innAddr, setInnAddr] = useState("");
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [bookGuest, setBookGuest] = useState("");
  return (
    <div className="sideMenu-wrap">
      <div className="search-wrap">
        <div className="search-title">
          <h3>검색조건</h3>
        </div>
        <div className="search-place">
          <span className="place-title">장소</span>
          <input type="text" id="innAddr"></input>
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
      </div>
    </div>
  );
};
const DateWrap = (props) => {
  const checkInDate = props.checkInDate;
  const setCheckInDate = props.setCheckInDate;
  const checkOutDate = props.checkOutDate;
  const setCheckOutDate = props.setCheckOutDate;
  const changeCheckInDate = (e) => {
    setCheckInDate(e.target.value);
  };
  const changeCheckOutDate = (e) => {
    setCheckOutDate(e.target.value);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker, DatePicker"]}>
        <DatePicker
          label="체크인"
          defaultValue={dayjs(new Date())}
          format="YYYY-MM-DD"
          value={checkInDate}
          onChange={changeCheckInDate}
        />
        <DatePicker label="체크아웃" />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ListSideMenu;
