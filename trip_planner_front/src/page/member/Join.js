import { useState } from "react";
import "./member.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "../../component/FormFrm";
import { JoinInputWrap, Post } from "./MemberForm";

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
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [checkPwReMsg, setCheckPwReMsg] = useState("");
  const [checkNickNameMsg, setCheckNickNameMsg] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddr, setDetailAddr] = useState("");
  const [popup, setPopup] = useState(false);

  const location = useLocation();
  const memberType = location.state.value;

  const emailChk = () => {
    //이메일 형태가 맞는지 검증할 정규표현식
    const emailChk = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailChk.test(memberEmail)) {
      setCheckEmailMsg("이메일 형식이 맞습니다.");
      axios
        .get(backServer + "/member/email/" + memberEmail)
        .then((res) => {
          if (res.data.message === "duplication") {
            setCheckEmailMsg("이미 사용중인 이메일입니다.");
          } else {
            setCheckEmailMsg("");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      setCheckEmailMsg("이메일 형식을 지키세요.");
    }
  };
  const pwChk = () => {
    //정규표현식으로 유효성 검사
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[\W_]).{8,20}$/;
    if (pwReg.test(memberPw)) {
      //정규표현식 만족했을때
      setCheckPwMsg("");
    } else {
      //정규표현식 만족하지 못했을때
      setCheckPwMsg("비밀번호 조건을 다시 확인해주세요.");
    }
  };
  const pwReChk = () => {
    if (memberPw === memberPwRe) {
      setCheckPwReMsg("");
    } else {
      setCheckPwReMsg("비밀번호가 일치하지 않습니다.");
    }
  };
  const nickNameChk = () => {
    console.log(memberNickName);
    axios
      .get(backServer + "/member/nickName/" + memberNickName)
      .then((res) => {
        if (res.data.message === "duplication") {
          setCheckNickNameMsg("이미 사용중인 닉네임입니다.");
        } else {
          setCheckNickNameMsg("");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const join = () => {
    const obj = {
      memberEmail,
      memberPw,
      memberName,
      memberNickName,
      memberPhone,
      memberAddr,
      memberType,
    };
    console.log(obj);
    if (
      memberEmail !== "" &&
      memberPw !== "" &&
      memberName !== "" &&
      memberNickName !== "" &&
      memberPhone !== "" &&
      memberAddr !== "" &&
      checkEmailMsg === "" &&
      checkPwMsg === "" &&
      checkPwReMsg === "" &&
      checkNickNameMsg === ""
    ) {
      console.log(obj);
      console.log(memberPw);
      axios
        .post(backServer + "/member/join", obj)
        .then((res) => {
          if (res.data.message === "success") {
            if (memberType === 1) {
              navigate("/login");
            } else {
              navigate("/businessAuth/", {
                state: { memberEmail: memberEmail },
              });
            }
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
          checkMsg={checkEmailMsg}
          blurEvent={emailChk}
        />
        <JoinInputWrap
          label="비밀번호"
          content="memberPw"
          placeholder="비밀번호는 영어 대소문자/특수문자 포함으로 8~20글자 입니다."
          type="password"
          data={memberPw}
          setData={setMemberPw}
          checkMsg={checkPwMsg}
          blurEvent={pwChk}
        />
        <JoinInputWrap
          label="비밀번호 확인"
          content="memberPwRe"
          type="password"
          data={memberPwRe}
          setData={setMemberPwRe}
          checkMsg={checkPwReMsg}
          blurEvent={pwReChk}
        />
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
          checkMsg={checkNickNameMsg}
          blurEvent={nickNameChk}
        />
        <JoinInputWrap
          label="전화번호"
          content="memberPhone"
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
        {/*
        <JoinInputWrap
          label="우편번호"
          content="zonecode"
          type="text"
          data={zonecode}
          setData={setZonecode}
        />
        <JoinInputWrap
          label="주소"
          content="addr"
          type="text"
          data={address}
          setData={setAddress}
        />
        <JoinInputWrap
          label="상세주소"
          content="detailAddr"
          type="text"
          data={detailAddr}
          setData={setDetailAddr}
        />
        <button
          className="searchAddr"
          onClick={() => {
            setPopup(!popup);
          }}
        >
          주소 검색
        </button>
        {popup && <Post onComplete={onCompletePost} />}
        */}
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
