import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../component/FormFrm";

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
  const check = () => {
    console.log(member);
  };
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
    <section className="contents memberMgmt">
      <h2>회원 상세</h2>
      <div className="memberMgmt_wrap"></div>
      <Button text="확인용" clickEvent={check} />
      <Button text="차단하기" class="btn_primary" clickEvent={blockMember} />
    </section>
  );
};

export default MemberView;
