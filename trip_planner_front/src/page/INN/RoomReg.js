import { useState } from "react";
import RoomRegFrm from "./RoomRegFrm";

const RoomReg = (props) => {
  const isLogin = props.isLogin;
  const [roomName, setRoomName] = useState("");
  const [roomMaxPeople, setRoomMaxPeople] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [etcOption, setEtcOption] = useState("");
  return (
    <div className="room-reg-all-wrap">
      <div className="inn-reg-title hidden">
        <h2>방 등록 페이지</h2>
      </div>
      <RoomRegFrm
        roomName={roomName}
        setRoomName={setRoomName}
        roomMaxPeople={roomMaxPeople}
        setRoomMaxPeople={setRoomMaxPeople}
        roomPrice={roomPrice}
        setRoomPrice={setRoomPrice}
        etcOption={etcOption}
        setEtcOption={setEtcOption}
      />
    </div>
  );
};

export default RoomReg;
