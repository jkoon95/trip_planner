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
                    tab.tabName === "다가오는 여행" ? (
                      <>
                        <Link to="/mypage/myTrips/createTrips" className="creatTrips_btn">
                          <i className="icon_plus"></i>
                          <div className="text">
                            <strong>여행 일정 만들기</strong>
                            <span>새로운 여행을 떠나보세요!</span>
                          </div>
                        </Link>

                        <h4>내가 만든 여행</h4>
                        <ul className="myTrips_list">
                          {tripList.map((item, i) => {
                            return(
                              <TripListItem key={"myTrips"+i} item={item} />
                            );
                          })}
                        </ul>
                        {
                          btnMoreShow ? (
                            <div className="btn_area">
                              <Button class="btn_primary outline" text="더보기" clickEvent={() => {setReqPage(reqPage+1)}} />
                            </div>
                          ) : ""
                        }
                      </>
                    ) : tab.tabName === "지난 여행" ? (
                      <div>지난 여행</div>
                    ) : (
                      <div>내 여행기</div>
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

const TripListItem = (props) => {
  const item = props.item;
  const [openMenu, setOpenMenu] = useState(false);
  const menuOpenFunc = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  }
  return(
    <li>
      <Link to={"/mypage/myTrips/modifyTrips/"+item.tripNo}>
        <div className="trip_info">
          <div className="trip_title">{item.tripTitle}</div>
          <div className="trip_date">{item.tripStartDate.replaceAll("-",".")} - {item.tripEndDate.replaceAll("-",".")}</div>
          <div className="btm_info">
            <span className="trip_place_count">1개 장소</span>
            <span className="book_inn">예약한 숙소: 1</span>
            <span className="book_tour">예약한 투어: 1</span>
          </div>
        </div>
      </Link>
      <div className="btn_wrap">
        {/* <button type="button" className="btn_share"><span className="hidden">공유하기</span></button> */}
        <div className="small_menu_wrap">
          <button className="btn_menu" onClick={menuOpenFunc}><span className="hidden">메뉴</span></button>
          {
            openMenu ? (
              <ul className="menu_list">
                {/* <li><Link to={"/mypage/myTrips/modifyTrips/"+item.tripNo}>수정하기</Link></li> */}
                <li><button type="button">공유하기</button></li>
                <li><button type="button">삭제</button></li>
              </ul>
            ) : ""
          }
        </div>
      </div>
    </li>
  )
}

export default MyTrips;