import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

const NoticeView = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const noticeNo = params.noticeNo;
  const [notice, setNotice] = useState({});
  useEffect(() => {
    axios
      .post(backServer + "/notice/selectOneNotice/" + noticeNo)
      .then((res) => {
        console.log(res.data.data);
        setNotice(res.data.data);
        console.log(notice);
      })
      .catch((res) => {});
  }, []);
  const member = props.member;
  const navigate = useNavigate();
  const checkBtn = () => {
    console.log(member);
    console.log(noticeNo);
  };
  const updateBtn = () => {};

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
      <Button text="확인" class="btn_secondary" clickEvent={checkBtn} />
      <Button text="수정" class="btn_secondary" clickEvent={updateBtn} />
      <Button text="삭제" class="btn_secondary" clickEvent={deleteBtn} />
    </section>
  );
};

export default NoticeView;
