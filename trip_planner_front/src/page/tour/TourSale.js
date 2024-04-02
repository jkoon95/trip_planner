import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/TourPagination";

const TourSale = () => {
  const [tourSale, setTourSale] = useState([]);
  // 페이징 구현에 필요한 데이터들을 객체로 받음
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(backServer + "/tour/sale/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setTourSale(res.data.data.tourSale);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
  const navigate = useNavigate();
  const editBtn = () => {
    navigate("/tour/edit");
  };

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 상품 조회</h2>
        </div>
        <div className="tour-sale-wrap">
          {tourSale.map((tour, index) => {
            return <TourItem key={"tour" + index} tour={tour} />;
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

const TourItem = (props) => {
  const tour = props.tour;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const tourView = () => {
    navigate("/tour/view/" + tour.tourNo);
  };
  return (
    <div className="tour-item" onClick={tourView}>
      <div className="tour-item-img">
        {tour.tourImg === null ? (
          <img src="/images/defaultTour.png" />
        ) : (
          <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
        )}
      </div>
      <div className="tour-item-info">
        <div className="tour-item-name">{tour.tourName}</div>
        <div className="tour-item-period">{tour.salesPeriod}</div>
      </div>
    </div>
  );
};

export default TourSale;
