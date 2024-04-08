import { useEffect, useState } from "react";
import TourSearchBox from "./TourSearchBox";
import { Button } from "../../component/FormFrm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TourType = () => {
  const location = useLocation();
  const [tourList, setTourList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [visibleTour, setVisibleTour] = useState(5); // 5개만 표시
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state &&
      location.state.tourList &&
      location.state.ticketList
    ) {
      setTourList(location.state.tourList);
      setTicketList(location.state.ticketList);
    }
  }, [location.state]);

  const handleTourMore = () => {
    setVisibleTour((prevCount) => prevCount + 5); // 5개씩 추가
  };

  const handleTitleClick = () => {
    navigate("/tourList");
  };

  return (
    <section className="contents">
      <div className="tour-list-title" onClick={handleTitleClick}>
        <h2>투어 · 티켓</h2>
        <h2>카테고리 검색</h2>
      </div>
      <TourSearchBox />
      <TourSearchOption />
      {tourList.slice(0, visibleTour).map((tour, index) => {
        const ticket = ticketList[index];
        return <TourItem key={index} tour={tour} ticket={ticket} />;
      })}
      {visibleTour < tourList.length && (
        <div className="tour-list-more">
          <button className="btn_secondary" onClick={handleTourMore}>
            더 보기
          </button>
        </div>
      )}
    </section>
  );
};

const TourSearchOption = () => {
  const [selectedOption, setSelectedOption] = useState("추천순");

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="tour-option-wrap">
      <button
        className={`tour-option-btn ${
          selectedOption === "가격 낮은순" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("가격 낮은순")}
      >
        가격 낮은순
      </button>
      <button
        className={`tour-option-btn ${
          selectedOption === "추천순" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("추천순")}
      >
        추천순
      </button>
    </div>
  );
};

const TourItem = ({ tour, ticket }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const tourView = () => {
    navigate("/tour/view/" + tour.tourNo);
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

  return (
    <div className="tour-prod-zone">
      <div className="tour-prod">
        <div className="tour-prod-img" onClick={tourView}>
          {tour.tourImg === null || tour.tourImg === "null" ? (
            <img src="/images/테마파크.jpg" />
          ) : (
            <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
          )}
        </div>
        <div className="tour-prod-info">
          <div className="tour-prod-name">
            {" "}
            [{tour.tourAddr.slice(0, 2)}] {tour.tourName}
          </div>
          <div className="tour-prod-subname">
            {tour.tourAddr.slice(0, 2)} {tourTypeText}
          </div>
          <div className="tour-prod-limit">~ {salesPeriod}</div>
          <div className="tour-prod-price">
            {ticket.ticketAdult === 0
              ? "무료"
              : ticket.ticketAdult.toLocaleString() + " 원"}
          </div>
          <img
            className="tour-prod-bookmark"
            alt="찜"
            src="/images/투어찜.png"
          />
        </div>
      </div>
    </div>
  );
};

export default TourType;
