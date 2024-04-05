import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import NoticeList from "./NoticeList";
import { useState } from "react";
import NoticeView from "./NoticeView";

const NoticeMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState("");
  const isLogin = props.isLogin;
  if (!isLogin) {
  }
  axios
    .get(backServer + "/member")
    .then((res) => {
      // console.log(res.data.data);
      setMember(res.data.data);
    })
    .catch((res) => {
      console.log(res);
    });
  return (
    <Routes>
      <Route
        path="/noticeList"
        element={<NoticeList member={member} isLogin={isLogin} />}
      />
      <Route path="/view/:noticeNo" element={<NoticeView member={member} />} />
    </Routes>
  );
};

export default NoticeMain;
