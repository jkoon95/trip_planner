import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../component/Pagination";
import { useNavigate } from "react-router-dom";

const TourSale = () => {
  const [tourSale, setTourSale] = useState([]);
  // 페이징 구현에 필요한 데이터들을 객체로 받음
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(backServer + "/tour/sale" + reqPage)
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
      </div>
    </section>
  );
};

export default TourSale;
