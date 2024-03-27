import { Link } from "react-router-dom";

const Main = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;
  console.log(isLogin);
  return (
    <>
      <section className="contents main_hero">메인 히어로</section>
      <section className="contents main_promotion">프로모션</section>
      <section className="contents main_blogs">추천 여행지</section>
      <section className="contents main_ins">인기 숙소</section>
    </>
  );
};

export default Main;
