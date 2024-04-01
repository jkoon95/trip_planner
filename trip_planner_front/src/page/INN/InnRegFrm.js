import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Input } from "../../component/FormFrm";
import TextEditor from "../../component/TextEditor";

const InnRegFrm = (props) => {
  
  const innType = props.innType;
  const setInnType = props.setInnType;
  const innAddr = props.innAddr;
  const setInnAddr = props.setInnAddr;
  const innInfo = props.innInfo;
  const setInnInfo = props.setInnInfo;
  const innCheckInTime = props.innCheckInTime;
  const setInnCheckInTime = props.setInnCheckInTime;
  const innCheckOutTime = props.innCheckOutTime;
  const setInnCheckOutTime = props.setInnCheckOutTime;
  const innIntro = props.innIntro;
  const setInnIntro = props.setInnIntro;
  const innFile = props.innFile;
  const setInnFile = props.setInnFile;

  const innImg = props.innImg;
  const setInnImg = props.setInnImg;

  const buttonFunction = props.buttonFunction;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return (
    <div className="inn-reg-wrap">
      <div className="inn-reg-top">
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="toMain">숙소등록</div>
      </div>
      <div className="inn-reg-content">
        <div className="inn-type-box">
          <div className="inn-type-title">숙소유형</div>
          <div>
            <SelectInnType data={innType} setData={setInnType} />
          </div>
        </div>
        <div className="inn-reg-image-wrap">
          <div className="inn-reg-image-wrap-title">
            숙소 사진등록<sub>(최대 6장 등록 가능)</sub>
          </div>
          <div className="inn-reg-image">
            {innImg.map((item, index) => {
              return (
                <InnImgReg
                  key={"img-box" + index}
                  innImg={innImg}
                  setInnImg={setInnImg}
                  innFile={innFile}
                  setInnFile={setInnFile}
                  item={item}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="inn-addr-wrap">
          <div className="inn-addr-title">숙소주소</div>
          <InnInput
            type="text"
            content="innAddr"
            data={innAddr}
            setData={setInnAddr}
            placeholder="숙소 주소를 입력해주세요"
          />
        </div>
        <div className="inn-intro-wrap">
          <div className="inn-intro-title">숙소소개</div>
          <InnInput
            type="text"
            content="innAddr"
            data={innIntro}
            setData={setInnIntro}
            placeholder="우리 숙소에 대해 간단한 소개를 적어주세요"
          />
        </div>
        <div className="inn-info-wrap">
          <div className="inn-info-title">숙소정보</div>
          <TextEditor
            data={innInfo}
            setData={setInnInfo}
            url={backServer + "/inn/innReg"}
          ></TextEditor>
        </div>
        <div className="inn-check-time-wrap">
          <div className="check-in-title">체크인 시간</div>
          <InnInput
            type="text"
            content="innCheckInTime"
            data={innCheckInTime}
            setData={setInnCheckInTime}
            placeholder="ex. 14:00 / 15:00 형식으로 작성해주세요"
          />
          <div className="check-out-title">체크아웃 시간</div>
          <InnInput
            type="text"
            content="innCheckInTime"
            data={innCheckOutTime}
            setData={setInnCheckOutTime}
            placeholder="ex. 11:00 / 12:00 형식으로 작성해주세요"
          />
        </div>
        <div className="btn-area">
          <Button
            text="등록하기"
            class="btn_primary md"
            clickEvent={buttonFunction}
          />
        </div>
      </div>
    </div>
  );
};

const SelectInnType = (props) => {
  const data = props.data;
  const setData = props.setData;
  const changeInn = (e) => {
    setData(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">유형</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label="숙소"
          onChange={changeInn}
        >
          <MenuItem value={1}>호텔</MenuItem>
          <MenuItem value={2}>리조트</MenuItem>
          <MenuItem value={3}>펜션</MenuItem>
          <MenuItem value={4}>게스트하우스</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const InnImgReg = (props) => {
  const innImg = props.innImg;
  const setInnImg = props.setInnImg;
  const innFile = props.innFile;
  const setInnFile = props.setInnFile;
  const item = props.item;
  const index = props.index;

  const changeImg = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      innFile[index] = files[0];
      setInnFile([...innFile]);

      const reader = new FileReader(); //미리보기
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        innImg[index] = reader.result;
        setInnImg([...innImg]);
      };
    } else {
      innImg[index] = null;
      setInnImg([...innImg]);
      innFile[index] = null;
      setInnFile([...innFile]);
    }
  };

  const cancelImg = (e) => {
    const cancel = e.currentTarget.index;
    innImg.splice(index, 1);
    setInnImg([...innImg, null]);
    innFile.splice(index, 1);
    setInnFile([...innFile], null);
    // innImg[index] = null;
    // setInnImg([...innImg]);
    // innFile[index] = null;
    // setInnFile([...innFile]);
  };
  return (
    <>
      <div className="img-box">
        {item === null ? (
          <>
            <label htmlFor={"innImg" + index}>
              <span class="material-icons">photo_camera</span>
            </label>
            <input
              type="file"
              className="hidden"
              id={"innImg" + index}
              accept="image/*"
              onChange={changeImg}
            ></input>
          </>
        ) : (
          <>
            <img src={item} />
            <span className="material-icons cancel-btn" onClick={cancelImg}>
              clear
            </span>
          </>
        )}
      </div>
    </>
  );
};
const InnInput = (props) => {
  const type = props.type;
  const content = props.content;
  const data = props.data;
  const setData = props.setData;
  const placeholder = props.placeholder;
  const chageData = (e) => {
    setData(e.target.value);
  };
  return (
    <input
      className="input"
      type={type}
      id={content}
      placeholder={placeholder}
      onChange={chageData}
    />
  );
};

export default InnRegFrm;
