import { useState } from "react";
import "./member.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import Input from "../../component/FormFrm";

const Login = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const login = () => {
    if (memberEmail !== "" && memberPw !== "") {
      const obj = { memberEmail, memberPw };
      axios
        .post(backServer + "/member/login", obj)
        .then((res) => {
          if (res.data.message === "success") {
            console.log("로그인 성공");
            Swal.fire({
              title: "로그인 성공",
              text: "로그인을 성공했습니다",
              icon: "success",
            });
            navigate("/");
          } else {
            Swal.fire({
              title: "로그인 실패",
              text: "아이디/비밀번호를 확인하세요",
              icon: "fail",
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div className="login-wrap">
      <div className="page-title">로그인</div>
      <div className="login-input-wrap">
        <label htmlFor="memberEmail">이메일</label>
        <Input
          type="text"
          content="memberEmail"
          data={memberEmail}
          setData={setMemberEmail}
        />
      </div>
      <div className="login-input-wrap">
        <label htmlFor="memberPw">비밀번호</label>
        <Input
          type="password"
          content="memberPw"
          data={memberPw}
          setData={setMemberPw}
        />
      </div>
      <button className="btn" onClick={login}>
        로그인
      </button>
    </div>
  );
};

export default Login;
