import { Link } from "react-router-dom";
import "./reservationInn.css";

import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import axios from "axios";
import { Portal } from "@mui/material";

const ReservationInnFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const guestName = props.guestName;
  const setGuestName = props.setGuestName;
  const guestPhone = props.guestPhone;
  const setGuestPhone = props.setGuestPhone;
  const guestWish = props.guestWish;
  const setGuestWish = props.setGuestWish;
  const [innNo, setInnNo] = useState(21);
  const [checkInDate, setCheckInDate] = useState("2024-04-10 (수)");
  const [checkOutDate, setCheckOutDate] = useState("2024-04-13 (토)");
  const [roomNo, setRoomNo] = useState(43);
  const [partnerName, setPartnerName] = useState("");
  const [memberNo, setMemberNo] = useState(29);
  const [roomName, setRoomName] = useState("정원 전망 스탠다드 더블룸");
  const [roomPrice, setRoomPrice] = useState("1000원");
  const [roomMinPeople, setRoomMinPeople] = useState(2);
  const [roomMaxPeople, setRoomMaxPeople] = useState(4);
  const [innCheckInTime, setInnCheckInTime] = useState("14:00");
  const [innCheckOutTime, setInnCheckOutTime] = useState("12:00");
  const [selectInn, setSelectInn] = useState([{}]);
  const [bookGuest, setBookGuest] = useState(3);

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
  console.log(checkInDate - checkOutDate);

  useEffect(() => {
    axios
      .get(backServer + "/inn/selectInnInfo/" + roomNo + "/" + innNo)
      .then((res) => {
        console.log(res.data);
        setSelectInn(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
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
                {checkInDate} {innCheckInTime} ~ <br />
                {checkOutDate} {innCheckOutTime}
              </td>
            </tr>
            <tr>
              <td>예약인원</td>
              <td>{bookGuest} 인</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="reservation-pay-zone"></div>
    </>
  );
};
export default ReservationInnFrm;
