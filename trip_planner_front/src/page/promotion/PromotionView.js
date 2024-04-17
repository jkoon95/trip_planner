import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";

const PromotionView = (props) => {
  const member = props.member;
  const memberNo = member.memberNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const promotionNo = params.promotionNo;
  const [promotion, setPromotion] = useState({});
  const [seat, setSeat] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remainingSeat, setRemainingSeat] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(backServer + "/promotion/selectOnePromotion/" + promotionNo)
      .then((res) => {
        setPromotion(res.data.data);
      })
      .catch((res) => {});
  }, [promotionNo]);
  console.log(promotion);
  console.log(member);
  const changeData = (e) => {
    setSeat(e.target.value);
    setTotalPrice(promotion.promotionPrice * e.target.value);
  };

  const purchasePromotion = () => {
    const dateString = new Date().toISOString();
    const { IMP } = window;
    IMP.init("imp82445436");

    IMP.request_pay(
      {
        pg: "danal_tpay.9810030929",
        pay_method: "card",
        merchant_uid: "product_no_" + dateString,
        name: "주문명:결제테스트",
        amount: 100,
        buyer_email: member.memberEmail,
        buyer_name: member.memberName,
        buyer_tel: member.memberPhone,
        buyer_addr: member.memberAddr,
      },
      function (rsp) {
        if (rsp.success) {
          Swal.fire({
            title: "결제 완료",
            text: "결제가 완료되었습니다.",
            icon: "success",
          });

          //먼저 남은인원 체크
          axios
            .post(backServer + "/promotion/checkRemainingSeat/" + promotionNo)
            .then((res) => {
              setRemainingSeat(res.data.data);

              //남은 인원보다 구매 인원이 많으면 거부
              if (seat > res.data.data) {
                Swal.fire({
                  icon: "warning",
                  text: `잔여인원보다 많습니다. 잔여인원은 ${res.data.data}명 입니다.`,
                  confirmButtonText: "닫기",
                });
              } else {
                //구매 제한 안걸리면 주문
                const formData = new FormData();
                formData.append("promotionNo", promotionNo);
                formData.append("memberNo", memberNo);
                formData.append("seat", seat);

                axios
                  .post(backServer + "/promotion/purchasePromotion", formData)
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
        }
      }
    );
  };

  return (
    <section className="contents promotion">
      <div className="promotionView-wrap">
        <div className="promotionView-header">
          <div className="promotionView-title">
            <h3>{promotion.promotionName}</h3>
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
                <td>가격</td>
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
            placeholder="ex)OO명 ('명' 제외하고 입력)"
            value={seat}
            onChange={changeData}
          />
        </div>
        <div className="promotion-purchase-alert">
          <ul>
            * 프로모션 D-DAY 7일 이후로는 전액 환불이 어려우실 수 있습니다.
          </ul>
          <ul>* 프로모션 D-DAY 3일 이후에는 환불이 불가능합니다.</ul>
          <ul>
            * 고객 착오로 인한 구매실수에 대하여 (주) Trip_planner는 책임지지
            않습니다
          </ul>
          <ul>
            * 프로모션 관련 문의사항에 대하여는 상단의 상담 전화번호로
            문의하세요
          </ul>
        </div>
      </div>
      <div className="btn_area">
        {totalPrice !== 0 && seat !== 0 ? (
          <Button
            text="프로모션 구매하기"
            class="btn_primary"
            clickEvent={purchasePromotion}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default PromotionView;
