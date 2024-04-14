import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";

const PromotionView = (props) => {
  const member = props.member;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const promotionNo = params.promotionNo;
  const [promotion, setPromotion] = useState({});
  const [seat, setSeat] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remainingSeat, setRemaingSeat] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(backServer + "/promotion/selectOnePromotion/" + promotionNo)
      .then((res) => {
        setPromotion(res.data.data);
      })
      .catch((res) => {});
  }, [promotionNo]);
  const check = () => {
    console.log(totalPrice);
    console.log(seat);
    console.log(promotion);
  };
  const changeData = (e) => {
    setSeat(e.target.value);
    setTotalPrice(promotion.promotionPrice * e.target.value);
  };

  const purchasePromotion = () => {
    const formData = new FormData();
    formData.append("promotion", promotion);
    formData.append("member", member);
    //먼저 남은인원 체크
    axios
      .post(backServer + "/promotion/checkRemainingSeat/" + promotionNo)
      .then((res) => {
        setRemaingSeat(res.data.data);
        //남은 인원보다 구매 인원이 많으면 거부
        if (seat > res.data.data) {
          Swal.fire({
            icon: "warning",
            text: `잔여인원보다 많습니다. 잔여인원은 ${res.data.data}명 입니다.`,
            confirmButtonText: "닫기",
          });
        } else {
          //구매 제한 안걸리면 주문
          axios
            .post(backServer + "/promotion/purchasePromotion/" + seat, formData)
            .then((res) => {
              if (res.data.message === "success") {
                Swal.fire({
                  icon: "success",
                  text: "주문 성공",
                  confirmButtonText: "닫기",
                });
                navigate("/promotion/promotionList");
              }
            })
            .catch((res) => {
              console.log(res);
            });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <section className="contents promotion">
      <div className="btn_area">
        <Button text="시험용(임시)" class="btn_primary" clickEvent={check} />
      </div>
      <div className="promotionView-wrap">
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
                <td className="promotionView-intro" colSpan={2}>
                  {promotion.promotionIntro}
                </td>
              </tr>
              <tr>
                <td>모집인원</td>
                <td>{promotion.promotionLimit}</td>
              </tr>
              <tr>
                <td>모집인원</td>
                <td>{promotion.promotionPrice}</td>
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
      <div className="purchase-wrap">
        <div className="purchase-price">결제금액 : {totalPrice}원</div>
        <div className="purchase-amount">
          결제수량 :{" "}
          <input
            id="purchase-input"
            placeholder="숫자"
            value={seat}
            onChange={changeData}
          />
        </div>
      </div>
      <div className="btn_area">
        <Button
          text="프로모션 구매하기"
          class="btn_primary"
          clickEvent={purchasePromotion}
        />
      </div>
    </section>
  );
};

export default PromotionView;
