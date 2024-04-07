import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import TextEditor from "../../component/TextEditor";

const NoticeView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const member = props.member;
  const isLogin = props.isLogin;
  const params = useParams();
  const noticeNo = params.noticeNo;
  const [notice, setNotice] = useState({});
  useEffect(() => {
    axios
      .post(backServer + "/notice/selectOneNotice/" + noticeNo)
      .then((res) => {
        console.log(res.data.data);
        setNotice(res.data.data);
      })
      .catch((res) => {});
  }, []);
  const navigate = useNavigate();
  const updateBtn = () => {
    const contentDiv = document.querySelector(".notice-content");
    const removeContent = document.querySelector("#viewContent");
    removeContent.remove();
    contentDiv.append(<TextEditor value={notice.noticeContent}></TextEditor>);
  };

  const deleteBtn = () => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제하면 복구하실 수 없습니다.",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "삭제", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        axios
          .delete(backServer + "/notice/deleteNotice/" + noticeNo)
          .then((res) => {
            if (res.data.message === "success") {
              Swal.fire("삭제되었습니다.", "success");
              navigate("/notice/noticeList");
            }
          })
          .catch((res) => {});
      }
    });
  };
  return (
    <section className="contents notice">
      <h2>공지사항 상세</h2>
      <div className="notice-input-wrap">
        <div className="notice-title">
          <h3>{notice.noticeTitle}</h3>
        </div>
        <div className="notice-info">
          <div className="notice-writer">
            작성자 <span>{notice.memberNickName}</span>
          </div>
          <div className="notice-date">
            작성일 <span>{notice.noticeDate}</span>
          </div>
        </div>
        <div className="notice-content">
          <textarea
            id="viewContent"
            readOnly
            value={notice.noticeContent}
          ></textarea>
        </div>
        {isLogin && member.memberType === 3 ? (
          <div className="btn_area">
            <Button
              text="수정"
              class="btn_primary outline"
              clickEvent={updateBtn}
            />
            <Button text="삭제" class="btn_primary" clickEvent={deleteBtn} />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default NoticeView;
