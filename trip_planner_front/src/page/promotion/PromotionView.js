import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PromotionView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const promotionNo = params.promotionNo;
  const [promotion, setPromotion] = useState({});
  useEffect(() => {
    axios
      .post(backServer + "/promotion/selectOnePromotion/" + promotionNo)
      .then((res) => {
        console.log(res.data.data);
        setPromotion(res.data.data);
      })
      .catch((res) => {});
  }, []);
  const check = () => {
    console.log(promotion);
  };
  return (
    <section className="contents promotion">
      <div className="promotionVeiw-wrap"></div>
      <button onClick={check}>확인</button>
      <h1>프로모션 상세</h1>
    </section>
  );
};

export default PromotionView;
