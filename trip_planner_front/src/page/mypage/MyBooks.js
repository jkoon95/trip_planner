import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../component/FormFrm";

const MyBooks = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [tripList, setTripList] = useState([]);
  const [btnMoreShow, setBtnMoreShow] = useState(true);
  const [tabs, setTabs] = useState([
    { tabName: "숙소", active: true },
    { tabName: "투어", active: false },
    { tabName: "프로모션", active: false },
  ]);
  const tabClickFunc = (index) => {
    tabs.forEach((item) => {
      item.active = false;
    })
    tabs[index].active = true;
    setTabs([...tabs]);
  }

  useEffect(() => {
    axios
      .get(backServer + "/trip/list/" + reqPage)
      .then((res) => {
        tripList.push(...res.data.data);
        setTripList([...tripList]);
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
      <h3 className="hidden">내 여행</h3>
      <div className="myTrips_tab">
        <div className="tab_btns">
          {tabs.map((tab, index) => {
            return(
              <button key={"tab" + index} type="button" className={tab.active === true ? "tab_btn active" : "tab_btn"} onClick={() => {tabClickFunc(index)}}>{tab.tabName}</button>
            );
          })}
        </div>
        <div className="tab_contents">
          {tabs.map((tab, index) => {
            return(
              <div key={"tab" + index} className={tab.active === true ? "tab_content active" : "tab_content"}>
                {
                  tab.active === true ? (
                    tab.tabName === "숙소" ? (
                      <>
                        <h4>숙소 예약 내역</h4>
                        
                        
                      </>
                    ) : tab.tabName === "투어" ? (
                      <h4>투어 예약 내역</h4>
                    ) : (
                      <h4>프로모션</h4>
                    )
                  ) : ""
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyBooks;