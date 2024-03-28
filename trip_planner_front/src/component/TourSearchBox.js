import React from "react";
import { Button } from "./FormFrm";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./tourSearchBox.css";

const TourSearchBox = () => {
  const [startDate, setStartDate] = React.useState(dayjs());

  return (
    <div className="tour-search-wrap">
      <div className="tour-search">
        <span className="material-icons">search</span>
        <input type="text" placeholder="도시, 상품명으로 검색해주세요." />
      </div>
      <div className="calendar-wrap">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              format="YYYY년 MM월 DD일"
              label="이용일"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              showDaysOutsideCurrentMonth
              disablePast
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Button text="검색" class="btn_primary sm" />
    </div>
  );
};

export default TourSearchBox;
