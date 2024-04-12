import { useEffect, useState } from "react";
import "./innDetailView.css";
import axios from "axios";

const InnDetailView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.inLogin;
  const [partnerNo] = useState(61);
  const [innNo] = useState(41);
  const [roomNo] = useState({});
  const [inn, setInn] = useState("");
  const [room, setRoom] = useState([]);
  const [innFile, setInnFile] = useState([]);

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
        console.log(res.data.data);
        setInnFile(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <section className="contents detail-view">
      <div className="inn-detail-wrap">
        <div className="inn-detail-img">
          {/* 숙소 파일경로 */}
          {innFile.map((innFile, index) => {
            return <InnFileItem key={"innFile" + index} innFile={innFile} />;
          })}
          ;
        </div>
        <div className="inn-detail-top">
          <div>제주 롯데호텔</div>
          {/* 업체 상호명 */}
          <div>{inn.innAddr}</div> {/* 숙소 유형 */}
        </div>
        <div className="hashTag-box">
          #감성숙소 #핫플레이스 #제주최고 #연인 #가족 #신혼여행
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
            return <RoomItem key={"room" + index} room={room} inn={inn} />;
          })}
        </div>
        {/* 숙소 정보 */}
        <div className="inn-detail-info">
          <h3>숙소 정보</h3>
          <span dangerouslySetInnerHTML={{ __html: inn.innInfo }}></span>
        </div>
      </div>
    </section>
  );
};
const RoomItem = (props) => {
  const room = props.room;
  const inn = props.inn;
  return (
    <div className="inn-detail-rooms">
      <div>{room.roomName}</div>
      <div>입실 : {inn.innCheckInTime}</div>
      <div>퇴실 : {inn.innCheckOutTime}</div>
      <div>{room.roomPrice}</div>
      <div>객실 최대인원 : {room.roomMaxPeople}</div>
      <button type="button" className="btn_primary">
        객실 예약
      </button>
    </div>
  );
};

const InnFileItem = (props) => {
  const innFile = props.innFile;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return <img src={backServer + "/inn/innFile/" + innFile.innFilePath} />;
};

export default InnDetailView;
