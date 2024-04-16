import { useEffect, useState } from "react";
import TourSearchBox from "./TourSearchBox";
import { Button } from "../../component/FormFrm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const TourSearch = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const searchText = location.state ? location.state.searchText : "";
  const startDate = location.state ? location.state.startDate : dayjs();
  const [member, setMember] = useState("");
  const [tourList, setTourList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [visibleTour, setVisibleTour] = useState(5); // 5개만 표시
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state &&
      location.state.tourList &&
      location.state.ticketList
    ) {
      setTourList(location.state.tourList);
      setTicketList(location.state.ticketList);
    }
    axios
      .get(backServer + "/tour/member")
      .then((res) => {
        setMember(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [location.state]);

  const handleTourMore = () => {
    setVisibleTour((prevCount) => prevCount + 5); // 5개씩 추가
  };
  const handleTitleClick = () => {
    navigate("/tourList");
  };

  return (
    <section className="contents">
      <div className="tour-list-title">
        <h2>투어 · 티켓</h2>
        <h2>검색결과</h2>
      </div>
      <div className="tour-view-prev" onClick={handleTitleClick}>
        <span className="material-icons">reply</span>
        <h5>투어 리스트 목록으로</h5>
      </div>
      <TourSearchBox value={searchText} date={startDate} />
      {tourList.length === 0 ? (
        <div className="tour-list-empty">
          <h2>일치하는 상품이 없습니다.</h2>
          <div className="tour-loading-icon"></div>
        </div>
      ) : (
        tourList.slice(0, visibleTour).map((tour, index) => {
          const ticket = ticketList[index];
          return (
            <TourItem
              key={index}
              tour={tour}
              ticket={ticket}
              isLogin={isLogin}
              member={member}
            />
          );
        })
      )}
      {visibleTour < tourList.length && (
        <div className="tour-list-more">
          <button className="btn_secondary" onClick={handleTourMore}>
            더 보기
          </button>
        </div>
      )}
    </section>
  );
};

const TourItem = ({ tour, ticket, isLogin, member }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const tourView = () => {
    navigate("/tour/view/" + tour.tourNo);
  };

  let tourTypeText;
  switch (tour.tourType) {
    case 1:
      tourTypeText = "전시회";
      break;
    case 2:
      tourTypeText = "액티비티";
      break;
    case 3:
      tourTypeText = "테마파크";
      break;
    case 4:
      tourTypeText = "박람회";
      break;
    case 5:
      tourTypeText = "티켓·입장권";
      break;
    default:
      tourTypeText = "기타";
  }
  const salesPeriod = tour.salesPeriod ? tour.salesPeriod.substring(0, 10) : "";

  const handleAddBookmark = () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "로그인 후 이용이 가능합니다.",
        confirmButtonText: "닫기",
      });
    } else {
      const formData = new FormData();
      formData.append("refNo", tour.tourNo); // 투어 번호
      formData.append("memberNo", member.memberNo); // 사용자 번호

      axios
        .post(backServer + "/tour/like", formData)
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire("찜하기 성공!", "찜 목록에서 확인하세요.", "success");
          } else {
            Swal.fire("찜하기 실패", "이미 찜한 투어입니다.", "error");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="tour-prod-zone">
      <div className="tour-prod">
        <div className="tour-prod-img" onClick={tourView}>
          {tour.tourImg === null || tour.tourImg === "null" ? (
            <img src="/images/테마파크.jpg" />
          ) : (
            <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
          )}
        </div>
        <div className="tour-prod-info">
          <div className="tour-prod-name">
            {" "}
            [{tour.tourAddr.slice(0, 2)}] {tour.tourName}
          </div>
          <div className="tour-prod-subname">
            {tour.tourAddr.slice(0, 2)} {tourTypeText}
          </div>
          <div className="tour-prod-limit">~ {salesPeriod}</div>
          <div className="tour-prod-price">
            {ticket.ticketAdult === 0
              ? "무료"
              : ticket.ticketAdult.toLocaleString() + " 원"}
          </div>
          <img
            className="tour-prod-bookmark"
            alt="찜"
            src="/images/투어찜.png"
            onClick={handleAddBookmark}
          />
        </div>
      </div>
    </div>
  );
};

export default TourSearch;
