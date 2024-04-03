import { Link } from "react-router-dom";

const MyTrips = (props) => {
  const member = props.member;
  return(
    <div className="myTrips_wrap">
      내 여행(탭페이지)
      <Link to="/mypage/myTrips/createTrips">여행 일정 만들기</Link>
    </div>
  );
}

export default MyTrips;