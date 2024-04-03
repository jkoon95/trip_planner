import { Link } from "react-router-dom";
import "./roomReg.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button } from "../../component/FormFrm";
import { useState } from "react";

const RoomRegFrm = (props) => {
  const roomName = props.roomName;
  const setRoomName = props.setRoomName;
  const roomMaxPeople = props.roomMaxPeople;
  const setRoomMaxPeople = props.setRoomMaxPeople;
  const roomPrice = props.roomPrice;
  const setRoomPrice = props.setRoomPrice;
  const etcOption = props.etcOption;
  const setEtcOption = props.setEtcOption;
  const roomFile = props.roomFile;
  const setRoomFile = props.setRoomFile;
  const hashTagOption = props.hashTagOption;
  const setHashTagOption = props.setHashTagOption;
  const optionList = props.option;
  const newOptionValue = props.newOptionValue;
  const setNewOptionValue = props.setNewOptionValue;
  const roomMinPeople = props.roomMinPeople;
  const setRoomMinPeople = props.setRoomMinPeople;

  console.log(optionList);
  const roomImg = props.roomImg;
  const setRoomImg = props.setRoomImg;

  const buttonFunction = props.buttonFunction;

  const [newHashtag, setNewHashTag] = useState("");
  const hashTagInput = () => {
    if (newHashtag !== "") {
      const newValue = [...hashTagOption, newHashtag];
      setHashTagOption(newValue);
      setNewHashTag("");
      console.log(newValue);
    }
  };
  const cancelTag = (index) => {
    const cancelHashTag = [...hashTagOption];
    cancelHashTag.splice(index, 1);
    setHashTagOption(cancelHashTag);
    console.log(cancelHashTag);
  };

  return (
    <div className="room-reg-wrap">
      <div className="room-reg-top">
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="toMain">객실 등록</div>
      </div>
      <div className="room-reg-content">
        <div className="room-name-zone">
          <div className="room-name-title">객실 이름</div>
          <RoomInput
            type="text"
            data={roomName}
            setData={setRoomName}
            content="roomName"
          />
        </div>
        <div className="room-reg-img-wrap">
          <div className="room-reg-image-wrap-title">
            객실 사진등록<sub>(최대 6장 등록 가능)</sub>
          </div>
          <div className="room-reg-image">
            {roomImg.map((item, index) => {
              return (
                <RoomImgReg
                  key={"img-box" + index}
                  roomImg={roomImg}
                  setRoomImg={setRoomImg}
                  roomFile={roomFile}
                  setRoomFile={setRoomFile}
                  item={item}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="room-reg-min-people-wrap">
          <div className="room-reg-min-people-wrap-title">기준 인원수</div>
          <div>
            <SelectMinPeople data={roomMinPeople} setData={setRoomMinPeople} />
          </div>
        </div>
        <div className="room-reg-max-people-wrap">
          <div className="room-reg-max-people-wrap-title">객실 최대 인원수</div>
          <div>
            <SelectMaxPeople data={roomMaxPeople} setData={setRoomMaxPeople} />
          </div>
        </div>
        <div className="room-reg-price-wrap">
          <div className="room-reg-price-title">
            객실 가격 <sub>(* 1박 기준)</sub>
          </div>
          <div>
            <RoomInput
              type="text"
              data={roomPrice}
              setData={setRoomPrice}
              content="roomPrice"
              placeholder="EX. 300,000 형식으로 작성해주세요"
            />
            <span>만원</span>
          </div>
        </div>
        <div className="room-reg-hashtag-wrap">
          <div className="room-reg-hashtag-title">
            객실 해시테그
            <sub> (* 해당 객실에 대한 해시태그를 작성해주세요)</sub>
          </div>
          <div>
            <div className="room-reg-hashtag-input">
              <input
                className="input"
                type="text"
                value={newHashtag}
                onChange={(e) => setNewHashTag(e.target.value)}
                placeholder="EX. #뷰 맛집, #야경맛집"
              />
            </div>
            <div className="room-reg-hashtag-input-btn">
              <Button
                text="입력"
                class="btn_primary md"
                clickEvent={hashTagInput}
              />
            </div>
          </div>
          <div className="room-reg-hashtag-zone">
            {hashTagOption.map((item, index) => {
              return (
                <div key={"hashTag" + index} className="hashtag-box-wrap">
                  <div className="hashtag-box">
                    <span className="hashTagValue">{item}</span>
                    <button
                      type="button"
                      className="btn_clear"
                      onClick={() => cancelTag(index)}
                    >
                      <span className="material-icons">clear</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="room-reg-option-wrap">
          <div className="room-reg-option-title">
            객실 기본옵션 <sub>(* 기본 옵션을 선택해주세요)</sub>
          </div>
          <div className="option-box">
            <div className="room-reg-option-content">
              <SelectOption
                newOptionValue={newOptionValue}
                setNewOptionValue={setNewOptionValue}
                optionList={optionList}
              />
            </div>
          </div>
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

const RoomInput = (props) => {
  const type = props.type;
  const data = props.data;
  const setData = props.setData;
  const content = props.content;
  const placeholder = props.placeholder;
  const chageData = (e) => {
    setData(e.target.value);
  };
  return (
    <input
      className="input"
      type={type}
      id={content}
      onChange={chageData}
      placeholder={placeholder}
    />
  );
};

const RoomImgReg = (props) => {
  const roomImg = props.roomImg;
  const setRoomImg = props.setRoomImg;
  const roomFile = props.roomFile;
  const setRoomFile = props.setRoomFile;
  const item = props.item;
  const index = props.index;

  const changeImg = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      roomFile[index] = files[0];
      setRoomFile([...roomFile]);

      const reader = new FileReader(); //미리보기
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        roomImg[index] = reader.result;
        setRoomImg([...roomImg]);
      };
    } else {
      roomImg[index] = null;
      setRoomImg([...roomImg]);
      roomFile[index] = null;
      setRoomFile([...roomFile]);
    }
  };

  const cancelImg = (e) => {
    const cancel = e.currentTarget.index;
    roomImg.splice(index, 1);
    setRoomImg([...roomImg, null]);
    roomFile.splice(index, 1);
    setRoomFile([...roomFile], null);
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
            <label htmlFor={"roomImg" + index}>
              <span class="material-icons">photo_camera</span>
            </label>
            <input
              type="file"
              className="hidden"
              id={"roomImg" + index}
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
const SelectMinPeople = (props) => {
  const data = props.data;
  const setData = props.setData;
  const changeValue = (e) => {
    setData(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">인원</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label="인원"
          onChange={changeValue}
        >
          <MenuItem value={2}>2인</MenuItem>
          <MenuItem value={4}>4인</MenuItem>
          <MenuItem value={6}>6인</MenuItem>
          <MenuItem value={8}>8인</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
const SelectMaxPeople = (props) => {
  const data = props.data;
  const setData = props.setData;
  const changeValue = (e) => {
    setData(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">인원</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label="인원"
          onChange={changeValue}
        >
          <MenuItem value={2}>2인</MenuItem>
          <MenuItem value={4}>4인</MenuItem>
          <MenuItem value={6}>6인</MenuItem>
          <MenuItem value={8}>8인</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
const SelectOption = (props) => {
  const newOptionValue = props.newOptionValue;
  const setNewOptionValue = props.setNewOptionValue;
  const optionList = props.optionList;
  console.log(newOptionValue);
  return (
    <div className="options">
      {optionList.map((item, index) => {
        return (
          <div
            onClick={(e) => {
              e.currentTarget.classList.toggle("check-option");
              if (e.currentTarget.classList.contains("check-option")) {
                newOptionValue.push(item.optionNo);
                setNewOptionValue([...newOptionValue]);
              } else {
                const i = newOptionValue.indexOf(item.optionNo);
                newOptionValue.splice(i, 1);
                setNewOptionValue([...newOptionValue]);
              }
            }}
          >
            <span className="box" value={item.optionNo}>
              {item.optionName}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default RoomRegFrm;
