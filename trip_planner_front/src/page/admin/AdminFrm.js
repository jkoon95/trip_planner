import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { Input } from "../../component/FormFrm";

const SelectType = (props) => {
  const data = props.data;
  const type = props.type;
  const setData = props.setData;
  const value1 = props.value1;
  const value2 = props.value2;
  const value3 = props.value3;
  const value4 = props.value4;
  const label = props.label;
  const changeType = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="auth">
      <FormControl variant="standard" sx={{ minWidth: 240 }}>
        <InputLabel id="demo-simple-select-standard-label">{type}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={data}
          label={label}
          onChange={changeType}
        >
          <MenuItem value={1}>{value1}</MenuItem>
          <MenuItem value={2}>{value2}</MenuItem>
          <MenuItem value={3}>{value3}</MenuItem>
          <MenuItem value={4}>{value4}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const RadioType = (props) => {
  const data = props.data;
  const setData = props.setData;
  const placeholder1 = props.placeholder1;
  const placeholder2 = props.placeholder2;
  const label = props.label;
  const value1 = props.value1;
  const value2 = props.value2;
  const value = props.value;
  const setValue = props.setValue;
  const label1 = props.label1;
  const label2 = props.label2;
  const changeType = (e) => {
    setValue(e.target.value);
  };
  const changeData = (e) => {
    setData(e.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={changeType}
      >
        <FormControlLabel value={1} control={<Radio />} label={value1} />
        <FormControlLabel value={2} control={<Radio />} label={value2} />
      </RadioGroup>
    </FormControl>
  );
};

export { SelectType, RadioType };
