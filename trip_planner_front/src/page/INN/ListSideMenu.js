import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ListSideMenu = () => {
  const [innAddr, setInnAddr] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookGuest, setBookGuest] = useState("");
  return (
    <div className="sideMenu-wrap">
      <div className="search-wrap">
        <div className="search-title">검색조건</div>
        <div className="search-place">
          <span className="place-title">장소</span>
          <input type="text" id="innAddr"></input>
        </div>
        <div className="search-day">
          <span className="place-title">날짜</span>
          <DateWrap />
        </div>
      </div>
    </div>
  );
};
const DateWrap = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DemoItem
          label="체크인 날짜를 선택해주세요"
          slotProps={{ textField: { size: "small" } }}
          format="YYYY / MM / DD"
        >
          <DatePicker />
        </DemoItem>
        <DemoItem label="체크아웃 날짜를 선택해주세요">
          <DatePicker maxDate={dayjs("2099-03-31")} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default ListSideMenu;
