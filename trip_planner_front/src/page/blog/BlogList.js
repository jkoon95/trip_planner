import { useNavigate } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import "./blog.css";
import { useState } from "react";

const BlogList = (props) => {
  const isLogin = props.isLogin;
  const navigate = useNavigate();
  const writeBtn = () => {
    navigate("/blogWrite");
  };

  const [blogList, setBlogList] = useState([]);

  return (
    <section className="contents blogList">
      <div className="blog-list-wrap">
        <div className="blog-list-title-wrap">
          <div className="blog-list-title-one">Trip Planner</div>
          <div className="blog-list-title-two">추천 여행지</div>
          <div className="blog-list-title-three">
            <p>🔥 HOT한 국내 여행지를 추천해드려요</p>
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
        <div className="blog-list-main-wrap">
          {blogList.map((blog, index) => {
            return <BlogItem key={"blog" + index} blog={blog} />;
          })}
        </div>
      </div>
    </section>
  );
};

const BlogItem = () => {
  return (
    <div className="blog-list-content">
      <div className="blog-list-img">
        <img src="/images/blogDefault.png" />
      </div>
      <div className="blog-list-info">
        <div className="blog-info-title">블로그제목</div>
        <div className="blog-lnfo-content">블로그소개글</div>
      </div>
    </div>
  );
};

export default BlogList;
