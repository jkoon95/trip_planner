import { useState } from "react";
import TourSearchBox from "./TourSearchBox";
import { Button } from "../../component/FormFrm";

const TourSearch = () => {
  return (
    <section className="contents">
      <div className="tour-list-title">
        <h2>투어 · 티켓</h2>
        <h2>검색결과</h2>
      </div>
      <TourSearchBox />
      <TourSearchOption />
      <TourItem />
      <div className="tour-list-more">
        <Button text="더 보기" class="btn_secondary" />
      </div>
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

const TourItem = () => {
  return (
    <div className="tour-item-zone">
      <div className="tour-item">
        <img alt="박람회" src="images/테마파크.jpg" />
        <div className="tour-item-info">
          <div className="tour-item-name">[서울] 테마파크 입장권</div>
          <div className="tour-item-subname">서울 티켓·입장권</div>
          <div className="tour-item-limit">~2024.06.30</div>
          <div className="tour-item-price">10,000원</div>
          <img
            className="tour-item-bookmark"
            alt="찜"
            src="images/찜버튼.png"
          />
        </div>
      </div>
      <div className="tour-item">
        <img alt="박람회" src="images/테마파크.jpg" />
        <div className="tour-item-info">
          <div className="tour-item-name">[서울] 테마파크 입장권</div>
          <div className="tour-item-subname">서울 티켓·입장권</div>
          <div className="tour-item-limit">~2024.06.30</div>
          <div className="tour-item-price">10,000원</div>
          <img
            className="tour-item-bookmark"
            alt="찜"
            src="images/찜버튼.png"
          />
        </div>
      </div>
      <div className="tour-item">
        <img alt="박람회" src="images/테마파크.jpg" />
        <div className="tour-item-info">
          <div className="tour-item-name">[서울] 테마파크 입장권</div>
          <div className="tour-item-subname">서울 티켓·입장권</div>
          <div className="tour-item-limit">~2024.06.30</div>
          <div className="tour-item-price">10,000원</div>
          <img
            className="tour-item-bookmark"
            alt="찜"
            src="images/찜버튼.png"
          />
        </div>
      </div>
    </div>
  );
};

export default TourSearch;
