import { useEffect, useState } from "react";
import axios from "axios";
import { PromotionInputWrap } from "./PromotionFrm";

const PromotionApply = (props) => {
  const member = props.member;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [promotionName, setPromotionName] = useState("");
  const [promotionImg, setPromotionImg] = useState(null);
  const [promotionThumbnail, setPromotionThumbnail] = useState(null);
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [promotionIntro, setPromotionIntro] = useState("");
  const [promotionRegion, setPromotionRegion] = useState("");
  const [promotionLimit, setPromotionLimit] = useState("");
  const [promotionFile, setPromotionFile] = useState([]);
  const changeThumbnail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setPromotionThumbnail(files[0]); //전송용 state에 file객체를 세팅
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setPromotionImg(reader.result);
      };
    } else {
      setPromotionThumbnail(null);
      setPromotionImg(null);
    }
  };
  return (
    <section className="contents promotionApply">
      <h1>프로모션 신청</h1>
      <div className="promotion_input_area">
        <PromotionInputWrap
          label="프로모션 이름"
          content="promotionName"
          type="text"
          data={promotionName}
          setData={setPromotionName}
        />
        <PromotionInputWrap
          label="프로모션 가격"
          content="promotionPrice"
          type="number"
          data={promotionPrice}
          setData={setPromotionPrice}
        />
        <PromotionInputWrap
          label="프로모션 지역"
          content="promotionRegion"
          type="text"
          data={promotionRegion}
          setData={setPromotionRegion}
        />
        <PromotionInputWrap
          label="프로모션 인원제한"
          content="promotionLimit"
          type="number"
          data={promotionLimit}
          setData={setPromotionLimit}
        />
        <div className="promotion-thumbnail-input">
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={changeThumbnail}
          />
        </div>
        <div className="promotion-thumbnail-image">
          {promotionImg === null ? (
            <img src="/images/로딩.gif" />
          ) : (
            <img src={promotionImg} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionApply;
