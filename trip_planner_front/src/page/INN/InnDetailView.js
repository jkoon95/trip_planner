import { useEffect, useState } from "react";
import "./innDetailView.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const InnDetailView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.inLogin;
  const [partnerName, setPartnerName] = useState("");
  const [innNo] = useState(41);
  {
    /* params로 innNo 받기  */
  }
  const [roomNo] = useState({});
  const [inn, setInn] = useState("");
  const [room, setRoom] = useState([]);
  const [innFile, setInnFile] = useState([]);
  const [innFileRoom, setInnFileRoom] = useState([]);

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
        console.log(res.data.data);
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
      </div>
    </section>
  );
};
const RoomItem = (props) => {
  const room = props.room;
  const inn = props.inn;
  const innFileRoom = props.innFileRoom;
  const [hashTag, setHashTag] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
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
  return (
    <div className="inn-detail-rooms">
      <div className="room-box-left">
        {innFileRoom.map((innFileRoom, index) => {
          if (innFileRoom.roomNo === room.roomNo) {
            return (
              <InnFileRoomItem
                key={"innFileRoom" + index}
                innFileRoom={innFileRoom}
              />
            );
          }
          return null;
        })}
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
            <div>입실 : {inn.innCheckInTime}</div>
            <div>퇴실 : {inn.innCheckOutTime}</div>
          </div>
          <div>객실 최대인원 : {room.roomMaxPeople}</div>
        </div>

        <div className="room-bottom">
          <div className="room-price">
            <div>결제금액 : </div>
            {room.roomPrice} 원
          </div>
          <button type="button" className="btn_primary">
            {/* rommNo를 예약페이지로 보내주기*/}
            객실 예약
          </button>
        </div>
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
const InnFileRoomItem = (props) => {
  const innFileRoom = props.innFileRoom;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return (
    <img src={backServer + "/inn/innFileRoomList/" + innFileRoom.innFilePath} />
  );
};
const HashTagItem = (props) => {
  const hashTag = props.hashTag;
  return <span>{hashTag}</span>;
};

export default InnDetailView;
