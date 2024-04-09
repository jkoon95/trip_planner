import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../component/FormFrm";
import { Padding } from "@mui/icons-material";
import { JoinInputWrap } from "../member/MemberForm";

const MemberView = ({ isLogin, memberType }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const memberNo = params.memberNo;
  const navigate = useNavigate();
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      text: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    });
    navigate("/");
  }
  if (memberType !== 3) {
    Swal.fire({
      title: "접근거부",
      text: "관리자 페이지입니다.",
      icon: "warning",
    });
    navigate("/");
  }
  const [member, setMember] = useState("");
  useEffect(() => {
    axios
      .get(backServer + "/admin/selectOneMember/" + memberNo)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setMember(res.data.data);
        }
      })
      .catch((res) => {});
  }, []);
  const blockMember = () => {
    axios
      .patch(backServer + "/admin/blockMember/" + memberNo)
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire({
            title: "차단 완료",
            text: "차단완료하였습니다.",
            icon: "success",
          });
          navigate("/mypage/admin/memberMgmt");
        }
      })
      .catch((res) => {});
  };
  return (
    <section className="contents memberMgmtView">
      <div className="memberMgmtView-title">
        <img className="title-img" src="/images/icons8-회원-80.png" />
        <h2 id="title">
          {member.memberType === 1
            ? "일반회원"
            : member.memberType === 2
            ? "업체"
            : "관리자"}
        </h2>
        {member.memberStatus === 2 ? (
          <span id="block-icons" class="material-icons">
            block
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="memberMgmtView_wrap">
        <div class="memberMgmtView_area">
          <JoinInputWrap
            label="회원번호"
            content="memberNo"
            type="number"
            data={member.memberNo}
            readOnly="readOnly"
          />
          <JoinInputWrap
            label="이름"
            content="memberName"
            type="text"
            data={member.memberName}
            readOnly="readOnly"
          />
          <JoinInputWrap
            label="닉네임"
            content="memberNickName"
            type="text"
            data={member.memberNickName}
            readOnly="readOnly"
          />
          <JoinInputWrap
            label="전화번호"
            content="memberPhone"
            type="text"
            data={member.memberPhone}
            readOnly="readOnly"
          />
          <JoinInputWrap
            label="주소"
            content="memberAddr"
            type="text"
            data={member.memberAddr}
            readOnly="readOnly"
          />
          <JoinInputWrap
            label="주소"
            content="memberAddr"
            type="text"
            data={member.memberAddr}
            readOnly="readOnly"
          />
        </div>
      </div>
      <div className="btn_area">
        <Button
          id="block_btn"
          text="차단하기"
          class="btn_primary"
          clickEvent={blockMember}
        />
      </div>
    </section>
  );
};

export default MemberView;
