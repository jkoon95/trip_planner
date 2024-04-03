import { Link } from "react-router-dom";

const MyTrips = () => {
  return(
    <div className="myTrips_wrap">
      내 여행(탭페이지)
      <Link to="/mypage/createTrips">여행 일정 만들기</Link>
    </div>
  );
}

export default MyTrips;