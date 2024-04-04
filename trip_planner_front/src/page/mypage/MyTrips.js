import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../component/FormFrm";

const MyTrips = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    axios
      .get(backServer + "/trip/list/" + reqPage)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      })
  }, [reqPage]);
  
  return(
    <div className="myTrips_wrap">
      내 여행(탭페이지)
      <Link to="/mypage/myTrips/createTrips">여행 일정 만들기</Link>
      <Button class="btn_primary outline" text="더보기" clickEvent={() => {setReqPage(reqPage+1)}} />
    </div>
  );
}

export default MyTrips;