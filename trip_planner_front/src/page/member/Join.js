import { useState } from "react";
import "./member.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "../../component/FormFrm";
import { JoinInputWrap } from "./MemberForm";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberNickName, setMemberNickName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberAddr, setMemberAddr] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");

  //회원가입버튼 클릭 시 동작할 이벤트
  const join = () => {
    console.log("로그인 함수 호출");
    if (
      memberEmail !== "" &&
      memberPw !== "" &&
      memberName !== "" &&
      memberNickName !== "" &&
      memberPhone !== "" &&
      memberAddr !== ""
    ) {
      const obj = {
        memberEmail,
        memberPw,
        memberName,
        memberNickName,
        memberPhone,
        memberAddr,
      };
      axios
        .post(backServer + "/member/join", obj)
        .then((res) => {
          if (res.data.message === "success") {
            navigate("/login");
          } else {
            Swal.fire(
              "처리중 에러가 발생했습니다. 잠시후 다시 시도해주세요."
            ).then(() => {
              navigate("/");
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  return (
    <section className="contents join">
      <h2>회원가입</h2>
      <div className="join_input_area">
        <JoinInputWrap
          label="이메일"
          placeholder="ex)aaa@naver.com"
          content="memberEmail"
          type="text"
          data={memberEmail}
          setData={setMemberEmail}
        />
        <JoinInputWrap
          label="비밀번호"
          content="memberPw"
          placeholder="비밀번호는 영어 대소문자/특수문자 포함으로 8~20글자 입니다."
          type="password"
          data={memberPw}
          setData={setMemberPw}
        />
        {/*
        <JoinInputWrap
          label="비밀번호 확인"
          content="memberPwRe"
          type="password"
          data={memberPwRe}
          setData={setMemberPwRe}
        />
        */}
        <JoinInputWrap
          label="이름"
          content="memberName"
          type="text"
          data={memberName}
          setData={setMemberName}
        />
        <JoinInputWrap
          label="닉네임"
          content="memberNickName"
          type="text"
          data={memberNickName}
          setData={setMemberNickName}
        />
        <JoinInputWrap
          label="전화번호"
          content="memberNickName"
          type="text"
          placeholder="ex)010-0000-0000"
          data={memberPhone}
          setData={setMemberPhone}
        />
        <JoinInputWrap
          label="주소"
          content="memberAddr"
          type="text"
          data={memberAddr}
          setData={setMemberAddr}
        />
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
