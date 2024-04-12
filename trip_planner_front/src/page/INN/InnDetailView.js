import { useEffect, useState } from "react";
import "./innDetailView.css";
import axios from "axios";

const InnDetailView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.inLogin;
  const [partner, setPartner] = useState("");
  const [innNo, setInnNo] = useState(22);
  const [room, setRoom] = useState({});

  useEffect = () => {
    axios
      .get(backServer + "/inn/detail/" + innNo)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  {
    /*
  useEffect = () => {
    axios
      .get(backServer + "/inn/roomInfo/" + inn.innNo)
      .then((res) => {
        setRoom(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };
*/
  }
  console.log(innNo);

  return (
    <section className="contents detail-view">
      <h2>숙소상세</h2>
      <div className="inn-detail-wrap">
        <div className="inn-detail-img">
          <img src="/images/innDetailView.jpg"></img> {/* 숙소 파일경로 */}
        </div>
        <div className="inn-detail-top">
          <div>신라호텔</div>
          {/* 업체 상호명 */}
          <div>호텔</div> {/* 숙소 유형 */}
        </div>
        <div className="hashTag-box">#감성숙소 #핫플레이스</div>
        <div className="inn-detail-rooms">
          <h2>객실 정보</h2>
          {/* 룸 TBL*/}
          <div className="inn-detail-room">방 예약할수 있는 BOX</div>
          <div className="inn-detail-room">방 예약할수 있는 BOX</div>
          <div className="inn-detail-room">방 예약할수 있는 BOX</div>
        </div>
        <div className="inn-detail-intro">
          {/* 숙소 소개 */}
          <h2>숙소 소개</h2>
          세계 자연문화유산인 제주의 아름다운 풍광을 담은 리조트로써 그 명성을
          쌓아가고 있는 제주신라호텔은 1980년 개관부터 지금까지 품격과 문화가
          있는 휴식지로서 수많은 굵직한 국제행사를 성공적으로 치러온 최고의
          리조트입니다 이국적인 분위기와 최고의 시설을 선보이며 고객에게 먼저
          다가가는 리조트에 특화된 서비스로 호텔에 다녀간 세계의 국가수반을 비롯
          많은 VIP들에게 크나큰 찬사를 받아 왔습니다
        </div>
        <div className="inn-detail-info">
          <h2>숙소 정보</h2>
          기본정보 체크인: 14:00 | 체크아웃: 11:00 무료 Wi-Fi 전 객실 금연 주차
          가능(객실당 1대 무료) 자원재활용법을 준수하여 일회용품인 칫솔, 치약,
          면도기는 무료 제공하지 않습니다 환경보호를 위해 개별 지참을
          부탁드립니다 (필요시 객실 내 비치된 유료 어메니티 키트를 이용해 주시기
          바랍니다)
        </div>
        {/* 숙소 정보 */}
        {/* 
      <div>
        {inn.map((info, index) => {
          return <InnInfo key={"inn" + index} info={info} />;
        })}
      </div>
      */}
      </div>
    </section>
  );
};

{
  /* 
const InnInfo = (props) => {
  const info = props.inn;
  return <div>아직</div>;
};
*/
}

export default InnDetailView;
