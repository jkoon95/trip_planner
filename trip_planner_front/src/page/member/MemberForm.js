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
{
  /*
const Post = (props) => {
  const onCompletePost = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onComplete({ zonecode: data.zonecode, address: fullAddress });
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </>
  );
};
*/
}
export { JoinInputWrap };
