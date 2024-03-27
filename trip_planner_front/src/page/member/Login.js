import { useState } from "react";
import "./member.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { Button1, Input } from "../../component/FormFrm";

const Login = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const login = () => {
    if (memberEmail !== "" && memberPw !== "") {
      const obj = { memberEmail, memberPw };
      console.log(backServer);
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
    <section className="contents login">
      <h2>로그인</h2>
      <div className="login_input_area">
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="memberEmail">아이디</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="memberEmail"
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
              data={memberPw}
              setData={setMemberPw}
            />
          </div>
        </div>
        <div className="btn_area">
          <Button1 text="로그인" clickEvent={login}></Button1>
        </div>
      </div>
    </section>
  );
};

export default Login;
