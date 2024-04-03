import { useState } from "react";
import { Button, Input } from "../../component/FormFrm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyInfo = ({ member }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const memberEmail = member.memberEmail;
  const memberNo = member.memberNo;
  const [memberPw, setMemberPw] = useState(member.memberPw);
  const [memberName, setMemberName] = useState(member.memberName);
  const [memberNickName, setMemberNickName] = useState(member.memberNickName);
  const [memberPhone, setMemberPhone] = useState(member.memberPhone);
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
      memberName !== "" &&
      memberNickName !== "" &&
      memberPhone !== ""
    ) {
      axios
        .patch(backServer + "/member/updateMember", obj)
        .then((res) => {
          console.log(res.data);
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
        <Input
          label="회원번호"
          content="memberNo"
          type="text"
          data={memberNo}
          disabled="disabled"
        />
        <Input
          label="이메일"
          content="memberEmail"
          type="text"
          data={memberEmail}
          disabled="disabled"
        />
        <Input
          label="비밀번호"
          content="memberPw"
          type="password"
          data={memberPw}
          setData={setMemberPw}
          disabled="disabled"
        />
        <Input
          label="이름"
          content="memberName"
          type="text"
          data={memberName}
          setData={setMemberName}
        />
        <Input
          label="닉네임"
          content="memberNickName"
          type="text"
          data={memberNickName}
          setData={setMemberNickName}
        />
        <Input
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
