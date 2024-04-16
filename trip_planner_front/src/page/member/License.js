import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./member.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const License = () => {
  const navigate = useNavigate();
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const agree1Chk = () => {
    if (agree1 === false) {
      setAgree1(true);
    } else {
      setAgree1(false);
    }
  };

  const agree2Chk = () => {
    if (agree2 === false) {
      setAgree2(true);
    } else {
      setAgree2(false);
    }
  };

  const general = () => {
    if (agree1 && agree2) {
      navigate("/join/", { state: { value: 1 } });
    } else {
      Swal.fire({
        title: "약관 동의",
        text: "약관에 모두 동의해주세요",
        icon: "error",
      });
    }
  };
  const partner = () => {
    if (agree1 && agree2) {
      navigate("/join/", { state: { value: 2 } });
    } else {
      Swal.fire({
        title: "약관 동의",
        text: "약관에 모두 동의해주세요",
        icon: "error",
      });
    }
  };
  return (
    <section className="contents license">
      <h2>약관동의</h2>
      <div className="license-input-wrap">
        <div className="license-title"></div>
        <div className="license-content">
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                이용약관 동의
              </AccordionSummary>
              <AccordionDetails>
                여행사 회원가입 약관 제1조 (목적) 본 약관은 회원과 여행사 사이의
                회원가입 및 서비스 이용에 관한 규정을 목적으로 합니다. 제2조
                (정의) "회사"란 본 약관에 따라 서비스를 제공하는 여행사를
                의미합니다. "회원"이란 본 약관에 따라 회사와 이용계약을 체결하고
                회사가 제공하는 서비스를 이용하는 개인 또는 법인을 의미합니다.
                제3조 (회원가입) 회원가입은 회원이 본 약관에 동의한 후 회사가
                정한 양식에 따라 회원정보를 기입하여 신청하는 것으로 합니다.
                회원가입 시 기입한 정보는 본인확인 및 서비스 제공을 위한 용도로
                사용되며, 거짓 정보를 제공할 경우 회원자격 상실 및 관련 법적
                책임을 지게 됩니다. 제4조 (회원정보의 관리) 회원은 회원가입 시
                등록한 정보를 정확하게 유지하여야 합니다. 회원은 자신의 정보를
                부정하게 이용하여 발생하는 문제에 대해 회사는 책임을 지지
                않습니다. 회원은 개인정보가 유출되지 않도록 관리에 충분한 주의를
                기울여야 합니다. 제5조 (서비스의 제공) 회사는 회원에게 다양한
                여행 상품 및 관련 서비스를 제공할 수 있습니다. 회사는 서비스
                제공을 위해 회원의 개인정보를 수집 및 이용할 수 있으며, 이에
                대한 자세한 사항은 개인정보 처리방침에 따릅니다. 제6조 (서비스의
                변경 및 중단) 회사는 운영상 또는 기술적 사유로 서비스의 내용 및
                제공 방식을 변경할 수 있습니다. 회사는 회원의 서비스 이용에
                있어서 사전 통보 후 일정 기간 동안 서비스를 중단할 수 있습니다.
                제7조 (회원의 의무) 회원은 서비스 이용 시 관련 법령 및 약관을
                준수하여야 합니다. 회원은 회사의 명시적인 동의 없이 서비스를
                영리적 목적으로 이용하거나 타인에게 양도할 수 없습니다. 제8조
                (분쟁해결) 본 약관에 명시되지 않은 사항 또는 본 약관에 관한
                분쟁은 회사와 회원간의 합의에 따라 해결되며, 합의에 이르지 않을
                경우 관련 법령 및 회사의 내부규정에 따라 처리됩니다. 제9조
                (약관의 변경) 회사는 필요한 경우 약관을 개정할 수 있으며, 개정된
                약관은 회원에게 통지함으로써 효력을 발생합니다. 제10조 (준거법
                및 관할법원) 본 약관과 관련된 분쟁에 대해서는 대한민국 법률을
                적용하며, 관련 소송은 서울중앙지방법원을 관할법원으로 합니다.
                부칙 본 약관은 2024년 3월 25일부터 시행됩니다.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                개인정보 수집 및 이용 동의
              </AccordionSummary>
              <AccordionDetails>
                개인정보 수집 및 이용 동의에 관한 내용
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="license-check">
          <input
            type="checkbox"
            id="agree1"
            checked={agree1}
            onChange={agree1Chk}
          />
          <label htmlFor="agree1">이용약관에 동의하겠습니다</label>
        </div>
        <div className="license-check">
          <input
            type="checkbox"
            id="agree2"
            checked={agree2}
            onChange={agree2Chk}
          />
          <label htmlFor="agree2">개인정부 수집 및 이용에 동의하겠습니다</label>
        </div>
      </div>
      <div className="btn_area">
        <button type="button" onClick={general} className="btn_primary outline">
          일반회원 가입
        </button>
        <button
          type="button"
          onClick={partner}
          className="btn_secondary outline"
        >
          기업회원 가입
        </button>
      </div>
    </section>
  );
};

export default License;
