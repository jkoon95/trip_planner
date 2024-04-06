import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import "react-quill/dist/quill.snow.css";

const BlogView = (props) => {
  const isLogin = props.isLogin;
  const params = useParams();
  const blogNo = params.blogNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [blog, setBlog] = useState({});
  const [list, setlist] = useState([]);
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(backServer + "/blog/one/" + blogNo)
      .then((res) => {
        setBlog(res.data.data.blog);
        setlist(res.data.data.list);
      })
      .catch((res) => {
        console.log(res);
      });
    if (isLogin) {
      axios.get(backServer + "/member").then((res) => {
        console.log(res.data.data);
        setMember(res.data.data);
      });
    }
  }, []);
  const deleteBoard = () => {
    Swal.fire({
      icon: "warning",
      text: "블로그를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancleButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(backServer + "/blog/" + blog.blogNo)
          .then((res) => {
            console.log(res.data);
            if (res.data.message === "success") {
              navigate("/blogList");
            }
          })
          .catch((res) => {
            console.log(res.data);
          });
      }
    });
  };
  useEffect(() => {});
  return (
    <section className="contents blogList">
      <div className="blog-view-wrap">
        <h2>BLOG </h2>
        {isLogin ? (
          <div className="btn-box">
            {member && member.memberNickName == blog.memberNickName ? (
              <>
                <button
                  type="button"
                  class="btn_secondary outline md"
                  onClick={deleteBoard}
                >
                  삭제
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        <div className="blog-view-info">
          <div>닉네임 : {blog.memberNickName}</div>
          <div>작성일자 : {blog.blogDate}</div>
        </div>
        <div className="blog-view-top">
          {blog && blog.blogThumbnail === null ? (
            <img src="/images/blogDefault.png" />
          ) : (
            <img
              src={backServer + "/blog/blogThumbnail/" + blog.blogThumbnail}
            />
          )}

          <div className="blog-view-title">{blog.blogTitle}</div>
        </div>
        <div className="blog-view-content">
          {list.map((day, index) => {
            return (
              <DayItem key={"list" + index} day={day} dayNumber={index + 1} />
            );
          })}
        </div>
        <h1>댓글</h1>
      </div>
    </section>
  );
};

const DayItem = (props) => {
  const day = props.day;
  const dayNumber = props.dayNumber;
  return (
    <div className="day-list">
      <div className="date-day">{"🚕 " + " day " + dayNumber + " 💨"} </div>
      <span className="schedule-title">{day.blogDateScheduleTitle}</span>
      <span
        className="schedule-content ql-editor"
        dangerouslySetInnerHTML={{ __html: day.blogDateScheduleContent }}
      ></span>
    </div>
  );
};

export default BlogView;
