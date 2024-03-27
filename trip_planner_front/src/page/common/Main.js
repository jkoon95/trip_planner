import { Link } from "react-router-dom";

const Main = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;
  console.log(isLogin);
  return (
    <>
      <h1>메인페이지</h1>
      {isLogin ? (
        <>로그인 중입니다</>
      ) : (
        <Link to="/login">로그인이 필요합니다</Link>
      )}
    </>
  );
};

export default Main;
