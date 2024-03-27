import { useNavigate } from "react-router-dom";
import { Button } from "../../component/FormFrm";
import "./blog.css";

const BlogList = () => {
  const navigate = useNavigate();
  const writeBtn = () => {
    navigate("/blogWrite");
  };
  return (
    <section className="contents blogList">
      <div className="blog-list-wrap">
        <div className="blog-list-title-wrap">
          <div className="blog-list-title-one">Trip Planner</div>
          <div className="blog-list-title-two">추천 여행지</div>
          <div className="blog-list-title-three">
            <p>🔥 HOT한 국내 여행지를 추천해드려요</p>
            <div className="blog-write-btn">
              <button
                type="button"
                className="btn_secondary md"
                onClick={writeBtn}
              >
                글쓰기
              </button>
            </div>
          </div>
        </div>
        <div className="blog-list-main-wrap">
          <div className="blog-list-content">블로그리스트</div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
