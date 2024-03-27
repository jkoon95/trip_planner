import { Button } from "../../component/FormFrm";
import "./tour.css";

const TourList = () => {
  return (
    <section className="contents">
      <div className="tour-title">
        <h2>투어 · 티켓</h2>
      </div>
      <TourSearchBox />
      <div className="tour-icon-wrap">
        <img src="image/액티비티.jpg" />
        <img src="image/테마파크.jpg" />
        <img src="image/전시회.jpg" />
        <img src="image/이용권.jpg" />
        <img src="image/엑스포.jpg" />
      </div>
    </section>
  );
};

const TourSearchBox = () => {
  return (
    <div className="tour-search-wrap">
      <div className="search-wrap">
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

export default TourList;
