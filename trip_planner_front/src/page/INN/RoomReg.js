import { useEffect, useState } from "react";
import RoomRegFrm from "./RoomRegFrm";
import axios from "axios";

const RoomReg = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.isLogin;
  const [roomName, setRoomName] = useState("");
  const [roomMaxPeople, setRoomMaxPeople] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [etcOption, setEtcOption] = useState("");
  const [hashTagOption, setHashTagOption] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [newOptionValue, setNewOptionValue] = useState([]);
  const [roomFile, setRoomFile] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [roomImg, setRoomImg] = useState([null, null, null, null, null, null]);
  useEffect(() => {
    axios
      .get(backServer + "/inn/roomOption")
      .then((res) => {
        setOptionList(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  console.log(optionList);
  const roomWrite = () => {
    console.log("방등록 시작");
    console.log(roomFile);
    console.log(roomName);
    console.log(roomMaxPeople);
    console.log(roomPrice);
    console.log(hashTagOption);
    console.log(newOptionValue);
  };
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
        roomFile={roomFile}
        setRoomFile={setRoomFile}
        roomImg={roomImg}
        setRoomImg={setRoomImg}
        hashTagOption={hashTagOption}
        setHashTagOption={setHashTagOption}
        buttonFunction={roomWrite}
        option={optionList}
        newOptionValue={newOptionValue}
        setNewOptionValue={setNewOptionValue}
      />
    </div>
  );
};

export default RoomReg;
