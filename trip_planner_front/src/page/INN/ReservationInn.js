import { useEffect, useState } from "react";
import ReservationInnFrm from "./ReservationInnFrm";
import { useLocation, useParams } from "react-router-dom";

const ReservationInn = () => {
  const location = useLocation();
  const room = location.state;
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestWish, setGuestWish] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookStatus, setBookStatus] = useState(0);
  const [bookGuest, setBookGuest] = useState(0);
  console.log(room);

  return (
    <div className="reservation-all-wrap">
      <div className="reservation-title hidden">
        <h2>예약페이지</h2>
      </div>
      <ReservationInnFrm
        guestName={guestName}
        setGuestName={setGuestName}
        guestPhone={guestPhone}
        setGuestPhone={setGuestPhone}
        guestWish={guestWish}
        setGuestWish={setGuestWish}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        bookStatus={bookStatus}
        setBookStatus={setBookStatus}
        bookGuest={bookGuest}
        setBookGuest={setBookGuest}
      />
    </div>
  );
};

export default ReservationInn;
