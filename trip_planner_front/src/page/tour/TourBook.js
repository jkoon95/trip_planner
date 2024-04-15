import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";

const TourBook = (props) => {
  const { state } = useLocation();
  const { startDate, quantity } = state;
  // console.log(startDate); // 예약일자 확인
  // console.log(quantity); // 수량 확인

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const params = useParams();
  const tourNo = params.tourNo;
  const [tour, setTour] = useState({});
  const [ticket, setTicket] = useState({});
  const [partner, setPartner] = useState({});
  const [member, setMember] = useState("");

  const handleTitleClick = () => {
    navigate("/tour/view/" + tourNo);
  };
  const handleMyInfo = () => {
    navigate("/mypage/myInfo");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let script = document.querySelector(
      `script[src="https://cdn.iamport.kr/v1/iamport.js"]`
    );

    axios
      .get(backServer + "/tour/view/" + tourNo)
      .then((res) => {
        const { tourList, ticketList, partner } = res.data.data;
        setTour(tourList[0]);
        setTicket(ticketList[0]);
        setPartner(partner[0]);
      })
      .catch((res) => {
        console.log(res);
      });

    axios
      .get(backServer + "/tour/member")
      .then((res) => {
        setMember(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [backServer, tourNo]);

  const simpleTourAddr = tour.tourAddr ? tour.tourAddr.slice(0, 2) : "";
  const formattedStartDate = dayjs(startDate)
    .locale("ko")
    .format("YYYY년 MM월 DD일 (dddd)");
  const adultTicketPrice = ticket.ticketAdult
    ? ticket.ticketAdult.toLocaleString("ko-KR") + "원"
    : "무료";
  const youthTicketPrice = ticket.ticketYouth
    ? ticket.ticketYouth.toLocaleString("ko-KR") + "원"
    : "무료";
  const childTicketPrice = ticket.ticketChild
    ? ticket.ticketChild.toLocaleString("ko-KR") + "원"
    : "무료";

  const totalPrice = () => {
    let total = 0;
    if (quantity.adult !== 0) {
      total += quantity.adult * ticket.ticketAdult;
    }
    if (quantity.youth !== 0) {
      total += quantity.youth * ticket.ticketYouth;
    }
    if (quantity.child !== 0) {
      total += quantity.child * ticket.ticketChild;
    }
    return total.toLocaleString("ko-KR");
  };

  const [termsChecked, setTermsChecked] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const checkboxName = event.target.name;

    setTermsChecked({
      ...termsChecked,
      [checkboxName]: checked,
    });

    if (checkboxName === "terms1" && checked) {
      setTermsChecked({
        terms1: true,
        terms2: true,
        terms3: true,
        terms4: true,
        terms5: true,
      });
    }
    if (checkboxName === "terms1" && !checked) {
      setTermsChecked({
        terms1: false,
        terms2: false,
        terms3: false,
        terms4: false,
        terms5: false,
      });
    }
  };

  const allTermsChecked = () => {
    return Object.values(termsChecked).every((value) => value === true);
  };
  const isPaymentButtonDisabled = !allTermsChecked();
  const totalQuantity = Object.values(quantity).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const handlePaymentButtonClick = () => {
    console.log(totalPrice());
    if (allTermsChecked()) {
      const paymentData = {
        tourNo: parseInt(tourNo),
        memberNo: parseInt(member.memberNo),
        bookGuest: totalQuantity,
        bookFee: parseInt(totalPrice()),
        bookDate: dayjs(startDate).format("YYYY-MM-DD"),
      };

      if (parseInt(totalPrice()) !== 0) {
        const { IMP } = window;
        // 내 계정관리 - 내 식별코드 - 고객사 식별코드
        IMP.init("imp26315412");

        const data = {
          // 결제 연동 - PG상점아이디 (CPID)
          pg: "danal_tpay.9810030929", // PG사
          pay_method: "card", // 결제수단
          merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
          name: tour.tourName, // 주문명
          amount: parseInt(totalPrice()), // 결제금액
          buyer_name: member.memberName, // 구매자 이름
          buyer_tel: member.memberPhone, // 구매자 전화번호
          buyer_email: member.memberEmail, // 구매자 이메일
          buyer_addr: member.memberAddr, // 구매자 주소
        };
        IMP.request_pay(data, (rsp) => {
          // callback
          if (rsp.success) {
            // console.log("결제 성공");
            axios
              .post(backServer + "/tour/book", paymentData)
              .then((res) => {
                if (res.data.message === "success") {
                  Swal.fire({
                    icon: "success",
                    title: "결제가 완료되었습니다.",
                  });
                  navigate("/mypage/tour/mgmt");
                }
              })
              .catch((res) => {
                console.log(res);
              });
          } else {
            console.log("결제 실패");
          }
        });
      } else {
        axios
          .post(backServer + "/tour/book", paymentData)
          .then((res) => {
            if (res.data.message === "success") {
              Swal.fire({
                icon: "success",
                title: "결제가 완료되었습니다.",
              });
              navigate("/mypage");
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "약관 동의 필요",
        text: "모든 약관에 동의해주세요.",
      });
    }
  };

  return (
    <section className="contents">
      <div className="tour-view-prev" onClick={handleTitleClick}>
        <span className="material-icons">reply</span>
        <h5>투어 상품 화면으로</h5>
      </div>
      <div className="tour-book-all-wrap">
        <div className="tour-book-wrap">
          <div className="tour-book-content">
            <div className="tour-book-top">
              <div className="tour-book-title">
                [{simpleTourAddr}] {tour.tourName}
              </div>
              <div className="tour-book-name">
                [{simpleTourAddr}] {tour.tourName}
              </div>
              <div className="tour-book-date">{formattedStartDate}</div>
              <div className="tour-book-quantity-wrap">
                <div className="tour-book-quantity-adult">
                  {quantity.adult !== 0 && (
                    <>
                      <div className="tour-book-quantity-title">
                        입장권 성인
                      </div>
                      <div className="tour-book-quantity">
                        {quantity.adult} X {adultTicketPrice}
                      </div>
                    </>
                  )}
                </div>
                <div className="tour-book-quantity-youth">
                  {quantity.youth !== 0 && (
                    <>
                      <div className="tour-book-quantity-title">
                        입장권 청소년
                      </div>
                      <div className="tour-book-quantity">
                        {quantity.youth} X {youthTicketPrice}
                      </div>
                    </>
                  )}
                </div>
                <div className="tour-book-quantity-child">
                  {quantity.child !== 0 && (
                    <>
                      <div className="tour-book-quantity-title">
                        입장권 어린이
                      </div>
                      <div className="tour-book-quantity">
                        {quantity.child} X {childTicketPrice}
                      </div>
                    </>
                  )}
                </div>
                <div className="tour-book-quantity-final">
                  <div className="tour-book-quantity-final-title">
                    <h3>총 결제 금액</h3>
                  </div>
                  <div className="tour-book-quantity-final-price">
                    {totalPrice()}원
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-book-info-wrap">
              <div className="tour-book-info-title">
                <h3>예약자 정보</h3>
                <h3>*</h3>
              </div>
              <h4>
                업체에 전달할 예약정보를 한국어, 영어 중 1개의 언어로 입력해
                주세요.
              </h4>
              <div className="tour-book-info-box">
                <div className="tour-book-info-box-top">
                  <div className="tour-book-info-box-left">
                    <div className="tour-book-info-box-title">이름</div>
                    <div className="tour-book-info-box-name">
                      {member.memberName}
                    </div>
                  </div>
                  <div className="tour-book-info-box-right">
                    <div className="tour-book-info-box-title">닉네임</div>
                    <div className="tour-book-info-box-nickname">
                      {member.memberNickName}
                    </div>
                  </div>
                </div>
                <div className="tour-book-info-box-title">이메일</div>
                <div className="tour-book-info-box-email">
                  {member.memberEmail}
                </div>
                <div className="tour-book-info-box-title">전화번호</div>
                <div className="tour-book-info-box-phone">
                  {member.memberPhone}
                </div>
                <div className="tour-book-info-box-btn">
                  {/* <button
                    className="btn_primary outline md"
                    onClick={handleMyInfo}
                  >
                    정보변경
                  </button> */}
                </div>
              </div>
            </div>
            {/* <div className="tour-book-coupon-wrap">
              <div className="tour-book-coupon-title">할인 쿠폰</div>
              <div className="tour-book-coupon"></div>
            </div> */}
          </div>
        </div>
        <div className="tour-book-window">
          <div className="tour-book-payment-title">
            <h2>결제 정보</h2>
          </div>
          <div className="tour-book-sales-amount">
            결제 금액
            <div className="tour-book-sales-amount-price">{totalPrice()}원</div>
          </div>
          <div className="tour-book-sales-amount">
            할인 금액
            <div className="tour-book-sales-amount-price">0원</div>
          </div>
          <div className="tour-book-total-amount">
            최종 결제 금액
            <div className="tour-book-total-amount-price">{totalPrice()}원</div>
          </div>
          <div className="tour-book-check-wrap">
            <div className="tour-book-check-title">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms1"
                      checked={termsChecked.terms1}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="이용약관 동의(필수)"
                  className="tour-book-check-first"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms2"
                      checked={termsChecked.terms2}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="취소 및 환불 정책 동의"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms3"
                      checked={termsChecked.terms3}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="개인정보 제 3자 제공 약관 동의"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms4"
                      checked={termsChecked.terms4}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="개인정보 수집 동의"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms5"
                      checked={termsChecked.terms5}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="고유식별정보 수집 동의"
                />
              </FormGroup>
            </div>
          </div>
          <div className="tour-book-payment-button">
            <button
              className="btn_primary"
              disabled={isPaymentButtonDisabled}
              onClick={handlePaymentButtonClick}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourBook;
