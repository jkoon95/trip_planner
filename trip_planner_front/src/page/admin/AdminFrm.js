import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "../../component/FormFrm";
import Modal from "../../component/Modal";
import { useState } from "react";

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
    setData(Number(e.target.value));
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
    setValue(Number(e.target.value));
  };
  const changeData = (e) => {
    setData(Number(e.target.value));
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

const ExpireDatePicker = (props) => {
  const expireDate = props.expireDate;
  const setExpireDate = props.setExpireDate;
  const changeExpireDate = (newValue) => {
    //setExpireDate(newValue);
    setExpireDate(dayjs(newValue));
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={{ fullDate: "M" }}
      adapterLocale="ko"
    >
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="만료일"
          format="YYYY-MM-DD"
          value={expireDate ? expireDate : dayjs("2024-04-04")}
          onChange={changeExpireDate}
          disablePast
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

const CouponModal = (props) => {
  const title = props.title;
  const openModal = props.openModal;
  const content = props.content;
  const closeModal = props.closeModal;
  const useCloseBtn = props.useCloseBtn;
  const couponList = props.couponList;

  // 모달1
  const [openModal1, setOpenModal1] = useState(false);
  const openModalFunc1 = () => {
    document.body.classList.add("scroll_fixed");
    setOpenModal1(true);
  };
  const closeModalFunc1 = () => {
    document.body.classList.remove("scroll_fixed");
    setOpenModal1(false);
  };
  return (
    <>
      <Modal
        class="modal lg"
        open={openModal1}
        title={title}
        useCloseBtn={true}
        closeModal={closeModalFunc1}
      >
        <div className="btn_area">
          <Button
            class="btn_secondary outline"
            text="취소"
            clickEvent={closeModalFunc1}
          />
          <Button
            class="btn_secondary"
            text="확인"
            clickEvent={closeModalFunc1}
          />
        </div>
      </Modal>
    </>
  );
};

export { SelectType, RadioType, ExpireDatePicker, CouponModal };
