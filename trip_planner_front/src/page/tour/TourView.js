import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const TourView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const params = useParams();
  const tourNo = params.tourNo;
  const [tour, setTour] = useState({});
  const [ticket, setTicket] = useState({});
  const [member, setMember] = useState(null);
  const [partner, setPartner] = useState({});
  const [reviewContent, setReviewContent] = useState("");
  const [quantity, setQuantity] = useState({
    adult: 0,
    youth: 0,
    child: 0,
  });

  useEffect(() => {
    axios
      .get(backServer + "/tour/view/" + tourNo)
      .then((res) => {
        const { tourList, ticketList, partner } = res.data.data;
        setTour(tourList[0]);
        setTicket(ticketList[0]);
        setPartner(partner[0]);
        // console.log(partner);
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
  const [reviewStar, setReviewStar] = React.useState(5);

  const handleDecreaseQuantity = (type) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [type]: Math.max(0, prevQuantity[type] - 1),
    }));
  };

  const handleIncreaseQuantity = (type) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [type]: prevQuantity[type] + 1,
    }));
  };

  const showPartnerTel = () => {
    Swal.fire({
      icon: "info",
      title: partner.partnerName,
      text:
        "전화번호: " + partner.partnerTel + " 이메일: " + partner.memberEmail,
    });
  };

  const reviewSubmit = () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "로그인 후 이용이 가능합니다.",
        confirmButtonText: "닫기",
      });
    } else if (reviewContent === "") {
      Swal.fire({
        icon: "warning",
        title: "리뷰 내용을 입력해주세요.",
        confirmButtonText: "닫기",
      });
    } else {
      const form = new FormData();
      form.append("reviewContent", reviewContent);
      form.append("reviewStar", reviewStar);
      form.append("tourNo", tourNo);

      axios.post(backServer + "/tour/review");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      reviewSubmit();
    }
  };

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
          <div className="tour-view-badge-zone">
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
          <div className="tour-view-content-title">
            <h4>옵션예약</h4>
          </div>
          <div className="tour-view-content">
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
                  <div className="tour-ticket-type">
                    <div className="tour-ticket-info">
                      <span>입장권 성인</span>
                      <div>
                        <span>
                          {ticket && ticket.ticketAdult
                            ? ticket.ticketAdult.toLocaleString() + " 원"
                            : "무료"}
                        </span>
                      </div>
                    </div>
                    <div className="tour-quantity-controls">
                      <span
                        className="material-icons"
                        onClick={() => handleDecreaseQuantity("adult")}
                      >
                        indeterminate_check_box
                      </span>
                      <span className="tour-book-quantity">
                        {quantity.adult}
                      </span>
                      <span
                        className="material-icons"
                        onClick={() => handleIncreaseQuantity("adult")}
                      >
                        add_box
                      </span>
                    </div>
                  </div>
                  <div className="tour-ticket-type">
                    <div className="tour-ticket-info">
                      <span>입장권 청소년</span>
                      <div>
                        <span>
                          {ticket && ticket.ticketYouth
                            ? ticket.ticketYouth.toLocaleString() + " 원"
                            : "무료"}
                        </span>
                      </div>
                    </div>
                    <div className="tour-quantity-controls">
                      <span
                        className="material-icons"
                        onClick={() => handleDecreaseQuantity("youth")}
                      >
                        indeterminate_check_box
                      </span>
                      <span className="tour-book-quantity">
                        {quantity.youth}
                      </span>
                      <span
                        className="material-icons"
                        onClick={() => handleIncreaseQuantity("youth")}
                      >
                        add_box
                      </span>
                    </div>
                  </div>
                  <div className="tour-ticket-type">
                    <div className="tour-ticket-info">
                      <span>입장권 어린이</span>
                      <div>
                        <span>
                          {ticket && ticket.ticketChild
                            ? ticket.ticketChild.toLocaleString() + " 원"
                            : "무료"}
                        </span>
                      </div>
                    </div>
                    <div className="tour-quantity-controls">
                      <span
                        className="material-icons"
                        onClick={() => handleDecreaseQuantity("child")}
                      >
                        indeterminate_check_box
                      </span>
                      <span className="tour-book-quantity">
                        {quantity.child}
                      </span>
                      <span
                        className="material-icons"
                        onClick={() => handleIncreaseQuantity("child")}
                      >
                        add_box
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tour-book-btn-zone">
                <button className="btn_primary md handle-book-btn">
                  예약하기
                </button>
              </div>
            </div>
          </div>
          <div className="tour-view-content-title">
            <h4>상품소개</h4>
          </div>
          <div className="tour-view-intro-wrap">
            <div className="tour-view-intronail">
              {tour.tourIntro === null || tour.tourIntro === "null" ? (
                <img src="/images/테마파크.jpg" />
              ) : (
                <img src={backServer + "/tour/intronail/" + tour.tourIntro} />
              )}
            </div>
          </div>
          <div className="tour-view-content-title">
            <h4>이용정보</h4>
          </div>
          <div className="tour-view-info-wrap">
            <div className="tour-info-zone" onClick={showPartnerTel}>
              <div className="tour-info-title">판매자 정보를 확인하세요</div>
              <div className="tour-info-detail">
                {partner && partner.partnerName}
              </div>
            </div>
            <div className="tour-info-zone">
              <div className="tour-info-title">투어 주소</div>
              <div className="tour-info-detail">{tour.tourAddr}</div>
            </div>
          </div>
          <div className="tour-view-content-title">
            <h4>리뷰</h4>
          </div>
          <div className="tour-review-input-wrap">
            <div className="tour-review-profile">
              <span className="material-icons">person</span>
            </div>
            <div className="tour-review-input">
              <div className="tour-review-star">
                <Rating
                  name="simple-controlled"
                  value={reviewStar}
                  onChange={(event, newValue) => {
                    setReviewStar(newValue);
                  }}
                />
              </div>
              <div className="tour-review-text">
                <input
                  type="text"
                  placeholder="운영정책에 위배되는 리뷰는 삭제될 수 있습니다."
                  value={reviewContent}
                  onChange={(event) => {
                    setReviewContent(event.target.value);
                  }}
                  onKeyUp={handleKeyPress}
                />
                <button
                  className="btn_primary sm review-btn"
                  onClick={reviewSubmit}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
          <div className="tour-review-list-wrap">
            <div className="tour-review-profile">
              <span className="material-icons">person</span>
            </div>
            <div className="tour-review-input">
              <div className="tour-review-star">
                <Rating
                  name="simple-controlled"
                  value={reviewStar}
                  onChange={(event, newValue) => {
                    setReviewStar(newValue);
                  }}
                />
              </div>
              <div className="tour-review-text">
                <input
                  type="text"
                  value={reviewContent}
                  onChange={(event) => {
                    setReviewContent(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourView;
