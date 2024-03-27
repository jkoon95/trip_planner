import { Button } from "../../component/FormFrm";
import "./tour.css";

const TourList = () => {
  return (
    <section className="contents">
      <h2>투어 · 티켓</h2>
      <div className="tour-search-wrap">
        <div className="search-wrap">
          <span class="material-icons">search</span>
          <input type="text" placeholder="검색어를 입력하세요." />

          <Button text="검색" class="btn_primary sm">
            검색
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourList;
