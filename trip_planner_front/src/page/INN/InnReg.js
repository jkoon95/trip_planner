import { useState } from "react";
import { Link } from "react-router-dom";
import "./innReg.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const InnReg = () => {
  const [inntype, setInnType] = useState([]);
  return (
    <div className="inn-reg-all-wrap">
      <div className="inn-reg-title">
        <h2>숙소등록페이지</h2>
      </div>
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
              <SelectInnType data={inntype} setData={setInnType} />
            </div>
          </div>
          <div className="inn-reg-image-wrap">
            <div className="inn-reg-image-wrap-title">
              숙소 사진등록<sub>(최대 5장 등록 가능)</sub>
            </div>
            <div className="inn-reg-image">ㅋㅋㅋ</div>
          </div>
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
  console.log(data);
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
export default InnReg;
