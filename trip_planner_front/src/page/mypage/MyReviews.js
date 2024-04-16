import "./myReview.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyReviews = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [innReviewList, setInnReviewList] = useState([]);
  const memberNo = props.member.memberNo;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(backServer + "/mypage/innReviewList/" + memberNo)
      .then((res) => {
        console.log(res.data.data);
        setInnReviewList(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const reviewPage = (review) => {
    const refNo = review.refNo;
    navigate("/innDetailView/" + refNo);
  };
  return (
    <div className="myreview-contents-box">
      <h3>리뷰 목록</h3>
      {innReviewList &&
        innReviewList.map((review, index) => (
          <div
            key={index}
            className="myreview-item"
            onClick={() => reviewPage(review)}
          >
            <div className="myreview-box-left">
              <div>제목 : {review.reviewTitle}</div>
              내용 : {review.reviewContent}
            </div>
            <div className="myreview-box-right">
              <div>{review.memberNickname}</div>
              <div>{review.reviewDate}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyReviews;
