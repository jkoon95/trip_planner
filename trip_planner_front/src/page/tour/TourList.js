import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./tour.css";
import TourSearchBox from "./TourSearchBox";
import axios from "axios";
import Swal from "sweetalert2";

const TourList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const [tourList, setTourList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [visibleTour, setVisibleTour] = useState(8); // 8개만 표시
  const [member, setMember] = useState("");

  useEffect(() => {
    axios
      .get(backServer + "/tour")
      .then((res) => {
        setTourList(res.data.data.tourList.slice(0, 40));
        setTicketList(res.data.data.ticketList.slice(0, 40));
      })
      .catch((res) => {
        console.log(res);
      });

    axios
      .get(backServer + "/tour/member")
      .then((res) => {
        setMember(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleTourMore = () => {
    setVisibleTour((prevCount) => prevCount + 4); // 4개씩 추가
  };
  const handleTitleClick = () => {
    navigate("/tourList");
  };

  const searchType = (type) => {
    axios
      .post(backServer + "/tour/tourType", { tourType: type })
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/tourType", {
            state: {
              tourList: res.data.data.tourList,
              ticketList: res.data.data.ticketList,
              tourType: type,
            },
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleSearchBox = () => {
    navigate("/tourSearch");
  };

  return (
    <section className="contents">
      <div className="tour-list-title" onClick={handleTitleClick}>
        <h2>투어 · 티켓</h2>
      </div>
      <div className="tour-search-box" onClick={handleSearchBox}>
        <TourSearchBox />
      </div>
      <TourIconBox searchType={searchType} />
      <TourSwiper />
      <div className="tour-list-prod">
        <h2>NEW TOUR</h2>
      </div>
      <div className="tour-prod-wrap">
        {tourList.slice(0, visibleTour).map((tour, index) => {
          const ticket = ticketList[index];
          return (
            <TourProd
              key={"tour" + index}
              tour={tour}
              ticket={ticket}
              tourNo={tour.tourNo}
              isLogin={isLogin}
              member={member}
            />
          );
        })}
        {visibleTour < tourList.length && (
          <div className="show-tour-more">
            <button className="btn_secondary" onClick={handleTourMore}>
              더 보기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const TourIconBox = ({ searchType }) => {
  const navigate = useNavigate();
  const handleType = (type) => {
    searchType(type);
    navigate("/tourType");
  };

  return (
    <div className="tour-icon-wrap">
      <div onClick={() => handleType(5)}>
        <img alt="입장권" src="/images/투어티켓.jpg" />
        <div>티켓 · 입장권</div>
      </div>
      <div onClick={() => handleType(1)}>
        <img alt="전시회" src="/images/투어전시.jpg" />
        <div>전시회</div>
      </div>
      <div onClick={() => handleType(2)}>
        <img alt="액티비티" src="/images/투어레저.jpg" />
        <div>액티비티</div>
      </div>
      <div onClick={() => handleType(4)}>
        <img alt="박람회" src="/images/투어박람.jpg" />
        <div>박람회</div>
      </div>
      <div onClick={() => handleType(3)}>
        <img alt="테마파크" src="/images/투어테마.jpg" />
        <div>테마파크</div>
      </div>
    </div>
  );
};

const TourSwiper = () => {
  const [topRatedTours, setTopRatedTours] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/tour/topTour")
      .then((res) => {
        setTopRatedTours(res.data.data.topTour);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleTourView = (tourNo) => {
    navigate("/tour/view/" + tourNo);
  };

  return (
    <Swiper
      className="tour-swiper"
      navigation={true}
      pagination={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={3}
      loop={true}
      speed={600}
    >
      {topRatedTours.map((tour, index) => (
        <SwiperSlide key={index} onClick={() => handleTourView(tour.tourNo)}>
          {tour.tourImg === null || tour.tourImg === "null" ? (
            <img src="/images/테마파크.jpg" />
          ) : (
            <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const TourProd = (props) => {
  const { tour, ticket, isLogin, member } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const tourView = () => {
    navigate("/tour/view/" + tour.tourNo);
  };

  // tourType에 따라 다른 텍스트 표시
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
    <>
      <div className="tour-prod">
        <div className="tour-bookmark">
          <img
            alt="찜"
            src="/images/투어찜.png"
            onClick={handleAddBookmark}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="tour-prod-img" onClick={tourView}>
          {tour.tourImg === null || tour.tourImg === "null" ? (
            <img src="/images/테마파크.jpg" />
          ) : (
            <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
          )}
        </div>
        <div className="tour-prod-info">
          <div className="tour-prod-name">
            [{tour.tourAddr.slice(0, 2)}] {tour.tourName}
          </div>
          <div className="tour-prod-type">
            {tour.tourAddr.slice(0, 2)} {tourTypeText}
          </div>
          <div className="tour-prod-price">
            {ticket.ticketAdult === 0
              ? "무료"
              : ticket.ticketAdult.toLocaleString() + " 원"}
          </div>
        </div>
      </div>
    </>
  );
};

export default TourList;
