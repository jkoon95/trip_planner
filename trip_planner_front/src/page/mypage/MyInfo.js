import { useState } from "react";
import { Button, Input } from "../../component/FormFrm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { JoinInputWrap } from "../member/MemberForm";

const MyInfo = ({ member }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const memberEmail = member.memberEmail;
  const memberNo = member.memberNo;
  const [memberPw, setMemberPw] = useState("");
  const [memberName, setMemberName] = useState(member.memberName);
  const [memberNickName, setMemberNickName] = useState(member.memberNickName);
  const [memberPhone, setMemberPhone] = useState(member.memberPhone);
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [checkNickNameMsg, setCheckNickNameMsg] = useState("");
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
  const nickNameChk = () => {
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

  const updateMyInfo = () => {
    const obj = {
      memberEmail,
      memberNo,
      memberPw,
      memberName,
      memberNickName,
      memberPhone,
    };
    if (
      memberPw !== "" &&
      checkPwMsg === "" &&
      memberName !== "" &&
      memberNickName !== "" &&
      memberPhone !== "" &&
      checkNickNameMsg === ""
    ) {
      axios
        .patch(backServer + "/member/updateMember", obj)
        .then((res) => {
          navigate("/");
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <section className="contents myinfo">
      <h2>회원정보 수정</h2>
      <div className="myinfo_input_area">
        <JoinInputWrap
          label="회원번호"
          content="memberNo"
          type="text"
          data={memberNo}
          disabled="disabled"
        />
        <JoinInputWrap
          label="이메일"
          content="memberEmail"
          type="text"
          data={memberEmail}
          disabled="disabled"
        />
        <JoinInputWrap
          label="비밀번호"
          content="memberPw"
          placeholder="비밀번호는 영어 대소문자/특수문자 포함으로 8~20글자 입니다."
          type="password"
          data={memberPw}
          setData={setMemberPw}
          blurEvent={pwChk}
          checkMsg={checkPwMsg}
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
          data={memberPhone}
          setData={setMemberPhone}
        />
      </div>
      <div className="btn_area">
        <Button
          text="회원정보 수정"
          class="btn_primary"
          clickEvent={updateMyInfo}
        ></Button>
      </div>
    </section>
  );
};

export default MyInfo;
