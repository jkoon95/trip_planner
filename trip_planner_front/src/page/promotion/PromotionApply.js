import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PromotionInputWrap } from "./PromotionFrm";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";

const PromotionApply = (props) => {
  const member = props.member;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [promotionName, setPromotionName] = useState("");
  const [promotionImg, setPromotionImg] = useState(null);
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [promotionIntro, setPromotionIntro] = useState("");
  const [promotionRegion, setPromotionRegion] = useState("");
  const [promotionLimit, setPromotionLimit] = useState("");
  const [promotionFile, setPromotionFile] = useState(null);
  const navigate = useNavigate();
  //썸네일 바꾸는 로직
  const changeThumbnail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setPromotionImg(reader.result);
      };
    } else {
      setPromotionImg(null);
    }
  };

  //파일 추가 로직
  const changeFile = (e) => {
    const files = e.currentTarget.files;
    console.log(files);
    setPromotionFile(files);
  };

  //신청 로직
  const applyPromotion = () => {
    const form = new FormData();
    const promotion = {
      promotionName,
      promotionPrice,
      promotionRegion,
      promotionIntro,
      promotionLimit,
    };
    form.append(promotion);
    form.append(promotionImg);
    form.append(promotionFile);

    axios
      .post(backServer + "/promotion/applyPromotion", form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire({
            icon: "success",
            title: "프로모션 신청 성공",
            text: "프로모션 신청에 성공했습니다.",
          });
          navigate("/promotion/promotionList");
        }
      })
      .catch((res) => {
        console.log(res);
      });
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
        <PromotionInputWrap
          label="프로모션 소개"
          content="promotionIntro"
          type="text"
          data={promotionIntro}
          setData={setPromotionIntro}
        />
        <div className="promotion-thumbnail-input">
          <div className="input_title">
            <label className="input2" htmlFor="promotion-thumbnail">
              썸네일
            </label>
          </div>
          <input
            type="file"
            id="promoiton-thumbnail"
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
        <div className="promotion-file-input">
          <div className="input_title">
            <label className="input2" htmlFor="promotion-file">
              첨부파일
            </label>
          </div>
          <input
            type="file"
            id="pormotion-file"
            onChange={changeFile}
            multiple
          />
        </div>
      </div>
      <div className="btn_area">
        <Button
          class="btn_secondary"
          text="프로모션 신청"
          onClik={applyPromotion}
        ></Button>
      </div>
    </section>
  );
};

export default PromotionApply;
