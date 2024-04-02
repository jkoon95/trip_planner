import { useEffect, useState } from "react";
import "./member.css";
import { useLocation, useNavigate } from "react-router-dom";
import { JoinInputWrap } from "./MemberForm";
import axios from "axios";
import { Button } from "../../component/FormFrm";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";

const BusinessAuth = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const location = useLocation();
  const memberEmail = location.state.memberEmail;
  const [partnerName, setPartnerName] = useState("");
  const [partnerTel, setPartnerTel] = useState("");
  const [partnerType, setPartnerType] = useState(1);
  const [businessNo, setBusinessNo] = useState("");
  const [checkbusinessMsg, setBusinessMsg] = useState("");

  const businessAuthApi = () => {
    const apiKey = process.env.REACT_APP_BUSINESS_API_KEY;
    // API URL 생성
    const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${apiKey}`;
    axios
      .post(url, { b_no: [businessNo] })
      .then((res) => {
        if (res.data.data[0].b_stt_cd === "01") {
          setBusinessMsg("유효한 사업자입니다");
        } else {
          setBusinessMsg("인증 실패");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const businessAuth = () => {
    const obj = {
      memberEmail,
      partnerName,
      partnerTel,
      partnerType,
      businessNo,
    };
    console.log(obj);
    if (
      memberEmail !== "" &&
      partnerName !== "" &&
      partnerTel !== "" &&
      partnerType !== "" &&
      businessNo !== "" &&
      checkbusinessMsg === "유효한 사업자입니다"
    ) {
      {
        console.log(obj);
        axios
          .post(backServer + "/member/businessAuth", obj)
          .then((res) => {
            if (res.data.message === "success") {
              Swal.fire({
                title: "사업자인증 성공",
                text: "사업자 인증을 성공하셨습니다",
                icon: "success",
              });
              navigate("/login");
            } else {
              Swal.fire(
                "처리중 에러가 발생했습니다. 잠시후 다시 시도해주세요."
              ).then(() => {});
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  };

  return (
    <section className="contents join">
      <h2>사업자 인증</h2>
      <div className="join_input_area">
        <JoinInputWrap
          label="상호명"
          content="partnerName"
          type="text"
          data={partnerName}
          setData={setPartnerName}
        />
        <JoinInputWrap
          label="업체 전화번호"
          placeholder="010-0000-0000"
          content="partnerTel"
          type="text"
          data={partnerTel}
          setData={setPartnerTel}
        />
        <SelectPartnerType data={partnerType} setData={setPartnerType} />
        <div className="auth">
          <JoinInputWrap
            label="사업자번호"
            placeholder="'-'제외"
            id="b_input"
            content="businessNo"
            type="text"
            data={businessNo}
            checkMsg={checkbusinessMsg}
            setData={setBusinessNo}
          />
          <Button
            text="사업자 인증"
            class="btn_primary b_auth"
            clickEvent={businessAuthApi}
          ></Button>
        </div>
      </div>
      <div className="btn_area">
        <Button
          text="사업자 등록"
          class="btn_primary"
          clickEvent={businessAuth}
        ></Button>
      </div>
    </section>
  );
};

const SelectPartnerType = (props) => {
  const data = props.data;
  const setData = props.setData;
  const changePartnerType = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="auth">
      <FormControl variant="standard" sx={{ minWidth: 240 }}>
        <InputLabel id="demo-simple-select-standard-label">유형</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={data}
          label="숙소"
          onChange={changePartnerType}
        >
          <MenuItem value={1}>숙소</MenuItem>
          <MenuItem value={2}>레저</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default BusinessAuth;
