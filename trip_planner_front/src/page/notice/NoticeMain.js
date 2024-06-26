import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import NoticeList from "./NoticeList";
import { useEffect, useState } from "react";
import NoticeView from "./NoticeView";
import NoticeWrite from "./NoticeWrite";

const NoticeMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState("");
  const isLogin = props.isLogin;
  useEffect(() => {
    axios
      .get(backServer + "/member")
      .then((res) => {
        // console.log(res.data.data);
        setMember(res.data.data);
        console.log(member);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <Routes>
      <Route
        path="/noticeList"
        element={<NoticeList member={member} isLogin={isLogin} />}
      />
      <Route
        path="/view/:noticeNo"
        element={<NoticeView member={member} isLogin={isLogin} />}
      />
      <Route
        path="/write"
        element={<NoticeWrite member={member} isLogin={isLogin} />}
      />
    </Routes>
  );
};

export default NoticeMain;
