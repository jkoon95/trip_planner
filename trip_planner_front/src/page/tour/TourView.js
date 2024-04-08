import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TourView = (props) => {
  const isLogin = props.isLogin;
  const params = useParams();
  const tourNo = params.tourNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [tour, setTour] = useState({});
  const [ticket, setTicket] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/tour/view/" + tourNo)
      .then((res) => {
        setTour(res.data.data);
        setTicket(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleTitleClick = () => {
    navigate("/tourList");
  };

  return (
    <section className="contents">
      <div className="tour-view-prev" onClick={handleTitleClick}>
        <span className="material-icons">reply</span>
        <h5>투어 리스트 목록으로</h5>
      </div>
      <div className="tour-view-wrap">
        <div className="tour-view-top">
          <div className="tour-view-thumbnail">
            {tour.tourImg === null || tour.tourImg === "null" ? (
              <img src="/images/테마파크.jpg" />
            ) : (
              <img src={backServer + "/tour/thumbnail/" + tour.tourImg} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourView;
