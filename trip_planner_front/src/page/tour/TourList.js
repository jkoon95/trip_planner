import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./tour.css";

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

const TourSearchBox = () => {
  return (
    <div className="tour-search-wrap">
      <div className="tour-search">
        <span className="material-icons">search</span>
        <input type="text" placeholder="도시, 상품명으로 검색해주세요." />
      </div>
      <div className="calendar-wrap">
        <span className="material-icons">event_available</span>
        <input type="text" placeholder="날짜를 선택해주세요." />
      </div>
      <Button text="검색" class="btn_primary sm" />
    </div>
  );
};

const TourIconBox = () => {
  return (
    <div className="tour-icon-wrap">
      <Link to="#">
        <img alt="입장권" src="image/투어티켓.jpg" />
        <div>티켓 · 입장권</div>
      </Link>
      <Link to="#">
        <img alt="전시회" src="image/투어전시.jpg" />
        <div>전시회</div>
      </Link>
      <Link to="#">
        <img alt="액티비티" src="image/투어레저.jpg" />
        <div>액티비티</div>
      </Link>
      <Link to="#">
        <img alt="박람회" src="image/투어박람.jpg" />
        <div>박람회</div>
      </Link>
      <Link to="#">
        <img alt="테마파크" src="image/투어테마.jpg" />
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
        <img alt="박람회" src="image/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="image/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="image/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="image/테마파크.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="박람회" src="image/테마파크.jpg" />
      </SwiperSlide>
    </Swiper>
  );
};

const TourItem = () => {
  return (
    <div className="tour-item-wrap">
      <div className="tour-item">
        <img alt="#" src="image/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <img alt="#" src="image/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <img alt="#" src="image/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <img alt="#" src="image/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
      <div className="tour-item">
        <img alt="#" src="image/테마파크.jpg" />
        <div className="tour-item-name">[서울] 테마 파크</div>
        <div className="tour-item-info">강릉 입장권</div>
        <div className="tour-item-price">10,000원</div>
      </div>
    </div>
  );
};

export default TourList;
