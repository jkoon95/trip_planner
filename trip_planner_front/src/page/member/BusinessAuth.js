import { useState } from "react";
import "./member.css";
import { useLocation, useNavigate } from "react-router-dom";
import { JoinInputWrap } from "./MemberForm";

const BusinessAuth = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const location = useLocation();
  const memberEmail = location.state.memberEmail;
  const [partnerName, setPartnerName] = useState("");
  const [partnerTel, setPartnerTel] = useState("");
  const [partnerType, setPartnerType] = useState(1);
  const [businessNo, setBusinessNo] = useState("");
  const businessAuth = () => {};
  return (
    <section className="contents join">
      <h2>사업자 인증</h2>
      <div className="join_input_area">
        <JoinInputWrap label="상호명" content="partnerName" type="text" />
        <JoinInputWrap
          label="업체 전화번호"
          placeholder="010-0000-0000"
          content="partnerTel"
          type="text"
        />
        <JoinInputWrap
          label="사업자번호"
          placeholder="'-'포함"
          content="memberEmail"
          type="text"
        />
      </div>
    </section>
  );
};

export default BusinessAuth;
