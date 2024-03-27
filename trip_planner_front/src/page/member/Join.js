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
  {
    /*
  const pwChk = () => {
    //정규표현식으로 유효성 검사
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[\W_]).{8,20}$/;
    if (pwReg.test(memberPw)) {
      //정규표현식 만족했을때
      setCheckPwMsg("비밀번호 기준을 만족했습니다.");
    } else {
      //정규표현식 만족하지 못했을때
      setCheckPwMsg(
        "비밀번호는 영어 대소문자/특수문자 포함으로 8~20글자 입니다."
      );
    }
  };
  //비밀번호 확인을 입력하면, 비밀번호와 일치하는지 체크하는 함수
  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwMsg("");
    }
  };
  //회원가입버튼 클릭 시 동작할 이벤트

  const join = () => {
    if (
      memberId !== "" &&
      memberPw !== "" &&
      memberName !== "" &&
      memberPhone !== "" &&
      checkIdMsg === "" &&
      checkPwMsg === ""
    ) {
      const obj = { memberId, memberPw, memberName, memberPhone };
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
*/
  }
  return (
    <section className="contents join">
      <h2>회원가입</h2>
      <div className="join_input_area">
        <JoinInputWrap
          label="이메일"
          content="memberEmail"
          type="text"
          value={memberEmail}
          onChange={setMemberEmail}
        />
        <div className="btn_area">
          <Button text="회원가입" class="btn_primary"></Button>
        </div>
      </div>
    </section>
  );
};

const JoinInputWrap = (props) => {
  const label = props.label;
  const type = props.type;
  const placeholder = props.placeholder;
  const content = props.content;
  const data = props.data; //input태그와 연결할 state
  const setData = props.setData;
  const chageData = props.chageData;
  const clickEvent = props.clickEvent;
  const blurEvent = props.blurEvent;
  const readonly = props.readonly;
  const disabled = props.disabled;
  const inputRef = props.inputRef;
  const keyupEvent = props.keyupEvent;
  const checkMsg = props.checkMsg;
  const changeData = (e) => {
    setData(e.target.value);
  };
  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <Input
          value={data}
          onChange={changeData}
          type={type}
          id={content}
          onBlur={blurEvent}
        />
      </div>
      {checkMsg ? <div className="check-msg">{checkMsg}</div> : ""}
      {/* {checkMsg !== undefined ? (
        <div className="check-msg">{checkMsg}</div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Join;
