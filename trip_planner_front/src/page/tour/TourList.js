import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./tour.css";
import TourSearchBox from "./TourSearchBox";

const TourList = () => {
  return (
    <section className="contents">
      <div className="tour-list-title">
        <h2>투어 · 티켓</h2>
      </div>
      <TourSearchBox />
      <TourIconBox />
      <TourSwiper />
      <div className="tour-list-item">
        <h2>추천 티켓</h2>
      </div>
      <TourItem />
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

const TourItem = () => {
  return (
    <div className="tour-item-wrap">
      <div className="tour-item">
        <div className="tour-bookmark">
          <img alt="찜" src="images/찜버튼.png" />
        </div>
        <img className="tour-item-img" alt="#" src="images/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <div className="tour-bookmark">
          <img alt="찜" src="images/찜버튼.png" />
        </div>
        <img className="tour-item-img" alt="#" src="images/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <div className="tour-bookmark">
          <img alt="찜" src="images/찜버튼.png" />
        </div>
        <img className="tour-item-img" alt="#" src="images/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <div className="tour-bookmark">
          <img alt="찜" src="images/찜버튼.png" />
        </div>
        <img className="tour-item-img" alt="#" src="images/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <div className="tour-bookmark">
          <img alt="찜" src="images/찜버튼.png" />
        </div>
        <img className="tour-item-img" alt="#" src="images/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
    </div>
  );
};

export default TourList;
