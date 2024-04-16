import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyLikes = (props) => {
  const memberNo = props.member.memberNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [likeInnsList, setLikeInnsList] = useState([]);
  const [likeTourList, setLikeTourList] = useState([]);
  const [tabs, setTabs] = useState([
    { tabName: "숙소", active: true },
    { tabName: "투어", active: false },
  ]);
  const tabClickFunc = (index) => {
    tabs.forEach((item) => {
      item.active = false;
    });
    tabs[index].active = true;
    setTabs([...tabs]);
  };

  // 투어 찜 목록 불러오기
  useEffect(() => {
    axios
      .get(backServer + "/mypage/likeTourList/" + memberNo)
      .then((res) => {
        // console.log(res.data.data.likeTourList);
        if (res.data.message === "success") {
          setLikeTourList(res.data.data.likeTourList);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="myBooks_wrap">
      <h3 className="hidden">찜 리스트</h3>
      <div className="myBooks_tab">
        <div className="tab_btns">
          {tabs.map((tab, index) => {
            return (
              <button
                key={"tab" + index}
                type="button"
                className={tab.active === true ? "tab_btn active" : "tab_btn"}
                onClick={() => {
                  tabClickFunc(index);
                }}
              >
                {tab.tabName}
              </button>
            );
          })}
        </div>
        <div className="tab_contents">
          {tabs.map((tab, index) => (
            <div
              key={"tab" + index}
              className={tab.active ? "tab_content active" : "tab_content"}
            >
              {tab.active && tab.tabName === "숙소" && (
                <>
                  <h4 className="hidden">숙소 찜 내역</h4>
                  <ul className="myBook_list"></ul>
                </>
              )}
              {tab.active && tab.tabName === "투어" && (
                <LikeTourListItem
                  likeTourList={likeTourList}
                  setLikeTourList={setLikeTourList}
                  backServer={backServer}
                  memberNo={memberNo}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 투어 찜 리스트 아이템
const LikeTourListItem = (props) => {
  const backServer = props.backServer;
  const likeTourList = props.likeTourList;
  const setLikeTourList = props.setLikeTourList;
  const memberNo = props.memberNo;
  const navigate = useNavigate();

  const getTourAddr = (tourAddr) => {
    return tourAddr.slice(0, 2);
  };
  const getTourTypeText = (tourType) => {
    switch (tourType) {
      case 1:
        return "전시회";
      case 2:
        return "액티비티";
      case 3:
        return "테마파크";
      case 4:
        return "박람회";
      case 5:
        return "티켓·입장권";
      default:
        return "기타";
    }
  };
  const handleReservation = (tourNo) => {
    navigate("/tour/view/" + tourNo);
  };

  return (
    <>
      <div className="tour-like-top">
        {likeTourList.map((tour, index) => {
          const handleCancelLike = () => {
            axios
              .delete(
                backServer +
                  "/mypage/cancelLikeTour/" +
                  memberNo +
                  "/" +
                  tour.tourNo
              )
              .then((res) => {
                if (res.data.message === "success") {
                  const newArray = likeTourList.filter((item) => {
                    return item !== tour;
                  });
                  setLikeTourList(newArray);
                }
              })
              .catch((res) => {
                console.log(res);
              });
          };

          return (
            <>
              <div key={index} className="tour-like-wrap">
                <div className="tour-like-left">
                  <div className="tour-like-name">{tour.tourName}</div>
                  <div className="tour-like-type">
                    {getTourAddr(tour.tourAddr)}{" "}
                    {getTourTypeText(tour.tourType)}
                  </div>
                  <div className="tour-like-img">
                    <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
                  </div>
                </div>
                <div className="tour-like-right">
                  <div className="tour-like-btn">
                    <button
                      type="button"
                      className="btn_primary sm"
                      onClick={() => handleReservation(tour.tourNo)}
                    >
                      예약하기
                    </button>
                    <button
                      type="button"
                      className="btn_primary outline sm"
                      onClick={() => handleCancelLike(tour.tourNo)}
                    >
                      찜 취소
                    </button>
                  </div>
                  <div className="tour-like-title">
                    가격(성인 기준)
                    <div className="tour-like-price">
                      {tour.ticketAdult === 0
                        ? "무료"
                        : tour.ticketAdult.toLocaleString()}
                      {tour.ticketAdult !== 0 && "원"}
                    </div>
                  </div>

                  <div className="tour-like-title">
                    주소
                    <div className="tour-like-addr">{tour.tourAddr}</div>
                  </div>
                  <div className="tour-like-title">
                    판매종료 날짜
                    <div className="tour-like-date">
                      {new Date(tour.salesPeriod).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyLikes;
