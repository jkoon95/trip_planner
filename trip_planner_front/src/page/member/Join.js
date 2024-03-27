import { useState } from "react";
import "./member.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { Button, Input } from "../../component/FormFrm";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberNickName, setMemberNickName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const join = () => {
    navigate("/");
  };
  return (
    <section className="contents join">
      <h2>회원가입</h2>
      <div className="join_input_area">
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="memberEmail">이메일</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="memberEmail"
              placeholder="abc@google.com"
              data={memberEmail}
              setData={setMemberEmail}
            />
          </div>
        </div>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="memberPw">비밀번호</label>
          </div>
          <div className="input_item">
            <Input
              type="password"
              content="memberPw"
              placeholder="8글자~20글자/영어 대소문자 특수문자 포함"
              data={memberPw}
              setData={setMemberPw}
            />
          </div>
        </div>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="memberName">이름</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="memberName"
              data={memberName}
              setData={setMemberName}
            />
          </div>
        </div>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="memberNickName">닉네임</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="memberNickName"
              placeholder="6~10글자"
              data={memberNickName}
              setData={setMemberNickName}
            />
          </div>
        </div>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="memberPhone">전화번호</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="membePhone"
              placeholder="010-0000-0000"
              data={memberPhone}
              setData={setMemberPhone}
            />
          </div>
        </div>
        <div className="btn_area">
          <Button
            text="회원가입"
            class="btn_primary"
            clickEvent={join}
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default Join;
