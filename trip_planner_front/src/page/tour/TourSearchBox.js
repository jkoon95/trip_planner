import React, { useState } from "react";
import { Button } from "../../component/FormFrm";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./tourSearchBox.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const TourSearchBox = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = React.useState(dayjs());
  const [tourList, setTourList] = useState([]);
  const [ticketList, setTicketList] = useState([]);

  const searchBtn = () => {
    if (searchText !== "") {
      const data = {
        searchText: searchText,
        startDate: startDate.format("YYYY-MM-DD"),
      };

      axios
        .post(backServer + "/tour/tourSearch", data)
        .then((res) => {
          if (res.data.message === "success") {
            setTourList(res.data.data.tourList);
            setTicketList(res.data.data.ticketList);
            navigate("/tourSearch", {
              state: {
                tourList: res.data.data.tourList,
                ticketList: res.data.data.ticketList,
              },
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire("검색어를 입력해주세요.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchBtn();
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
          onKeyDown={handleKeyDown}
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
