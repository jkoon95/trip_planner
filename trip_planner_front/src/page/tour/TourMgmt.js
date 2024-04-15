import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import Swal from "sweetalert2";

const TourMgmgt = ({ member }) => {
  const memberNo = member.memberNo;
  const [tourBook, setTourBook] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("회원번호 : " + memberNo);
    if (!member) {
      navigate("/");
      return;
    }

    axios
      .get(backServer + "/tour/mgmt/" + reqPage + "/" + memberNo)
      .then((res) => {
        setTourBook(res.data.data.tourBook);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [memberNo, reqPage]);

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 예약 관리</h2>
        </div>
        <div className="tour-mgmt-wrap">
          {tourBook.map((tour, index) => (
            <div key={index} className="tour-book-list">
              <div>투어 예약 번호: {tour.tourBookNo}</div>
              <div>투어 번호: {tour.tourNO}</div>
              <div>회원 번호: {tour.memberNo}</div>
              <div>예약 일자: {tour.bookDate}</div>
              <div>예약 총 인원: {tour.bookGuest}</div>
              <div>예약 총 가격: {tour.bookFee}</div>
              <div>예약 상태: {tour.bookStatus === 1 ? "확정" : "취소"}</div>
            </div>
          ))}
        </div>
        <div className="tour-page">
          <Pagination
            pageInfo={pageInfo}
            reqPage={reqPage}
            setReqPage={setReqPage}
          />
        </div>
      </div>
    </section>
  );
};

export default TourMgmgt;
