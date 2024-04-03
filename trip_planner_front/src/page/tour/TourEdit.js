import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TourFrm from "./TourFrm";
import Swal from "sweetalert2";

const TourEdit = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams(); // 주소창에 있는 번호를 불러옴
  const tourNo = params.tourNo;
  // 제목,내용,섬네일 -> 데이터 담을 state 생성 -> 데이터 전송용
  const [tourName, setTourName] = useState("");
  const [tourType, setTourType] = useState("");
  const [tourAddr, setTourAddr] = useState("");
  const [salesCount, setSalesCount] = useState("");
  const [salesPeriod, setSalesPeriod] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [intronail, setIntronail] = useState(null);
  // 화면 출력용 state
  const [tourImg, setTourImg] = useState(null);
  const [tourIntro, setTourIntro] = useState(null);

  // 섬네일 수정 체크용
  const [thumbnailCheck, setThumbnailCheck] = useState(0);
  const [oldThumbnail, setOldThumbnail] = useState(null);
  const [intronailCheck, setIntronailCheck] = useState(0);
  const [oldIntronail, setOldIntronail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(backServer + "/tour/one/" + tourNo)
      .then((res) => {
        const tour = res.data.data;
        setTourName(tour.tourName);
        setTourType(tour.tourType);
        setTourAddr(tour.tourAddr);
        setSalesCount(tour.salesCount);
        setSalesPeriod(tour.salesPeriod);
        setTourImg(tour.tourImg);
        setTourIntro(tour.tourIntro);
        setOldThumbnail(tour.tourImg);
        setOldIntronail(tour.tourIntro);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const edit = () => {
    const form = new FormData();
    form.append("tourNo", tourNo);
    form.append("tourName", tourName);
    form.append("tourType", tourType);
    form.append("tourAddr", tourAddr);
    form.append("salesCount", salesCount);
    form.append("salesPeriod", salesPeriod);
    form.append("thumbnailCheck", thumbnailCheck);
    form.append("tourImg", oldThumbnail);
    form.append("intronailCheck", intronailCheck);
    form.append("tourIntro", oldIntronail); // 기존 섬네일을 boardImg변수에 저장 -> 섬네일이 변경되지 않으면 기존값으로 업데이트
    // 섬네일 수정하면 추가
    if (thumbnail !== null) {
      form.append("thumbnail", thumbnail);
    }
    if (intronail !== null) {
      form.append("intronail", intronail);
    }
    axios
      .patch(backServer + "/tour", form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire("정상적으로 수정되었습니다.");
          navigate("/mypage/tour/sale");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 상품 수정</h2>
        </div>
        <TourFrm
          tourName={tourName}
          setTourName={setTourName}
          tourType={tourType}
          setTourType={setTourType}
          tourAddr={tourAddr}
          setTourAddr={setTourAddr}
          salesCount={salesCount}
          setSalesCount={setSalesCount}
          salesPeriod={salesPeriod}
          setSalesPeriod={setSalesPeriod}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          intronail={intronail}
          setIntronail={setIntronail}
          tourImg={tourImg}
          setTourImg={setTourImg}
          tourIntro={tourIntro}
          setTourIntro={setTourIntro}
          buttonFunction={edit}
          type="edit"
          thumbnailCheck={thumbnailCheck}
          setThumbnailCheck={setThumbnailCheck}
          intronailCheck={intronailCheck}
          setIntronailCheck={setIntronailCheck}
        />
      </div>
    </section>
  );
};

export default TourEdit;
