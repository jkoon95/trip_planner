import { Link } from "react-router-dom";

const RoomRegFrm = (props) => {
  const roomName = props.roomName;
  const setRoomName = props.setRoomName;
  const roomMaxPeople = props.roomMaxPeople;
  const setRoomMaxPeople = props.setRoomMaxPeople;
  const roomPrice = props.roomPrice;
  const setRoomPrice = props.setRoomPrice;
  const etcOption = props.etcOption;
  const setEtcOption = props.setEtcOption;
  return (
    <div className="room-reg-wrap">
      <div className="room-reg-top">
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="toMain">방등록</div>
      </div>
    </div>
  );
};

export default RoomRegFrm;
