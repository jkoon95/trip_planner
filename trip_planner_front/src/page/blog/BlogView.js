import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogView = (props) => {
  const isLogin = props.isLogin;
  const params = useParams();
  const blogNo = params.blogNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [blog, setBlog] = useState({});
  const [list, setlist] = useState([]);
  const [member, setMember] = useState(null);
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
  }, []);
  console.log(blog);
  console.log(list);
  return (
    <section className="contents blogList">
      <div className="blog-view-wrap">
        <h2>BLOG </h2>
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
            return <DayItem key={"list" + index} day={day} />;
          })}
        </div>
      </div>
      <div className="btn-box">
        <button type="button" class="btn_secondary md">
          삭제
        </button>
      </div>
    </section>
  );
};

const DayItem = (props) => {
  const day = props.day;
  return (
    <div className="day-list">
      <span className="schedule-title">{day.blogDateScheduleTitle}</span>
      <span
        className="schedule-content"
        dangerouslySetInnerHTML={{ __html: day.blogDateScheduleContent }}
      ></span>
    </div>
  );
};

export default BlogView;
