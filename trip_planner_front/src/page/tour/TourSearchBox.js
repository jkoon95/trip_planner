import React, { useState } from "react";
import { Button } from "../../component/FormFrm";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./tourSearchBox.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TourSearchBox = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate;

  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = React.useState(dayjs());

  const searchBtn = () => {
    if (searchText !== "") {
      const form = new FormData();
      form.append("tourName", searchText);
      form.append("salesPeriod", startDate);

      axios
        .get(backServer, "/tour/tourSearch", form)
        .then((res) => {
          if (res.data.message === "success") {
            console.log(res.data.message);
          } else {
            Swal.fire("검색중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire("검색어를 입력해주세요.");
    }
  };

  return (
    <div className="tour-search-wrap">
      <div className="tour-search">
        <label htmlFor="searchInput">
          <span className="material-icons">search</span>
        </label>
        <input
          id="searchInput"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="도시, 상품명으로 검색해주세요."
        />
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
      <Button text="검색" clickEvent={searchBtn} class="btn_primary sm" />
    </div>
  );
};

export default TourSearchBox;
