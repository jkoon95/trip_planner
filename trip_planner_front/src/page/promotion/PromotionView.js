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
        setPromotion(res.data.data);
      })
      .catch((res) => {});
  }, []);
  const check = () => {
    console.log(promotion);
  };
  return (
    <section className="contents promotion">
      <div className="promotionView-wrap">
        <button onClick={check}>확인</button>
        <div className="promotionView-header">
          <div className="promotionView-title">
            <h1>{promotion.promotionName}</h1>
          </div>
          <div className="promotionView-thumbnail">
            <img
              src={
                backServer +
                "/promotion/promotionThumbnail/" +
                promotion.promotionImg
              }
            />
          </div>
        </div>

        <div className="promotionView-content">
          <table className="promotionView-tbl">
            <thead>
              <tr>
                <th colSpan={2}>예약규정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>주관사</td>
                <td>{promotion.partnerName}</td>
              </tr>
              <tr>
                <td>지역</td>
                <td>{promotion.promotionRegion}</td>
              </tr>
              <tr>
                <td colSpan={2}>{promotion.promotionIntro}</td>
              </tr>
              <tr>
                <td>모집인원</td>
                <td>{promotion.promotionLimit}</td>
              </tr>
              <tr>
                <td>마감기한</td>
                <td>{promotion.promotionExpiredDate}</td>
              </tr>
              <tr>
                <td>상담 전화번호</td>
                <td>{promotion.partnerTel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PromotionView;
