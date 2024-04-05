import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../component/Pagination";
import "./notice.css";
import { Button } from "../../component/FormFrm";

const NoticeList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [noticeList, setNoticeList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const member = props.member;
  const isLogin = props.isLogin;
  const writeBtn = () => {
    console.log(member);
  };

  useEffect(() => {
    axios
      .get(backServer + "/notice/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data.data.noticeList);
        setPageInfo(res.data.data.pi);
        console.log(member);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage, member]);
  return (
    <section className="contents notice">
      <h2>공지사항</h2>
      <>
        {isLogin ? (
          <div className="notice-write-btn">
            <Button text="글쓰기" class="btn_secondary" clickEvent={writeBtn} />
          </div>
        ) : (
          ""
        )}
      </>
      <div className="noitce_wrap">
        <div className="notice-tbl-wrap">
          <table className="notice-tbl">
            <thead>
              <tr>
                <td width={"15%"}>글번호</td>
                <td width={"50%"} className="title-td">
                  제목
                </td>

                <td width={"20%"}>작성자</td>
                <td width={"15%"}>작성일</td>
              </tr>
            </thead>
            <tbody>
              {noticeList.map((notice, index) => {
                return <NoticeItem key={"notice" + index} notice={notice} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="page-box">
          <Pagination
            pageInfo={pageInfo}
            reqPage={reqPage}
            setReqPage={setReqPage}
          />
        </div>
      </div>
    </section>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  return (
    <tr>
      <td>{notice.noticeNo}</td>
      <td className="title-td">
        <div>
          <Link to={"/notice/view/" + notice.noticeNo}>
            {notice.noticeTitle}
          </Link>
        </div>
      </td>
      <td>{notice.memberNickName}</td>
      <td>{notice.noticeDate}</td>
    </tr>
  );
};

export default NoticeList;
