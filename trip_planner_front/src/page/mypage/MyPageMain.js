import { useEffect, useState } from "react";
import MypageSideMenu from "./MypageSideMenu";
import "./mypage.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import MyTrips from "./MyTrips";
import MyBooks from "./MyBooks";
import MyCoupons from "./MyCoupons";
import MyLikes from "./MyLikes";
import MyReviews from "./MyReviews";
import MyInfo from "./MyInfo";
import axios from "axios";
import Swal from "sweetalert2";

const MypageMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.isLogin;
  const logout = props.logout;
  const [member, setMember] = useState("");
  const navigate = useNavigate();

  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      text: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    });
    navigate("/");
  }
  console.log(window.localStorage.getItem("member"));

  useEffect(() => {
    axios
      .get(backServer + "/member")
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const [menus, setMenus] = useState([
    { url: "myBooks", text: "내 예약", active: true },
    { url: "myTrips", text: "내 여행", active: false },
    { url: "myCoupons", text: "쿠폰함", active: false },
    { url: "myLikes", text: "찜 리스트", active: false },
    { url: "myReviews", text: "내 리뷰 보기", active: false },
    { url: "myInfo", text: "내 정보 수정", active: false },
  ]);

  return (
    <section className="contents mypage">
      <div className="side_wrap">
        <h2>마이페이지</h2>
        <MypageSideMenu menus={menus} setMenus={setMenus} />
      </div>
      <div className="content_wrap">
        {/* {member && member.memberType === 1 ? ( */}
        {isLogin ? (
          <Routes>
            <Route path="/myBooks" element={<MyBooks />} />
            <Route path="/myTrips" element={<MyTrips />} />
            <Route path="/myCoupons" element={<MyCoupons />} />
            <Route path="/myLikes" element={<MyLikes />} />
            <Route path="/myReviews" element={<MyReviews />} />
            <Route path="/myInfo" element={<MyInfo />} />
          </Routes>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MypageMain;
