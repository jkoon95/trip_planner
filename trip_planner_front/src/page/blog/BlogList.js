import "./blog.css";

const BlogList = () => {
  return (
    <div className="blog-list-wrap">
      <div className="blog-list-title-wrap">
        <div className="blog-list-title-one">Trip Planner</div>
        <div className="blog-list-title-two">추천 여행지</div>
        <div className="blog-list-title-three">
          <p>🔥 HOT한 국내 여행지를 추천해드려요</p>
          <div>버튼</div>
        </div>
      </div>
      <div className="blog-list-main-wrap">
        <div className="blog-list-content">블로그리스트</div>
        <div className="content">두번째</div>
      </div>
    </div>
  );
};

export default BlogList;
