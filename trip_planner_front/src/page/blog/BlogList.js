import { useNavigate } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import "./blog.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../component/Pagination";

const BlogList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [blogList, setBlogList] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  const isLogin = props.isLogin;

  const navigate = useNavigate();
  const writeBtn = () => {
    navigate("/blogwrite");
  };

  useEffect(() => {
    axios
      .get(backServer + "/blog/list/" + reqPage)
      .then((res) => {
        setBlogList(res.data.data.blogList);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
  return (
    <section className="contents blogList">
      <div className="blog-list-title-wrap">
        <div className="blog-list-title-one">Trip Planner</div>
        <div className="blog-list-title-two">추천 여행지</div>
        <div className="blog-list-title-three">
          <p>🔥 HOT한 국내 여행지를 공유해주세요.</p>
          <>
            {isLogin ? (
              <div className="blog-write-btn">
                <Button
                  text="글쓰기"
                  class="btn_secondary"
                  clickEvent={writeBtn}
                />
              </div>
            ) : (
              ""
            )}
          </>
        </div>
      </div>
      <div className="blog-list-wrap">
        {blogList.map((blog, index) => {
          return <BlogItem key={"blog" + index} blog={blog} />;
        })}
      </div>
      <div className="page-box">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
    </section>
  );
};

const BlogItem = (props) => {
  const blog = props.blog;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const blogView = () => {
    navigate("/blogView/" + blog.blogNo);
  };

  return (
    <div className="blog-item" onClick={blogView}>
      <div className="blog-item-img">
        {blog.blogThumbnail === null ? (
          <img src="/images/blogDefault.png" />
        ) : (
          <img src={backServer + "/blog/blogThumbnail/" + blog.blogThumbnail} />
        )}
      </div>
      <div className="blog-item-info">
        <div className="blog-info-title">{blog.blogTitle}</div>
        <div className="blog-user-info">
          <div className="blog-info-nickname">{blog.memberNickName}</div>
          <div className="blog-info-date">{blog.blogDate}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
