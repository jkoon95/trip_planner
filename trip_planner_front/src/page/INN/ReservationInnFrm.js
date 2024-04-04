import { Link } from "react-router-dom";
import "./reservationInn.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import axios, { all } from "axios";
import { Portal } from "@mui/material";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";

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

  const checkInDay = dayjs(checkInDate).format("ddd"); //date picker로 받아온 체크인 날짜
  const checkOutDay = dayjs(checkOutDate).format("ddd"); //date picker로 받아온 체크아웃 날짜
  const lodgment = dayjs(checkOutDate).diff(checkInDate, "d"); //dayjs로 요일을 가져오는 방식

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
  return (
    <div className="reservation-wrap">
      <div className="reservation-top">
        <Link to="/innList">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="toMain">예약확인 및 결제</div>
      </div>
      <div>
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
            />
          </div>
        </div>
      </div>
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

  useEffect(() => {
    axios
      .get(backServer + "/inn/selectInnInfo/" + roomNo + "/" + innNo)
      .then((res) => {
        console.log(res.data);
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

  const { IMP } = window;
  IMP.init("imp82445436");
  const pay = () => {
    if (copyAllChecked.active !== true) {
      Swal.fire("이용약관에 동의해주세요");
    } else {
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
    }
  };
  const copyAllChecked = allChecked;
  const CheckBoxTerms = (props) => {
    const checkTerms = props.checkTerms;
    const setCheckTerms = props.setCheckTerms;

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
                checked={item.active}
                onClick={() => Checked(index)}
              />
              <label htmlFor={item.id}>{item.text}</label>
              <span className="material-icons next-terms">chevron_right</span>
            </div>
          );
        })}
      </>
    );
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
            checked={allChecked.active}
          />
          <label htmlFor={allChecked.id} onClick={checkAll}>
            이용약관 전체동의
          </label>
        </div>
        <div className="terms-wrap-box">
          <CheckBoxTerms
            checkTerms={checkTerms}
            setCheckTerms={setCheckTerms}
          />
        </div>
        <div className="btn-area">
          <Button
            text={selectInn.roomPrice * lodgment + "원 결제하기"}
            class="btn_primary md"
            clickEvent={pay}
          />
        </div>
      </div>
    </>
  );
};

export default ReservationInnFrm;
