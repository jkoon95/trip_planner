import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import Swal from "sweetalert2";

const TourSale = ({ member }) => {
  const memberNo = member.memberNo;
  const [tourSale, setTourSale] = useState([]);
  // 페이징 구현에 필요한 데이터들을 객체로 받음
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("회원번호 : " + memberNo);
    if (!member) {
      navigate("/");
      return;
    }

    axios
      .get(backServer + "/tour/sale/" + reqPage + "/" + memberNo)
      .then((res) => {
        console.log(res.data);
        setTourSale(res.data.data.tourSale);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [memberNo, reqPage]);

  const toggleStatus = (tourNo, salesStatus) => {
    console.log(tourNo);
    console.log(salesStatus);
    Swal.fire({
      icon: "question",
      text: "판매 상태를 전환하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "전환",
      cancelButtonText: "취소",
    })
      .then((res) => {
        if (res.isConfirmed) {
          axios
            .patch(backServer + "/tour/status/" + tourNo + "/" + salesStatus)
            .then((res) => {
              console.log(res.data);
              // 성공적으로 상태가 변경되면 해당 투어 상품을 업데이트
              const updateStatus = tourSale.map((tour) => {
                if (tour.tourNo === tourNo) {
                  return {
                    ...tour,
                    salesStatus: tour.salesStatus === 2 ? 1 : 2,
                  };
                }
                return tour;
              });
              setTourSale(updateStatus);
              Swal.fire("변경되었습니다.");
            })
            .catch((res) => {
              console.log(res);
            });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const deleteTour = (tour) => {
    console.log(tour.tourNo);
    Swal.fire({
      icon: "warning",
      text: "상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(backServer + "/tour/" + tour.tourNo)
          .then((res) => {
            if (res.data.message === "success") {
              Swal.fire("삭제되었습니다.");
              // 삭제 후에 투어 목록 다시 불러옴
              axios
                .get(backServer + "/tour/sale/" + reqPage + "/" + memberNo)
                .then((res) => {
                  console.log(res.data);
                  setTourSale(res.data.data.tourSale);
                  setPageInfo(res.data.data.pi);
                })
                .catch((res) => {
                  console.log(res);
                });
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    });
  };

  const edit = (tourNo) => {
    navigate("/mypage/tour/edit/" + tourNo);
  };

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 상품 조회</h2>
        </div>
        <div className="tour-sale-wrap">
          {tourSale.map((tour, index) => {
            return (
              <TourItem
                key={"tour" + index}
                tour={tour}
                toggleStatus={toggleStatus}
                deleteTour={deleteTour}
                edit={edit}
              />
            );
          })}
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

const TourItem = ({ tour, toggleStatus, deleteTour, edit }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const tourView = () => {
    navigate("/tour/view/" + tour.tourNo);
  };
  return (
    <div className="tour-item">
      <div className="tour-item-img">
        {tour.tourImg === null ? (
          <img
            onClick={tourView}
            alt="기본이미지"
            src="/images/defaultTour.png"
          />
        ) : (
          <img
            onClick={tourView}
            alt="메인이미지"
            src={backServer + "/tour/thumbnail/" + tour.tourImg}
          />
        )}
      </div>
      <div className="tour-item-info">
        <div className="tour-item-name">{tour.tourName}</div>
        <div className="tour-item-details">
          <div className="tour-item-period">~ {tour.salesPeriod}</div>
          <div
            className="tour-item-status"
            onClick={() => toggleStatus(tour.tourNo, tour.salesStatus)}
          >
            {tour.salesStatus === 2 ? "준비중" : "판매중"}
          </div>
        </div>
        <div className="tour-item-count">남은 판매수량 : {tour.salesCount}</div>
        <div className="tour-item-btn-box">
          <button className="btn_primary sm" onClick={() => edit(tour.tourNo)}>
            수정
          </button>
          <button
            className="btn_primary outline sm"
            onClick={() => deleteTour(tour)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourSale;
