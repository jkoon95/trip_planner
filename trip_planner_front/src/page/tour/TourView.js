import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const TourView = (props) => {
  const isLogin = props.isLogin;
  const params = useParams();
  const tourNo = params.tourNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [tour, setTour] = useState({});
  const [ticket, setTicket] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/tour/view/" + tourNo)
      .then((res) => {
        const { tourList, ticketList } = res.data.data;
        setTour(tourList[0]);
        setTicket(ticketList[0]);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleTitleClick = () => {
    navigate("/tourList");
  };

  let tourTypeText;
  switch (tour.tourType) {
    case 1:
      tourTypeText = "전시회";
      break;
    case 2:
      tourTypeText = "액티비티";
      break;
    case 3:
      tourTypeText = "테마파크";
      break;
    case 4:
      tourTypeText = "박람회";
      break;
    case 5:
      tourTypeText = "티켓·입장권";
      break;
    default:
      tourTypeText = "기타";
  }
  const salesPeriod = tour.salesPeriod ? tour.salesPeriod.substring(0, 10) : "";
  const simpleTourAddr = tour.tourAddr ? tour.tourAddr.slice(0, 2) : "";

  const [startDate, setStartDate] = React.useState(dayjs());

  return (
    <section className="contents">
      <div className="tour-view-prev" onClick={handleTitleClick}>
        <span className="material-icons">reply</span>
        <h5>투어 리스트 목록으로</h5>
      </div>
      <div className="tour-view-wrap">
        <div className="tour-view-top">
          <div className="tour-view-thumbnail">
            {tour.tourImg === null || tour.tourImg === "null" ? (
              <img src="/images/테마파크.jpg" />
            ) : (
              <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
            )}
          </div>
          <div className="tour-view-info">
            <div className="tour-view-badge">
              <span className="badge gray">{tourTypeText}</span>
              <span className="badge gray">~ {salesPeriod}</span>
            </div>
            <div className="tour-view-name">
              [{simpleTourAddr}] {tour.tourName}
              <img alt="찜버튼" src="/images/투어찜.png" />
            </div>
            <div className="tour-view-type">
              {simpleTourAddr} {tourTypeText}
            </div>
            <div className="tour-view-star">
              <span className="material-icons">star</span>
            </div>
            <div className="tour-view-price">
              {ticket && ticket.ticketAdult
                ? ticket.ticketAdult.toLocaleString() + " 원"
                : "무료"}
            </div>
            <div className="tour-view-guide">
              <div className="tour-view-guide-icon">
                <span className="material-icons">
                  confirmation_number
                  <span>국내 투어 · 티켓 3% 할인</span>
                </span>
              </div>
              <div className="tour-view-guide-icon">
                <span className="material-icons">
                  info
                  <span>예약 유의사항</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="tour-view-content-wrap">
          <div className="tour-view-menu">
            <div className="tour-view-menu-item">옵션예약</div>
            <div className="tour-view-menu-item">상품소개</div>
            <div className="tour-view-menu-item">이용정보</div>
          </div>
          <div className="tour-view-content">
            <div className="tour-view-content-title">
              <h4>옵션예약</h4>
            </div>
            <div className="tour-view-calendar">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DateCalendar
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    showDaysOutsideCurrentMonth
                    disablePast
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="tour-view-book-wrap">
              <div className="tour-view-book-title">
                <h3>예약날짜</h3>
                <div className="tour-view-book-date">
                  <span>{startDate.format("YYYY년 MM월 DD일")}</span>
                </div>
              </div>
              <div className="tour-view-book-title">
                <h3>수량/인원</h3>
                <div className="tour-view-book-ticket">
                  <span>입장권 성인</span>
                  <span>
                    {ticket && ticket.ticketAdult
                      ? ticket.ticketAdult.toLocaleString() + " 원"
                      : "무료"}
                  </span>
                  <span class="material-icons">add_box</span>
                  <span class="material-icons">indeterminate_check_box</span>
                  <span>입장권 청소년</span>
                  <span>
                    {ticket && ticket.ticketYouth
                      ? ticket.ticketYouth.toLocaleString() + " 원"
                      : "무료"}
                  </span>
                  <span>입장권 어린이</span>
                  <span>
                    {ticket && ticket.ticketChild
                      ? ticket.ticketChild.toLocaleString() + " 원"
                      : "무료"}
                  </span>
                </div>
              </div>
            </div>
            <div className="tour-view-content-title">
              <h4>상품소개</h4>
            </div>
            <div className="tour-view-content-title">
              <h4>이용정보</h4>
            </div>
            <div className="tour-view-content-title">
              <h4>리뷰</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourView;
