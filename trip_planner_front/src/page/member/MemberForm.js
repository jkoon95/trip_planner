import { Input } from "../../component/FormFrm";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";

const JoinInputWrap = (props) => {
  const {
    label,
    type,
    content,
    data,
    setData,
    placeholder,
    blurEvent,
    checkMsg,
  } = props;

  const chageData = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="input_wrap">
      <div>
        <div className="input_title">
          <label className="input2" htmlFor={content}>
            {label}
          </label>
        </div>
        <div className="input_item">
          <Input
            value={data}
            onChange={chageData}
            placeholder={placeholder}
            type={type}
            data={data}
            setData={setData}
            blurEvent={blurEvent}
          />
        </div>
        {checkMsg && <p className="msg error">{checkMsg}</p>}
      </div>
    </div>
  );
};

const AddressInput = (props) => {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState("false");
  const [detailedAddress, setDetailedAddress] = useState("");

  const themeObj = {
    bgColor: "#FFFFFF",
    pageBgColor: "#FFFFFF",
    postcodeTextColor: "#C05850",
    emphTextColor: "#222222",
  };

  const postCodeStyle = {
    width: "360px",
    height: "480px",
  };

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const inputChangeHandler = (event) => {
    setDetailedAddress(event.target.value);
  };

  return (
    <div>
      <div>
        <strong>주소찾기</strong>
      </div>
      <div>
        <div>
          <div>{zonecode}</div>
          <button type="button" onClick={toggleHandler}>
            주소 찾기
          </button>
        </div>
        {isOpen && (
          <div>
            <DaumPostcode
              theme={themeObj}
              style={postCodeStyle}
              onComplete={completeHandler}
              onClose={closeHandler}
            />
          </div>
        )}
        <div>{address}</div>
        <input
          type="hidden"
          value={detailedAddress}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};

export { JoinInputWrap, AddressInput };
