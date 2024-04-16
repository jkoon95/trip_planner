import { useState } from "react";
import TextEditor from "../../component/TextEditor";
import { Button } from "../../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NoticeWrite = (props) => {
  const member = props.member;
  const memberNo = member.memberNo;
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNOticeContent] = useState("");
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const ChangeNoticeTitle = (e) => {
    setNoticeTitle(e.target.value);
  };

  const write = () => {
    const form = new FormData();
    form.append("noticeTitle", noticeTitle);
    form.append("noticeContent", noticeContent);
    form.append("memberNo", memberNo);
    if (noticeTitle !== "" && noticeContent !== "") {
      axios
        .post(backServer + "/notice/write", form)
        .then((res) => {
          Swal.fire({ title: "작성 성공", icon: "success" });
          navigate("/notice/noticeList");
        })
        .catch((res) => {});
    } else {
      Swal.fire("제목/내용을 입력해주세요");
    }
  };
  return (
    <section className="contents noticeWrite">
      <div className="notice-write-wrap">
        <div className="notice-write-title">
          <h3>공지사항 작성</h3>
        </div>
        <div className="notice-write-info">
          <table>
            <tbody>
              <tr>
                <td>작성자 : </td>
                <th>{member.memberNickName}</th>
              </tr>
              <tr>
                <td>제목 :</td>
                <td>
                  <input
                    type="text"
                    value={noticeTitle}
                    onChange={ChangeNoticeTitle}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="notice-write-content">
          <TextEditor
            data={noticeContent}
            setData={setNOticeContent}
            url={backServer + "/notice/editor"}
          ></TextEditor>
        </div>
      </div>
      <div className="btn_area">
        <Button class="btn_primary" text="작성" clickEvent={write}></Button>
      </div>
    </section>
  );
};

export default NoticeWrite;
