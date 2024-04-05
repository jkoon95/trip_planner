import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./tour.css";
import TourSearchBox from "./TourSearchBox";
import axios from "axios";

const TourList = () => {
  const [tourList, setTourList] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(backServer + "/tour")
      .then((res) => {
        setTourList(res.data.data.tourList);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <section className="contents">
      <div className="tour-list-title">
        <h2>투어 · 티켓</h2>
      </div>
      <TourSearchBox />
      <TourIconBox />
      <TourSwiper />
      <div className="tour-list-prod">
        <h2>추천 투어 · 티켓</h2>
      </div>
      <div className="tour-prod-wrap">
        {tourList.map((tour, index) => {
          return <TourProd key={"tour" + index} tour={tour} />;
        })}
      </div>
    </section>
  );
};

const TourIconBox = () => {
  return (
    <div className="tour-icon-wrap">
      <Link to="/tourSearch">
        <img alt="입장권" src="images/투어티켓.jpg" />
        <div>티켓 · 입장권</div>
      </Link>
      <Link to="#">
        <img alt="전시회" src="images/투어전시.jpg" />
        <div>전시회</div>
      </Link>
      <Link to="#">
        <img alt="액티비티" src="images/투어레저.jpg" />
        <div>액티비티</div>
      </Link>
      <Link to="#">
        <img alt="박람회" src="images/투어박람.jpg" />
        <div>박람회</div>
      </Link>
      <Link to="#">
        <img alt="테마파크" src="images/투어테마.jpg" />
        <div>테마파크</div>
      </Link>
    </div>
  );
};

const TourSwiper = () => {
  return (
    <Swiper
      className="tour-swiper"
      navigation={true}
      pagination={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={3}
      loop={true}
      speed={600}
    >
      <SwiperSlide>
        <img alt="박람회" src="images/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="images/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="images/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="images/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="images/테마파크.jpg" />
      </SwiperSlide>
    </Swiper>
  );
};

const TourProd = (props) => {
  const tour = props.tour;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const tourView = () => {
    navigate("/tour/view/" + tour.tourNo);
  };
  return (
    <>
      <div className="tour-prod">
        <div className="tour-bookmark">
          <img alt="찜" src="images/투어찜.png" />
        </div>
        <div className="tour-prod-img">
          {tour.tourImg === null || tour.tourImg === "null" ? (
            <img src="/images/테마파크.jpg" />
          ) : (
            <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
          )}
        </div>
        <div className="tour-prod-info">
          <div className="tour-prod-name">{tour.tourName}</div>
          <div className="tour-prod-type">{tour.type}</div>
          <div className="tour-prod-price"></div>
        </div>
      </div>
    </>
  );
};

export default TourList;
