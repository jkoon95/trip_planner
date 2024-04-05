import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoticeList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [noticeList, setNoticeList] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/notice/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data.data.noticeList);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
  return (
    <section className="contents">
      <h2>공지사항</h2>
      <div className="noitce_wrap"></div>
    </section>
  );
};

export default NoticeList;
