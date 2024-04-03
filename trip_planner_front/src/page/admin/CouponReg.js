import { useState } from "react";
import "./admin.css";
import { Button, Input } from "../../component/FormFrm";
import { RadioType, SelectType } from "./AdminFrm";

const CouponReg = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [couponName, setCouponName] = useState("");
  const [couponRange, setCouponRange] = useState(1);
  const [discount, setDiscount] = useState(0);
  const assignCoupon = () => {
    console.log("할인 " + discount);
    console.log("쿠폰범위 " + couponRange);
    console.log("쿠폰이름 " + couponName);
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
        {checkMsg && <p className="msg error">{checkMsg}</p>}
      </div>
    </div>
  );
};

export default CouponReg;
