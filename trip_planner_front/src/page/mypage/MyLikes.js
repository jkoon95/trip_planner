import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./innLike.css";
import { Button } from "../../component/FormFrm";

const MyLikes = (props) => {
  const memberNo = props.member.memberNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [likeInnList, setLikeInnList] = useState([]);
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

  // 숙소 찜 목록 불러오기
  useEffect(() => {
    axios
      .get(backServer + "/mypage/likeInnList/" + memberNo)
      .then((res) => {
        if (res.data.message === "success") {
          setLikeInnList(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div className="myBooks_wrap">
      <h3 className="hidden">내 찜 목록</h3>
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
                <LikeInnListItem
                  likeInnList={likeInnList}
                  setLikeInnList={setLikeInnList}
                  backServer={backServer}
                  memberNo={memberNo}
                />
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

//숙소 찜 리스트
const LikeInnListItem = (props) => {
  const backServer = props.backServer;
  const likeInnList = props.likeInnList;
  const setLikeInnList = props.setLikeInnList;
  const memberNo = props.memberNo;
  const naviGate = useNavigate();

  return (
    <div className="inn-like-zone">
      {likeInnList.map((inn, index) => {
        const cancelLikeInn = (innNo) => {
          axios
            .delete(
              backServer + "/mypage/cancelInnLike/" + memberNo + "/" + innNo
            )
            .then((res) => {
              if (res.data.message === "success") {
                const newArray = likeInnList.filter((item) => {
                  return item !== inn;
                });
                setLikeInnList(newArray);
              }
            })
            .catch((res) => {
              console.log(res);
            });
        };
        return (
          <React.Fragment key={"inn" + index}>
            <div className="inn-like-box" key={"inn" + index}>
              <div>
                <div className="inn-like-img">
                  <img src={backServer + "/inn/innList/" + inn.filePath} />
                </div>
                <div className="inn-like-info">
                  <div className="inn-name-box">
                    <span>숙소이름 : </span>
                    <span className="inn-name">{inn.partnerName}</span>
                  </div>
                  <div className="inn-add-box">
                    <span>주소 : </span>
                    <span className="inn-addr">{inn.innAddr}</span>
                  </div>
                  <div className="inn-checkintime-box">
                    <span>숙소 체크인 시간 : </span>
                    <span className="inn-checkInTime">
                      {inn.innCheckInTime}
                    </span>
                  </div>
                  <div className="inn-checkouttime-box">
                    <span>숙소 체크아웃 시간 : </span>
                    <span className="inn-checkOutTime">
                      {inn.innCheckOutTime}
                    </span>
                  </div>
                  <div className="inn-checkouttime-box">
                    <span>
                      숙소 가격<sub className="sub">(최저가기준)</sub> :{" "}
                    </span>
                    <span className="inn-checkOutTime">
                      {inn.minRoomPrice.toLocaleString()} 원
                    </span>
                  </div>
                </div>
              </div>
              <div className="inn-like-cancel-btn">
                <button
                  type="button"
                  className="badge red inn-view-btn"
                  onClick={() => cancelLikeInn(inn.innNo)}
                >
                  찜취소
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      })}
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
