import { useState } from "react";

const ReservationInn = () => {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestWish, setGuestWish] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookStatus, setBookStatus] = useState(0);
  const [bookGuest, setBookGuest] = useState(0);
};

export default ReservationInn;
