import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";

const TourBook = (props) => {
  const { state } = useLocation();
  const { startDate, quantity } = state;

  console.log(startDate); // startDate 값 확인
  console.log(quantity); // quantity 값 확인

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const params = useParams();
  const tourNo = params.tourNo;
  const [tour, setTour] = useState({});
  const [ticket, setTicket] = useState({});

  const handleTitleClick = () => {
    navigate("/tour/view/" + tourNo);
  };
  return (
    <section className="contents">
      <div className="tour-view-prev" onClick={handleTitleClick}>
        <span className="material-icons">reply</span>
        <h5>투어 상품 화면으로</h5>
      </div>
    </section>
  );
};

export default TourBook;
