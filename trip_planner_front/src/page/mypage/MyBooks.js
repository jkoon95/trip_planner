import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import "./myBooks.css";

const MyBooks = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [bookInnsReqPage, setBookInnsReqPage] = useState(1);
  const [bookInnsList, setBookInnsList] = useState([]);
  const [bookInnsBtnMoreShow, setBookInnsBtnMoreShow] = useState(true);
  const [bookTourReqPage, setBookTourReqPage] = useState(1);
  const [bookTourList, setBookTourList] = useState([]);
  const [bookTourBtnMoreShow, setBookTourBtnMoreShow] = useState(true);
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

  // 숙소 예약 내역 불러오기
  useEffect(() => {
    axios
      .get(backServer + "/inn/bookInnsList/" + bookInnsReqPage)
      .then((res) => {
        console.log(res.data.data);
        if(res.data.message === "success"){
          bookInnsList.push(...res.data.data);
          setBookInnsList([...bookInnsList]);
          if(res.data.data.length < 5){
            setBookInnsBtnMoreShow(false);
          }
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }, [bookInnsReqPage]);

  // 투어 예약 내역 불러오기
  useEffect(() => {
    axios
      .get(backServer + "/tour/bookTourList/" + bookTourReqPage)
      .then((res) => {
        console.log(res.data.data);
        if(res.data.message === "success"){
          bookTourList.push(...res.data.data);
          setBookTourList([...bookTourList]);
          if(res.data.data.length < 5){
            setBookTourBtnMoreShow(false);
          }
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }, [bookTourReqPage]);
  
  return(
    <div className="myBooks_wrap">
      <h3 className="hidden">내 예약</h3>
      <div className="myBooks_tab">
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
                        <h4 className="hidden">숙소 예약 내역</h4>
                        <ul className="myBookInns_list">
                          {bookInnsList.map((item, i) => {
                            return(
                              <BookInnListItem key={"myBookInns"+i} item={item} backServer={backServer} />
                            );
                          })}
                        </ul>
                        {
                          bookInnsBtnMoreShow ? (
                            <div className="btn_area">
                              <Button class="btn_primary outline" text="더보기" clickEvent={() => {setBookInnsReqPage(bookInnsReqPage+1)}} />
                            </div>
                          ) : ""
                        }
                      </>
                    ) : tab.tabName === "투어" ? (
                      <>
                        <h4 className="hidden">투어 예약 내역</h4>
                        <ul className="myBookTour_list">
                          {bookTourList.map((item, i) => {
                            return(
                              <BookTourListItem key={"myBookTour"+i} item={item} backServer={backServer} />
                            );
                          })}
                        </ul>
                        {
                          bookTourBtnMoreShow ? (
                            <div className="btn_area">
                              <Button class="btn_primary outline" text="더보기" clickEvent={() => {setBookTourReqPage(bookTourReqPage+1)}} />
                            </div>
                          ) : ""
                        }
                      </>
                      
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

// 숙소 예약 리스트 아이템
const BookInnListItem = (props) => {
  const item = props.item;
  const backServer = props.backServer;

  return(
    <li className="bookItem">
      <Link to={"/mypage/"}>
        <div className="item_top_wrap">
          <div className="partnerName">{item.partnerName}</div>
          <div className="badges">
            {
              item.bookStatus === 1 ? (
                <span className="badge blue">예약확정</span>
              ) : (
                <span className="badge red">예약취소</span>
              )
            }
            {
              new Date(item.checkOutDate) > new Date() ? (
                <span className="badge gray">이용완료</span>
              ) : ""
            }
          </div>
        </div>
        <div className="item_contents_wrap">
          <div className="item_thumbs">
            <img src={backServer+"/inn/reservationInn/"+item.innFilepath} alt="숙소 썸네일"></img>
          </div>
          <div className="item_details">
            <div className="row">
              <div className="title">예약 객실</div>
              <div className="cont">{item.roomName}</div>
            </div>
            <div className="row">
              <div className="title">예약 일정</div>
              <div className="cont">{item.checkInDate} - {item.checkOutDate}({item.night}박)</div>
            </div>
            <div className="row">
              <div className="title">예약 인원</div>
              <div className="cont">{item.bookGuest} 명</div>
            </div>
            <div className="row">
              <div className="title">투숙객 정보</div>
              <div className="cont"><span>{item.guestName}</span><span>{item.guestPhone}</span></div>
            </div>
            <div className="row">
              <div className="title">예약 일시</div>
              <div className="cont">{item.bookDate}</div>
            </div>
            <div className="row">
              <div className="title">요청사항</div>
              <div className="cont">{item.guestWish}</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

// 투어 예약 리스트 아이템
const BookTourListItem = (props) => {
  const item = props.item;
  const backServer = props.backServer;

  return(
    <li className="bookItem">
      <Link to={"/mypage/"}>
        <div className="item_top_wrap">
          <div className="partnerName"><span className="badge orange">{item.tourTypeStr}</span> {item.tourName}</div>
          <div className="badges">
            <span className={item.bookStatusStr === "예약확정" ? "badge blue" : "badge red"}>{item.bookStatusStr}</span>
            {
              new Date(item.bookDate) > new Date() ? (
                <span className="badge gray">이용완료</span>
              ) : ""
            }
          </div>
        </div>
        <div className="item_contents_wrap">
          <div className="item_thumbs">
            {
              item.tourImg !== "null" ? (
                  <img src={backServer+"/tour/thumbnail/"+item.tourImg} alt="상품 썸네일"></img>
                ) : ""
              }
          </div>
          <div className="item_details">
            <div className="row">
              <div className="title">예약 번호</div>
              <div className="cont">{item.tourBookNo}</div>
            </div>
            <div className="row">
              <div className="title">예약 인원</div>
              <div className="cont">{item.bookGuest} 명</div>
            </div>
            <div className="row">
              <div className="title">가격</div>
              <div className="cont"><span>{item.bookFee}</span></div>
            </div>
            <div className="row">
              <div className="title">이용 날짜</div>
              <div className="cont">{item.bookDate}</div>
            </div>
            <div className="row">
              <div className="title">예약자</div>
              <div className="cont">{item.memberName}</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default MyBooks;