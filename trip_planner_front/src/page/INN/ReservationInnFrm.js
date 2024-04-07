import { Link } from "react-router-dom";
import "./reservationInn.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import React, { useEffect, useRef, useState } from "react";
import axios, { all } from "axios";
import { Portal, colors } from "@mui/material";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";
import Modal from "../../component/Modal";

const ReservationInnFrm = (props) => {
  dayjs.locale("ko");

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const guestName = props.guestName;
  const setGuestName = props.setGuestName;
  const guestPhone = props.guestPhone;
  const setGuestPhone = props.setGuestPhone;
  const guestWish = props.guestWish;
  const setGuestWish = props.setGuestWish;

  const [innNo, setInnNo] = useState(22);
  const [checkInDate, setCheckInDate] = useState("2024-04-10");
  const [checkOutDate, setCheckOutDate] = useState("2024-04-13");
  const [roomNo, setRoomNo] = useState(44);
  const [partnerName, setPartnerName] = useState("");
  const [memberNo, setMemberNo] = useState(29);
  const [roomName, setRoomName] = useState("정원 전망 스탠다드 더블룸");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomMinPeople, setRoomMinPeople] = useState(2);
  const [roomMaxPeople, setRoomMaxPeople] = useState(4);
  const [innCheckInTime, setInnCheckInTime] = useState("14:00");
  const [innCheckOutTime, setInnCheckOutTime] = useState("12:00");
  const [selectInn, setSelectInn] = useState([{}]);
  const [bookGuest, setBookGuest] = useState(3);
  const [termsIndex, setTermsIndex] = useState(0);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const lodgment = dayjs(checkOutDate).diff(checkInDate, "d"); //dayjs로 요일을 가져오는 방식
  const [price, setPrice] = useState(selectInn.roomPrice * lodgment);

  useEffect(() => {
    setPrice(selectInn.roomPrice * lodgment);
  }, [selectInn]);

  const closeModalFunc1 = () => {
    document.body.classList.remove("scroll_fixed");
    setOpenModal1(false);
  };
  const closeModalFunc2 = () => {
    document.body.classList.remove("scroll_fixed");
    setOpenModal2(false);
  };

  const [allChecked, setAllChecked] = useState({
    type: "checkbox",
    text: "이용약관 전체동의",
    id: "terms-all",
    active: false,
  });
  const [checkTerms, setCheckTerms] = useState([
    {
      type: "checkbox",
      text: "숙소 이용규칙 및 취소/환불 규정 동의 (필수)",
      id: "terms-inn",
      active: false,
    },
    {
      type: "checkbox",
      text: "개인정보 수집 동의 및 이용 동의 (필수)",
      id: "terms-privacy",
      active: false,
    },
    {
      type: "checkbox",
      text: "개인정보 제3자 제공 동의 (필수)",
      id: "terms-offer",
      active: false,
    },
    {
      type: "checkbox",
      text: "만 14세 이상 확인 (필수)",
      id: "terms-age",
      active: false,
    },
  ]);

  const [modalInfo, setModalInfo] = useState([
    {
      title: "숙소 이용규칙 및 취소/환불 규정 동의 (필수)",
      content: (
        <div>
          <h4>이용규칙</h4>
          <p>
            19세 미만 청소년의 혼숙은 법적으로 불가하며, 이에 대한 숙소의 입실
            거부 시 취소/환불이 불가합니다.
          </p>
          <p>
            19세 미만 청소년 예약에 대한 숙소의 입실 거부 시 취소/환불이
            불가하오니, 예약 전 반드시 숙소에 확인하시기 바랍니다
          </p>
          <p>
            업체 현장에서 객실 컨디션 및 서비스로 인해 발생된 분쟁을
            Trip_planner에서 책임지지 않습니다.
          </p>
          <br />
          <h4>취소/환불규정</h4>
          <p>숙소 사정에 의해 취소 발생 시 100% 환불이 가능합니다.</p>
          <p>
            취소/환불 규정에 따라 취소 수수료가 발생하는 경우, 취소 수수료는
            판매가(상품가격) 기준으로 계산됩니다.
          </p>
        </div>
      ),
    },
    {
      title: "개인정보 수집 동의 및 이용 동의 (필수)",
      content: (
        <>
          <table>
            <thead>
              <th width="10%">구분</th>
              <th width="20%">수집목적</th>
              <th width="50%">수집항목</th>
              <th width="20%">보유 및 이용기간</th>
            </thead>
            <tbody>
              <td>필수</td>
              <td>예약/구매 서비스 제공 상담 및 부정거래 기록확인</td>
              <td>
                <div>
                  <b>[예약▪구매]</b>
                </div>
                <div>예약자 정보(이름, 휴대전화번호)</div>
                <div>
                  <b>[결제]</b>
                </div>
                <div>
                  거래내역
                  <br />
                  <sup>*</sup>결제 시 개인정보는 PG사(결제대행업체)에서 수집 및
                  저장하고 있으며, 회사는 PG사에서 제공하는 거래 내역만 제공받음
                </div>
                <div>
                  <b>[거레명세서 발급]</b>
                </div>
                <div>이메일 주소</div>
                <div>
                  <b>[현금영수증 발급]</b>
                </div>
                <div>휴대전화번호, 이메일주소</div>
                <div>
                  <b>[취소▪환불]</b>
                </div>
                <div>은행명, 계좌번호, 예금주명</div>
              </td>
              <td>
                <b>
                  <u>- 회원 탈퇴 시 까지</u>
                </b>
                <div>
                  <sup>*</sup> 관계 법력에 따라 보존할 필요가 있는 경우 해당
                  법령에서 요구하는 기한까지 보유
                </div>
              </td>
            </tbody>
          </table>
          <p>
            ✅ 위 동의 내용을 거부하실 수 있으나, 동의를 거부하실 경우 서비스를
            이용하실 수 없습니다.
          </p>
          <p>
            ✅ 개인정보 처리와 관련된 상세 내용은 '개인정보처리방침'을
            참고하시기 바랍니다.
          </p>
        </>
      ),
    },
    {
      title: "개인정보 제3자 제공 동의 (필수)",
      content: (
        <>
          <table>
            <tbody>
              <tr>
                <th width={"40%"}>제공받는자</th>
                <td width={"60%"}>{selectInn.partnerName}</td>
              </tr>
              <tr>
                <th>제공목적</th>
                <td>
                  숙박예약서비스 이용계약 이행
                  <br />
                  (서비스 제공, 확인, 이용자 정보확인)
                </td>
              </tr>
              <tr>
                <th>제공하는 항목</th>
                <td>
                  예약한 숙박서비스의 이용자 정보(예약자 이름, 휴대폰번호,
                  예약번호, 예약 업체명, 예약한 객실명, 결제금액)
                </td>
              </tr>
              <tr>
                <th>제공받는 자의 개인정보 보유 및 이용기간</th>
                <td>예약서비스 제공 완료 후 6개월</td>
              </tr>
            </tbody>
          </table>
          <p>
            ✅ 위 동의 내용을 거부하실 수 있으나, 동의를 거부하실 경우 서비스를
            이용하실 수 없습니다.
          </p>
          <p>
            ✅ 개인정보 처리와 관련된 상세 내용은 '개인정보처리방침'을
            참고하시기 바랍니다.
          </p>
        </>
      ),
    },
    {
      title: "개인정보 제3자 제공 동의 (필수)",
      content: (
        <>
          <p className="ageTerms" style={{ color: "red" }}>
            Trip Planner는 만 14세 미만 아동의 서비스 이용을 제한하고 있습니다.
          </p>
          <p>
            개인정보 보호법에는 만 14세 미만 아동의 개인정보 수집 시 법정대리인
            동의를 받도록 규정하고 있으며,{" "}
            <strong>
              만 14세 미만 아동이 법정대리인 동의없이 서비스 이용이 확인된 경우
              서비스 이용이 제한될 수 있음을 알려드립니다.
            </strong>
          </p>
        </>
      ),
    },
  ]);

  const checkInDay = dayjs(checkInDate).format("ddd"); //date picker로 받아온 체크인 날짜
  const checkOutDay = dayjs(checkOutDate).format("ddd"); //date picker로 받아온 체크아웃 날짜

  /*
  const checkInDate = props.checkInDate;
  const setCheckInDate = props.setCheckInDate;
  const checkOutDate = props.checkOutDate;
  const setCheckOutDate = props.setCheckOutDate;
  const bookStatus = props.bookStatus;
  const setBookStatus = props.setBookStatus;
  const bookGuest = props.bookGuest;
  const setBookGuest = props.setBookGuest;
  */

  const discountPrice = (discountAmount, discountRate, couponList, index) => {
    console.log(price);
    Swal.fire({
      title: "해당 쿠폰을 사용하시겠습니까?",
      icon: "info",
      confirmButtonText: "적용",
      cancelButtonText: "취소",
    }).then((res) => {
      if (
        discountRate < 100 &&
        res.isConfirmed &&
        price === selectInn.roomPrice * lodgment
      ) {
        const selectCouponNo = couponList[index].couponNo;
        const discountRateValue =
          selectInn.roomPrice * lodgment * (discountRate / 100);
        console.log(discountRateValue);
        const totalPrice = price - discountRateValue;
        console.log(totalPrice);
        setPrice(totalPrice);
      } else {
        const selectCouponNo = couponList[index].couponNo;
        const discountAmountValue =
          selectInn.roomPrice * lodgment - discountAmount;
        console.log(discountAmountValue);
        setPrice(discountAmountValue);
      }
    });
  };

  const { IMP } = window;
  IMP.init("imp82445436");
  const pay = () => {
    const price = selectInn.roomPrice * lodgment;
    const date = new Date();
    const dateString =
      date.getFullYear() +
      "" +
      (date.getMonth() + 1) +
      "" +
      date.getDate() +
      "" +
      date.getHours() +
      "" +
      date.getMinutes() +
      "" +
      date.getSeconds();
    IMP.request_pay(
      {
        pg: "danal_tpay.9810030929",
        pay_method: "card",
        merchant_uid: "product_no_" + dateString, // 상점에서 생성한 고유 주문번호
        name: "주문명:결제테스트",
        amount: price,
        buyer_email: "test@portone.io",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
      },
      function (rsp) {
        if (rsp.success) {
          Swal.fire({
            title: "결제 완료",
            text: "결제가 완료되었습니다.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "결제 실패",
            text: "잠시후 다시 시도해주세요",
            icon: "error",
          });
        }
      }
    );
  };
  return (
    <div className="reservation-wrap">
      <div className="reservation-top">
        <Link to="/innList">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="toMain">예약확인 및 결제</div>
      </div>
      <div className="reservation-content-all-wrap">
        <div className="reservation-content-wrap">
          <div className="reservation-guest-zone">
            <div className="reservation-guest-zone-top">예약자 정보</div>
            <div className="reservation-guest-name">
              <span className="guest-name">예약자 성함</span>
              <ReservationInput
                type="text"
                content="guest-name"
                data={guestName}
                setData={setGuestName}
                placeholder="예약자 성함을 입력해주세요"
              />
            </div>
            <div className="reservation-guest-phone">
              <span className="guest-phone">예약자 전화번호</span>
              <ReservationInput
                type="text"
                content="guest-phone"
                data={guestPhone}
                setData={setGuestPhone}
                placeholder="예약자 전화번호을 입력해주세요"
              />
            </div>
            <div className="reservation-guest-wish">
              <span className="guest-wish">예약자 요청사항</span>
              <ReservationInput
                type="text"
                content="guest-wish"
                data={guestWish}
                setData={setGuestWish}
                placeholder="업체에서 알아둬야 할 사항들이 있을경우 작성해주세요"
              />
            </div>
          </div>
          <div className="reservation-promotion-connect">
            <div className="promotion-connect-box">
              <p>
                당신의 숙소 예약을 환영합니다! 이번 달 특별 프로모션을 놓지지
                마세요!
              </p>
              <p>
                최대 50% 학인 혜택과 함께 더욱 편안한 여행을 즐기세요. 지금
                예약하고 특별 혜택을 누려보세요!
              </p>
              <span className="material-icons promotion-connect">
                navigate_next
              </span>
            </div>
          </div>
        </div>
        <div className="reservation-select-inn-wrap">
          <div className="select-inn-wrap">
            <SelectInnInfo
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              roomNo={roomNo}
              setRoomNo={setRoomNo}
              memberNo={memberNo}
              setMemberNo={setMemberNo}
              roomName={roomName}
              setRoomName={setRoomName}
              roomPrice={roomPrice}
              setRoomPrice={setRoomPrice}
              roomMinPeople={roomMinPeople}
              setRoomMinPeople={setRoomMinPeople}
              roomMaxPeople={roomMaxPeople}
              setRoomMaxPeople={setRoomMaxPeople}
              innCheckInTime={innCheckInTime}
              setInnCheckInTime={setInnCheckInTime}
              innCheckOutTime={innCheckOutTime}
              setInnCheckOutTime={setInnCheckOutTime}
              innNo={innNo}
              setInnNo={setInnNo}
              partnerName={partnerName}
              setPartnerName={setPartnerName}
              selectInn={selectInn}
              setSelectInn={setSelectInn}
              bookGuest={bookGuest}
              setBookGuest={setBookGuest}
              checkInDay={checkInDay}
              checkOutDay={checkOutDay}
              lodgment={lodgment}
              checkTerms={checkTerms}
              setCheckTerms={setCheckTerms}
              allChecked={allChecked}
              setAllChecked={setAllChecked}
              setOpenModal1={setOpenModal1}
              setTermsIndex={setTermsIndex}
              guestName={guestName}
              setGuestName={setGuestName}
              guestPhone={guestPhone}
              setGuestPhone={setGuestPhone}
              guestWish={guestWish}
              setGuestWish={setGuestWish}
              setOpenModal2={setOpenModal2}
              couponList={couponList}
              setCouponList={setCouponList}
              price={price}
              setPrice={setPrice}
            />
          </div>
        </div>
      </div>

      <Modal
        class="modal lg"
        open={openModal1}
        title={modalInfo[termsIndex].title}
        useCloseBtn={true}
        closeModal={closeModalFunc1}
      >
        {modalInfo[termsIndex].content}
        <div className="btn_area">
          <Button
            class="btn_secondary outline"
            text="취소"
            clickEvent={closeModalFunc1}
          />
          <Button
            class="btn_secondary"
            text="확인"
            clickEvent={closeModalFunc1}
          />
        </div>
      </Modal>
      <Modal
        class="modal lg"
        open={openModal2}
        title="내 쿠폰함"
        useCloseBtn={true}
        closeModal={closeModalFunc2}
      >
        <div className="coupon_wrap">
          <div className="discount-box-wrap">
            {couponList.map((item, index) => {
              return (
                <React.Fragment key={"coupon-" + index}>
                  <input
                    name="choice-coupon"
                    className="choice-coupon"
                    type="radio"
                    id={"coupon-" + item.couponNo}
                    defaultValue={item.couponNo}
                  />
                  <label
                    className="discount-box"
                    htmlFor={"coupon-" + item.couponNo}
                    onClick={() =>
                      discountPrice(
                        item.discountAmount,
                        item.discountRate,
                        couponList,
                        index
                      )
                    }
                  >
                    <div className="discount" key={"item" + index}>
                      {item.discountRate !== 0
                        ? item.discountRate + "% 할인 쿠폰 🎁"
                        : item.discountAmount + "원 할인 쿠폰 🎁"}
                    </div>
                    <div className="expired-date">
                      <span>✅만료날짜 </span>
                      {item.expiredDate}
                    </div>
                  </label>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <>
          <div className="discount-room-price-box">
            <div className="prev-discount-room-price">쿠폰적용 전 금액</div>
            <div className="prev-room-price">
              {selectInn.roomPrice * lodgment}원
            </div>
          </div>
          <div className="discount-room-price-box">
            <div className="post-discount-room-price">쿠폰적용 후 금액</div>
            <div className="post-room-price">{price > 0 ? price : 0}원</div>
          </div>
          <div className="btn_area">
            <Button
              class="btn_secondary outline"
              text="취소"
              clickEvent={closeModalFunc2}
            />
            <Button class="btn_secondary" text="결제하기" clickEvent={pay} />
          </div>
        </>
      </Modal>
    </div>
  );
};

const ReservationInput = (props) => {
  const type = props.type;
  const content = props.content;
  const data = props.data;
  const setData = props.setData;
  const placeholder = props.placeholder;
  const changeGuestName = (e) => {
    setData(e.target.value);
  };
  return (
    <input
      className="input"
      type={type}
      id={content}
      placeholder={placeholder}
      onChange={changeGuestName}
    />
  );
};

const SelectInnInfo = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const guestPhone = props.guestPhone;
  const guestWish = props.guestWish;
  const guestName = props.guestName;
  const checkInDate = props.checkInDate;
  const setCheckInDate = props.setCheckInDate;
  const checkOutDate = props.checkOutDate;
  const setCheckOutDate = props.setCheckOutDate;
  const roomNo = props.roomNo;
  const setRoomNo = props.setRoomNo;
  const memberNo = props.memberNo;
  const setMemberNo = props.setMemberNo;
  const roomName = props.roomName;
  const setRoomName = props.setRoomName;
  const roomPrice = props.roomPrice;
  const setRoomPrice = props.setRoomPrice;
  const roomMinPeople = props.roomMinPeople;
  const setRoomMinPeople = props.setRoomMinPeople;
  const roomMaxPeople = props.roomMaxPeople;
  const setRoomMaxPeople = props.setRoomMaxPeople;
  const innCheckInTime = props.innCheckInTime;
  const setInnCheckInTime = props.setInnCheckInTime;
  const innCheckOutTime = props.innCheckOutTime;
  const setInnCheckOutTime = props.setInnCheckOutTime;
  const innNo = props.innNo;
  const setInnNo = props.setInnNo;
  const partnerName = props.partnerName;
  const setPartnerName = props.setPartnerName;
  const selectInn = props.selectInn;
  const setSelectInn = props.setSelectInn;
  const bookGuest = props.bookGuest;
  const setBookGuest = props.setBookGuest;
  const checkInDay = props.checkInDay;
  const checkOutDay = props.checkOutDay;
  const lodgment = props.lodgment;
  const checkTerms = props.checkTerms;
  const setCheckTerms = props.setCheckTerms;
  const allChecked = props.allChecked;
  const setAllChecked = props.setAllChecked;
  const setOpenModal1 = props.setOpenModal1;
  const setTermsIndex = props.setTermsIndex;
  const setOpenModal2 = props.setOpenModal2;
  const setCouponList = props.setCouponList;

  useEffect(() => {
    axios
      .get(backServer + "/inn/selectInnInfo/" + roomNo + "/" + innNo)
      .then((res) => {
        setSelectInn(res.data.data);
        setRoomPrice(res.data.data.roomPrice);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const checkAll = (e) => {
    const copyAllChecked = allChecked;
    copyAllChecked.active = !copyAllChecked.active;
    setAllChecked(copyAllChecked);
    const copyCheckTerms = [...checkTerms];
    console.log(copyCheckTerms);
    copyCheckTerms.forEach((item) => {
      item.active = !item.active;
    });
    setCheckTerms(copyCheckTerms);
  };

  const copyAllChecked = allChecked;
  const CheckBoxTerms = (props) => {
    const checkTerms = props.checkTerms;
    const setCheckTerms = props.setCheckTerms;
    const setOpenModal1 = props.setOpenModal1;

    const openModalFunc1 = (index) => {
      document.body.classList.add("scroll_fixed");
      setOpenModal1(true);
      setTermsIndex(index);
    };

    const Checked = (index) => {
      const copyCheckTerms = [...checkTerms];
      copyCheckTerms[index].active = !copyCheckTerms[index].active;
      setCheckTerms(copyCheckTerms);
      let check = true;
      for (let i = 0; i < copyCheckTerms.length; i++) {
        if (copyCheckTerms[i].active === false) {
          check = false;
          break;
        }
      }
      if (check) {
        copyAllChecked.active = true;
      } else {
        copyAllChecked.active = false;
      }
    };

    return (
      <>
        {checkTerms.map((item, index) => {
          return (
            <div className="terms-wrap-zone" key={"item" + index}>
              <input
                type={item.type}
                id={item.id}
                defaultChecked={item.active}
                onClick={() => Checked(index)}
              />
              <label htmlFor={item.id}>{item.text}</label>
              <span
                className="material-icons next-terms"
                onClick={() => {
                  openModalFunc1(index);
                }}
              >
                chevron_right
              </span>
            </div>
          );
        })}
      </>
    );
  };
  const openModalFunc2 = () => {
    if (copyAllChecked.active !== true) {
      Swal.fire("이용약관에 동의해주세요");
    } else {
      const setOpenModal2 = props.setOpenModal2;
      document.body.classList.add("scroll_fixed");
      setOpenModal2(true);
      axios
        .get(backServer + "/admin/selectCouponList")
        .then((res) => {
          console.log(res.data);
          setCouponList(res.data.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <>
      <div className="select-inn-top">
        <div className="select-inn-name">
          <span>{selectInn.partnerName}</span>
        </div>
        <div className="select-img-box">
          <img
            src={backServer + "/inn/reservationInn/" + selectInn.innFilepath}
          />
        </div>
        <table className="select-room-info-tbl">
          <tbody>
            <tr>
              <td width={"40%"}>예약객실</td>
              <td width={"60%"}>{selectInn.roomName}</td>
            </tr>
            <tr>
              <td>예약일정</td>
              <td>
                {checkInDate} ({checkInDay}) {innCheckInTime} ~ <br />
                {checkOutDate} ({checkOutDay}) {innCheckOutTime}
              </td>
            </tr>
            <tr>
              <td>예약인원</td>
              <td>{bookGuest}인</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="reservation-pay-zone">
        <div className="reservation-pay-title">결제 정보</div>
        <div className="reservation-pay-price">
          <div className="room-price">
            객실 금액 <sub>(*1박기준)</sub>
          </div>
          <div className="one-day-price">
            {Number(selectInn.roomPrice).toLocaleString()}원
          </div>
        </div>
        <hr />
        <div className="reservation-pay-total">
          <div className="total-price-toitle">총 결제금액</div>
          <div className="total-price">
            {(selectInn.roomPrice * lodgment).toLocaleString()}원
          </div>
        </div>
        <div className="reservation-terms-wrap">
          <input
            type={allChecked.type}
            id={allChecked.id}
            defaultChecked={allChecked.active}
          />
          <label htmlFor={allChecked.id} onClick={checkAll}>
            이용약관 전체동의
          </label>
        </div>
        <div className="terms-wrap-box">
          <CheckBoxTerms
            checkTerms={checkTerms}
            setCheckTerms={setCheckTerms}
            setOpenModal1={setOpenModal1}
          />
        </div>
        <div className="btn-area">
          <Button
            text={selectInn.roomPrice * lodgment + "원 결제하기"}
            class="btn_primary md"
            clickEvent={openModalFunc2}
          />
        </div>
      </div>
    </>
  );
};

export default ReservationInnFrm;
