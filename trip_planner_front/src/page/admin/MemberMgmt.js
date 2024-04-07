import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MemberMgmt = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      text: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    }).then(navigate("/"));
  }
  if (member.memberType !== 3) {
    Swal.fire({
      title: "접근거부",
      text: "관리자 페이지입니다.",
      icon: "warning",
    });
    navigate("/");
  }
  return (
    <section className="contents couponReg">
      <div className="input_wrap">
        <h2>쿠폰 등록</h2>
      </div>
    </section>
  );
};

export default MemberMgmt;
