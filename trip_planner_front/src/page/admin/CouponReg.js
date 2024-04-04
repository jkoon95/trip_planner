import { useEffect, useState } from "react";
import "./admin.css";
import { Button, Input } from "../../component/FormFrm";
import { ExpireDatePicker, RadioType, SelectType } from "./AdminFrm";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const CouponReg = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [couponName, setCouponName] = useState("");
  const [couponRange, setCouponRange] = useState(1);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discount, setDiscount] = useState(1);
  const [expireDate, setExpireDate] = useState(dayjs(new Date()));
  const assignCoupon = () => {
    const expiredDate = dayjs(expireDate).toDate();
    console.log(expiredDate, typeof expiredDate);
    const obj = {
      couponName,
      couponRange,
      discountRate,
      discountAmount,
      discount,
      expiredDate,
    };

    axios
      .post(backServer + "/admin/couponReg", obj)
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire({
            title: "쿠폰등록 완료",
            text: "쿠폰등록 성공",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "쿠폰등록 실패",
            text: "정보를 다시 확인해주세요",
            icon: "error",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <section className="contents couponReg">
      <div className="input_wrap">
        <h2>쿠폰 등록</h2>
        <div className="couponReg-input-wrap">
          <div className="couponReg-input">
            <CouponRegInputWrap
              label="쿠폰명"
              className="coupon-input"
              content="couponName"
              type="text"
              data={couponName}
              setData={setCouponName}
            />
          </div>
          <div className="couponReg-input">
            <SelectType
              data={couponRange}
              setData={setCouponRange}
              type="사용처 설정"
              value1="숙소"
              value2="레저"
              value3="프로모션"
              value4="전체"
            ></SelectType>
          </div>
          <div className="couponReg-input">
            <RadioType
              value1="할인율"
              value2="할인액"
              value={discount}
              setValue={setDiscount}
            ></RadioType>
          </div>
          <div className="couponReg-iput">
            {discount === 2 && (
              <div className="couponReg-input">
                <CouponRegInputWrap
                  label="할인액"
                  className="coupon-input"
                  placeholder="'￦' 단위 제외"
                  content="couponName"
                  type="text"
                  data={discountAmount}
                  setData={setDiscountAmount}
                />
              </div>
            )}
            {discount === 1 && (
              <div className="couponReg-input">
                <CouponRegInputWrap
                  label="할인율"
                  placeholder="단위 %, 1~99"
                  className="coupon-input"
                  content="couponName"
                  type="text"
                  data={discountRate}
                  setData={setDiscountRate}
                />
              </div>
            )}
          </div>
          <div className="couponReg-input">
            <ExpireDatePicker
              expireDate={expireDate}
              setExpireDate={setExpireDate}
            />
          </div>
        </div>
      </div>
      <div className="btn_area">
        <Button
          text="쿠폰 등록하기"
          class="btn_primary"
          clickEvent={assignCoupon}
        ></Button>
      </div>
    </section>
  );
};

const CouponRegInputWrap = (props) => {
  const {
    label,
    type,
    content,
    data,
    setData,
    placeholder,
    blurEvent,
    checkMsg,
  } = props;

  const chageData = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="input_wrap coupon-input">
      <div>
        <div className="input_title">
          <label className="input2" htmlFor={content}>
            {label}
          </label>
        </div>
        <div className="input_item">
          <Input
            value={data}
            class="coupon-input"
            onChange={chageData}
            placeholder={placeholder}
            type={type}
            data={data}
            setData={setData}
            blurEvent={blurEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default CouponReg;
