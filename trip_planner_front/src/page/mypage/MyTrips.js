import "./myTrips.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../component/FormFrm";

const MyTrips = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [tripList, setTripList] = useState([]);
  const [btnMoreShow, setBtnMoreShow] = useState(true);
  const [tabs, setTabs] = useState([
    { tabName: "다가오는 여행", active: true },
    { tabName: "지난 여행", active: false },
    { tabName: "내 여행기", active: false },
  ]);

  useEffect(() => {
    axios
      .get(backServer + "/trip/list/" + reqPage)
      .then((res) => {
        setTripList([...res.data.data]);
        if(res.data.data.length < 5){
          setBtnMoreShow(false);
        }
        console.log(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      })
  }, [reqPage]);
  
  return(
    <div className="myTrips_wrap">
      {
        tabs.map((tab, index) => {
          return(
            <div key={"tab" + index} className="tab_btns">
              <button type="button" className={tab.active === true ? "btn_tab active" : "btn_tab"}>{tab.tabName}</button>
            </div>
          );
        })
      }



      <Link to="/mypage/myTrips/createTrips">여행 일정 만들기</Link>

      {/* {tripList.map((item) => {
        console.log(item);
      })} */}
      {
        btnMoreShow ? (
          <Button class="btn_primary outline" text="더보기" clickEvent={() => {setReqPage(reqPage+1)}} />
        ) : ""
      }
    </div>
  );
}

export default MyTrips;