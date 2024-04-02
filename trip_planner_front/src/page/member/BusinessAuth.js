import { useState } from "react";
import "./member.css";
import { useLocation, useNavigate } from "react-router-dom";

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
        <JoinInputWrap
          label="이메일"
          placeholder="ex)aaa@naver.com"
          content="memberEmail"
          type="text"
          data={memberEmail}
          setData={setMemberEmail}
          checkMsg={checkEmailMsg}
          blurEvent={emailChk}
        />
        <JoinInputWrap
          label="이메일"
          placeholder="ex)aaa@naver.com"
          content="memberEmail"
          type="text"
          data={memberEmail}
          setData={setMemberEmail}
          checkMsg={checkEmailMsg}
          blurEvent={emailChk}
        />
        <JoinInputWrap
          label="이메일"
          placeholder="ex)aaa@naver.com"
          content="memberEmail"
          type="text"
          data={memberEmail}
          setData={setMemberEmail}
          checkMsg={checkEmailMsg}
          blurEvent={emailChk}
        />
      </div>
    </section>
  );
};

export default BusinessAuth;
