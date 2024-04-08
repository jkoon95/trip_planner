import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
        console.log(res.data.data);
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
          <div className="tour-view-badge">
            <span className="badge gray">{tourTypeText}</span>
            <span className="badge gray">~ {salesPeriod}</span>
          </div>
          <div className="tour-view-info">
            <div className="tour-view-name">
              [{simpleTourAddr}] {tour.tourName}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourView;
