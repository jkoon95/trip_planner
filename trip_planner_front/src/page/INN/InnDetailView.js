import React, { useEffect, useState } from "react";
import "./innDetailView.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Input, Textarea } from "../../component/FormFrm";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";
import { useLocation, useNavigate, useParams } from "react-router-dom";

{
  /* params로 innNo 받기  */
}

const InnDetailView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.isLogin;
  const [partnerName, setPartnerName] = useState("");
  const [roomNo] = useState({});
  const [inn, setInn] = useState("");
  const [room, setRoom] = useState([]);
  const [innFile, setInnFile] = useState([]);
  const [innFileRoom, setInnFileRoom] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewStar, setReviewStar] = React.useState(5);
  const params = useParams();
  const innNo = params.innNo;
  const location = useLocation();
  const checkInOutDates = location.state;
  const bookGuest = location.state;
  //console.log(checkInOutDates);

  const [innReviewList, setInnReviewList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(backServer + "/inn/detail/" + innNo)
      .then((res) => {
        setInn(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    axios
      .get(backServer + "/inn/roomInfo/" + innNo)
      .then((res) => {
        setRoom(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    axios
      .get(backServer + "/inn/innFile/" + innNo)
      .then((res) => {
        setInnFile(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    axios
      .get(backServer + "/inn/innFileRoom/" + innNo)
      .then((res) => {
        setInnFileRoom(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    if (inn.partnerNo) {
      const partnerNo = inn.partnerNo;
      axios
        .get(backServer + "/inn/partnerName/" + partnerNo)
        .then((res) => {
          setPartnerName(res.data.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [inn.partnerNo, setPartnerName]);

  {
    /* 
  useEffect(() => {
    room.forEach((roomItem) => {
      const roomNo = roomItem.roomNo;
      axios
        .get(backServer + "/inn/optionList/" + innNo + "/" + roomNo)
        .then((res) => {
          console.log(res);
          setOption(res.data.data);
        })
        .catch((res) => {
          console.log(res);
        });
    });
  }, [room, innNo]);
*/
  }

  const insertReview = () => {
    const form = new FormData();
    form.append("reviewStar", reviewStar);
    form.append("reviewTitle", reviewTitle);
    form.append("reviewContent", reviewContent);
    form.append("innNo", innNo);
    axios
      .post(backServer + "/inn/innReview", form)
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire("등록되었습니다 :)");
          axios(backServer + "/inn/innReviewList/" + innNo)
            .then((res) => {
              console.log(res.data.data);
              setInnReviewList(res.data.data.data.innReviewList);
            })
            .catch((res) => {
              console.log(res);
            });
        } else {
          Swal.fire("등록 중 문제 발생, 잠시후 다시 등록바랍니다. ");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <section className="contents detail-view">
      <div className="inn-detail-wrap">
        <div className="inn-detail-img">
          <Swiper
            className="inn_slide"
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            speed={600}
            spaceBetween={20}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
          >
            {innFile.map((innFile, index) => (
              <SwiperSlide key={"innFile" + index}>
                <img
                  src={backServer + "/inn/innFileList/" + innFile.innFilePath}
                  alt={"InnFile " + index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 숙소 파일경로 
          {innFile.map((innFile, index) => {
            return <InnFileItem key={"innFile" + index} innFile={innFile} />;
          })}
        </div>
        <div>
        */}
        <div>
          {inn.innType === 1 && <span>호텔</span>}
          {inn.innType === 2 && <span>리조트</span>}
          {inn.innType === 3 && <span>펜션</span>}
          {inn.innType === 4 && <span>게스트하우스</span>}
        </div>
        <div className="inn-detail-top">
          <div>{partnerName}</div>
          {/* 업체 상호명 */}
          <div>{inn.innAddr}</div> {/* 숙소 유형 */}
        </div>
        <div className="inn-detail-intro">
          {/* 숙소 소개 */}
          <h2>숙소 소개</h2>
          <div>
            <sup>“</sup>
          </div>
          <div className="intro">{inn.innIntro}</div>
          <div className="second-sup">
            <sup>”</sup>
          </div>
        </div>
        <div className="rooms">
          <h2>객실 선택</h2>
          {/* 룸 TBL*/}
          {room.map((room, index) => {
            return (
              <RoomItem
                key={"room" + index}
                room={room}
                inn={inn}
                innFileRoom={innFileRoom}
                navigate={navigate}
                checkInOutDates={checkInOutDates}
                bookGuest={bookGuest}
                isLogin={isLogin}
              />
            );
          })}
        </div>
        {/* 숙소 정보 */}
        <div className="inn-detail-info">
          <h3>숙소 정보</h3>
          <span dangerouslySetInnerHTML={{ __html: inn.innInfo }}></span>
        </div>
      </div>
      <div className="review-contents">
        <h3>리뷰</h3>
        <>
          {isLogin ? (
            <div className="review-box">
              <div className="review-top">
                <div className="inn_review-star">
                  <Rating
                    name="size-large"
                    size="large"
                    defaultValue={5}
                    value={reviewStar}
                    onChange={(event, newValue) => {
                      setReviewStar(newValue);
                    }}
                  />
                </div>
                <Input
                  type="text"
                  data={reviewTitle}
                  setData={setReviewTitle}
                  placeholder="리뷰의 제목을 정해주세요"
                  content="review-title"
                />
              </div>
              <div className="review-contents">
                <Textarea
                  data={reviewContent}
                  setData={setReviewContent}
                  placeholder="평점을 입력하고 숙소에 대한 리뷰를 남겨주세요 :)"
                />
                <div className="btn_area">
                  <button
                    type="button"
                    className="btn_secondary md"
                    onClick={insertReview}
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      </div>
    </section>
  );
};
const RoomItem = (props) => {
  const room = props.room;
  const inn = props.inn;
  const innFileRoom = props.innFileRoom;
  const innNo = props.inn.innNo;
  const [option, setOption] = useState([]);
  const [hashTag, setHashTag] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = props.navigate;
  const checkInOutDates = props.checkInOutDates;
  const bookGuest = props.bookGuest;
  const isLogin = props.isLogin;

  useEffect(() => {
    const roomNo = room.roomNo;
    axios
      .get(backServer + "/inn/hashTag/" + roomNo)
      .then((res) => {
        setHashTag(res.data.data);
        setHashTag(res.data.data.map((tagData) => tagData.hashTag));
      })
      .catch((res) => {
        console.log(res);
      });
  }, [backServer, room.roomNo, setHashTag]);

  useEffect(() => {
    const innNo = inn.innNo;
    const roomNo = room.roomNo;

    axios
      .get(backServer + "/inn/optionList/" + innNo + "/" + roomNo)
      .then((res) => {
        setOption(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [backServer, innNo, room.roomNo, setOption]);

  const reserveInn = () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        text: "로그인 후 이용이 가능합니다.",
        confirmButtonText: "닫기",
      }).then(navigate("/login"));
    }
    console.log(room);
    room.checkInDate = checkInOutDates.checkInDate;
    room.checkOutDate = checkInOutDates.checkOutDate;
    room.bookGuest = bookGuest.bookGuest;
    navigate("/inn/reservationInn", { state: room });
  };
  return (
    <div className="inn-detail-rooms">
      <div className="inn-detail-conts">
        <div className="room-box-left">
          {
            <Swiper
              className="inn_room_slide"
              navigation={true}
              pagination={true}
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              loop={true}
              speed={600}
              spaceBetween={20}
              // autoplay={{ delay: 1500, disableOnInteraction: false }}
            >
              {innFileRoom.map((innFileRoom, index) => {
                if (innFileRoom.roomNo === room.roomNo) {
                  return (
                    <SwiperSlide key={"innFileRoom" + index}>
                      <img
                        src={
                          backServer +
                          "/inn/innFileRoomList/" +
                          innFileRoom.innFilePath
                        }
                      />
                    </SwiperSlide>
                  );
                }
                return null;
              })}
            </Swiper>
          }
        </div>
        <div className="room-box-right">
          <div className="room-name">{room.roomName}</div>
          <div className="hashTagItem">
            {hashTag.map((hashTag, index) => (
              <HashTagItem key={"hashTag" + index} hashTag={hashTag} />
            ))}
          </div>
          <div className="room-right-detail">
            <div className="room-check">
              <span className="material-icons time">schedule</span>
              <div>입실 : {inn.innCheckInTime}</div>
              <div>퇴실 : {inn.innCheckOutTime}</div>
            </div>
            <div>객실 최대인원 : {room.roomMaxPeople}</div>
          </div>

          <div className="room-bottom">
            <div className="room-price">
              <div>결제금액 : </div>
              <div className="payment">
                {Number(room.roomPrice).toLocaleString()} 원
                <div>(1박 기준) </div>
              </div>
            </div>
            <button type="button" className="btn_primary" onClick={reserveInn}>
              {/* rommNo를 예약페이지로 보내주기*/}
              객실 예약
            </button>
          </div>
        </div>
      </div>
      <div className="option-title">서비스 및 부대시설</div>
      <div className="inn-detail-btm">
        {option.map((option, index) => (
          <OptionItem key={"option" + index} option={option} />
        ))}
      </div>
    </div>
  );
};
{
  /*
const InnFileItem = (props) => {
  const innFile = props.innFile;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return (
    <div>
      <img src={backServer + "/inn/innFileList/" + innFile.innFilePath} />
    </div>
  );
};
*/
}
// const InnFileRoomItem = (props) => {
//   const innFileRoom = props.innFileRoom;
//   const backServer = process.env.REACT_APP_BACK_SERVER;
//   return (
//     <img src={backServer + "/inn/innFileRoomList/" + innFileRoom.innFilePath} />
//   );
// };

const HashTagItem = (props) => {
  const hashTag = props.hashTag;
  return <span>{hashTag}</span>;
};
const OptionItem = (props) => {
  const option = props.option;
  const getIcon = (optionNo) => {
    switch (optionNo) {
      case 1:
        return "hot_tub"; // 사우나
      case 2:
        return "pool"; // 수영장
      case 3:
        return "restaurant"; // 레스토랑
      case 4:
        return "storefront"; // 매점
      case 5:
        return "local_convenience_store"; // 편의점
      case 6:
        return "fitness_center"; // 피트니스
      case 7:
        return "local_parking"; // 무료주차
      case 8:
        return "brunch_dining"; // 조식포함
      case 9:
        return "dining"; // 객실내취사
      case 10:
        return "wifi"; // 와이파이
      case 11:
        return "bathtub"; // 욕실용품
      case 12:
        return "directions_car"; // 픽업가능
      case 13:
        return "weekend"; // 라운지
      case 14:
        return "how_to_reg"; // 얼리체크인
      case 15:
        return "air"; // 에어컨
      default:
        return ""; // 기본값은 빈 문자열
    }
  };

  return (
    <div className="option-icon">
      {/* 아이콘과 함께 옵션 이름 표시 */}
      <span className="material-icons">{getIcon(option.optionNo)}</span>
      <span>{option.optionName}</span>
    </div>
  );
};

export default InnDetailView;
