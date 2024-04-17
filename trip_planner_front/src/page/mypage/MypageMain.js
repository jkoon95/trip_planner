import { useEffect, useState } from "react";
import MypageSideMenu from "./MypageSideMenu";
import "./mypage.css";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import MyTrips from "./MyTrips";
import MyBooks from "./MyBooks";
import MyCoupons from "./MyCoupons";
import MyLikes from "./MyLikes";
import MyReviews from "./MyReviews";
import MyInfo from "./MyInfo";
import axios from "axios";
import Swal from "sweetalert2";
import InnReg from "../INN/InnReg";
import RoomReg from "../INN/RoomReg";
import TourReg from "./../tour/TourReg";
import TourEdit from "../tour/TourEdit";
import TourSale from "../tour/TourSale";
import TourTicket from "./../tour/TourTicket";
import CouponReg from "../admin/CouponReg";
import MemberMgmt from "../admin/MemberMgmt";
import MemberView from "../admin/MemberView";
import PartnerMgmt from "../admin/PartnerMgmt";
import TourMgmgt from "../tour/TourMgmt";

const MypageMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.isLogin;
  const logout = props.logout;
  const [member, setMember] = useState("");
  const navigate = useNavigate();
  const [currMemberType, setCurrMemberType] = useState();
  const [currPartnerType, setCurrPartnerType] = useState();

  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      text: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    }).then(navigate("/"));
  }

  useEffect(() => {
    if (isLogin) {
      axios
        .get(backServer + "/member")
        .then((res) => {
          // console.log(res.data.data);
          setMember(res.data.data);
          setCurrMemberType(res.data.data.memberType);
          if (res.data.data.memberType === 3) {
            //관리자로 로그인 시
            setMenus([
              { url: "admin/memberMgmt", text: "회원 관리", active: true },
              { url: "admin/partnerMgmt", text: "업체 관리", active: false },
              { url: "admin/couponReg", text: "쿠폰 등록", active: false },
            ]);
            // navigate("/mypage/"+menus[0].url);
          } else if (res.data.data.memberType === 2) {
            //업체로 로그인 시
            axios
              .get(backServer + "/partner/" + res.data.data.memberNo)
              .then((res2) => {
                // console.log(res2.data.data);
                setCurrPartnerType(res2.data.data.partnerType);
                if (
                  res2.data.data !== null &&
                  res2.data.data.partnerType === 1
                ) {
                  //숙소
                  setMenus([
                    { url: "innReg", text: "숙소 등록", active: true },
                    { url: "roomReg", text: "방 등록", active: false },
                    { url: "innMgmt", text: "숙소 관리", active: false },
                    { url: "bookMgmt", text: "예약 관리", active: false },
                  ]);
                  // navigate("/mypage/"+menus[0].url);
                } else if (
                  res2.data.data !== null &&
                  res2.data.data.partnerType === 2
                ) {
                  //투어
                  setMenus([
                    { url: "tour/mgmt", text: "투어 예약관리", active: true },
                    { url: "tour/reg", text: "투어 상품등록", active: false },
                    { url: "tour/sale", text: "투어 상품조회", active: false },
                    { url: "myInfo", text: "내 정보 수정", active: false },
                  ]);
                  // navigate("/mypage/"+menus[0].url);
                } else {
                  //업체인데 등록한 업체가 없을 경우
                  axios
                    .get(backServer + "/member")
                    .then((res) => {
                      navigate("/businessAuth/", {
                        state: { memberEmail: res.data.data.memberEmail },
                      });
                    })
                    .catch((res) => {
                      console.log(res);
                    });
                }
              })
              .catch((res2) => {
                console.log(res2);
              });
          } else {
            //회원으로 로그인 시
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [isLogin]);

  console.log(currMemberType);
  console.log(currPartnerType);

  const [menus, setMenus] = useState([
    { url: "myBooks", text: "내 예약", active: true },
    { url: "myTrips", text: "내 여행", active: false },
    { url: "myCoupons", text: "내 쿠폰함", active: false },
    { url: "myLikes", text: "내 찜 목록", active: false },
    { url: "myReviews", text: "내 리뷰", active: false },
    { url: "myInfo", text: "내 정보 수정", active: false },
  ]);

  useEffect(() => {
    // navigate("/mypage/"+menus[0].url);
  }, [menus]);

  // console.log(menus);

  return (
    <>
      <section className="contents mypage">
        <div className="side_wrap">
          <h2>마이페이지</h2>
          <MypageSideMenu menus={menus} setMenus={setMenus} />
        </div>
        <div className="content_wrap">
          <Routes>
            <Route path="/myTrips" element={<MyTrips />} />
            <Route path="/myCoupons" element={<MyCoupons />} />
            <Route path="/myLikes" element={<MyLikes member={member} />} />
            <Route path="/myReviews" element={<MyReviews member={member} />} />
            <Route
              path="/myInfo"
              element={<MyInfo isLogin={isLogin} member={member} />}
            />
            <Route path="/myBooks" element={<MyBooks />} />

            <Route path="/innReg" element={<InnReg member={member} />} />
            <Route path="/roomReg" element={<RoomReg isLogin={isLogin} />} />
            <Route path="/tour/reg" element={<TourReg />} />
            <Route path="/tour/sale" element={<TourSale member={member} />} />
            <Route path="/tour/edit/:tourNo" element={<TourEdit />} />
            {/* <Route path="/tour/ticket/:tourNo" element={<TourTicket />} /> */}
            <Route path="/tour/ticket/:tourNo" element={<TourTicket />} />
            <Route path="/tour/mgmt" element={<TourMgmgt member={member} />} />

            <Route
              path="/admin/couponReg"
              element={<CouponReg isLogin={isLogin} member={member} />}
            />
            <Route
              path="/admin/memberMgmt"
              element={<MemberMgmt isLogin={isLogin} member={member} />}
            />
            <Route
              path="/admin/memberView/:memberNo"
              element={
                <MemberView isLogin={isLogin} memberType={member.memberType} />
              }
            />
            <Route
              path="/admin/partnerMgmt"
              element={<PartnerMgmt isLogin={isLogin} member={member} />}
            />
            <Route
              path="/*"
              element={
                currMemberType === 1 ? (
                  <MyBooks />
                ) : currMemberType === 3 ? (
                  <MemberMgmt isLogin={isLogin} member={member} />
                ) : currMemberType === 2 && currPartnerType === 1 ? (
                  <InnReg member={member} />
                ) : currMemberType === 2 && currPartnerType === 2 ? (
                  <TourMgmgt member={member} />
                ) : (
                  ""
                )
              }
            />
          </Routes>
        </div>
      </section>
    </>
  );
};

export default MypageMain;
