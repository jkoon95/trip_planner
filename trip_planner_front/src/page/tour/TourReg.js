import { useState } from "react";
import { Button, Input } from "../../component/FormFrm";
import "./myTour.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TourReg = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [tourName, setTourName] = useState("");
  const [tourType, setTourType] = useState("");
  const [tourRegion, setTourRegion] = useState("");
  const [tourCount, setTourCount] = useState("");
  const [salesPeriod, setSalesPeriod] = useState("");
  const [tourFilepath, setTourFilepath] = useState(null);
  const [tourIntro, setTourIntro] = useState(null);
  const navigate = useNavigate();

  const changeTourImg = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setTourFilepath(reader.result); // 이미지 파일을 읽어와서 섬네일로 설정
      };
    } else {
      setTourFilepath(null);
    }
  };
  const changeTourIntro = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setTourIntro(reader.result); // 이미지 파일을 읽어와서 섬네일로 설정
      };
    } else {
      setTourIntro(null);
    }
  };

  const handleTourReg = () => {
    if (tourName !== "") {
      // 전송용 form객체 생성
      const form = new FormData();
      form.append("tourName", tourName);
      form.append("tourType", tourType);
      form.append("tourRegion", tourRegion);
      form.append("tourCount", tourCount);
      form.append("salesPeriod", salesPeriod);
      // 섬네일은 첨부한 경우에만 추가
      if (tourFilepath !== null) {
        form.append("tourFilepath", tourFilepath);
      }
      if (tourIntro !== null) {
        form.append("tourIntro", tourIntro);
      }

      axios
        .post(backServer + "/tour/reg", form)
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire("이용권 등록을 위해 상품 수정 페이지로 이동합니다.");
            navigate("/tour/edit");
          } else {
            Swal.fire("입력값을 다시 확인해주세요.");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire("필수 입력항목입니다.");
    }
  };

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 상품 등록</h2>
        </div>
        <TourInputWrap
          placeholder="상품명을 입력해주세요."
          label="투어 이름"
          content="tourName"
          data={tourName}
          setData={setTourName}
        />
        <TourTypeRadio data={tourType} setData={setTourType} />
        <TourInputWrap
          placeholder="투어 주소를 입력해주세요."
          label="투어 주소"
          content="tourRegion"
          data={tourRegion}
          setData={setTourRegion}
        />
        <TourInputWrap
          placeholder="하루 판매수량을 입력해주세요.(숫자만 입력)"
          label="일일 판매수량"
          content="tourCount"
          data={tourCount}
          setData={setTourCount}
        />
        <TourInputWrap
          placeholder="예) 2024-04-17"
          label="판매 종료날짜"
          content="salesPeriod"
          data={salesPeriod}
          setData={setSalesPeriod}
        />
        <div className="tour-img-wrap">
          <div>
            <div className="tour-img-title">대표 이미지</div>
            <input
              type="file"
              accept="image/*"
              onChange={changeTourImg}
              multiple={false}
            />
            {/* 섬네일 미리보기 */}
            {tourFilepath && (
              <div className="tour-thumbnail">
                <img src={tourFilepath} alt="섬네일" />
              </div>
            )}
          </div>
        </div>
        <div className="tour-img-wrap">
          <div>
            <div className="tour-img-title">소개 이미지</div>
            <input
              type="file"
              accept="image/*"
              onChange={changeTourIntro}
              multiple={false}
            />
            {/* 섬네일 미리보기 */}
            {tourIntro && (
              <div className="tour-thumbnail">
                <img src={tourIntro} alt="섬네일" />
              </div>
            )}
          </div>
        </div>
        <button class="btn_primary tour-reg-btn" onClick={handleTourReg}>
          등록하기
        </button>
      </div>
    </section>
  );
};

const TourTypeRadio = (props) => {
  const data = props.data;
  const setData = props.setData;

  const changeTourType = (e) => {
    setData(e.target.value); // 선택한 라디오 버튼의 값으로 상위 컴포넌트의 상태 업데이트
  };

  return (
    <div className="tour-radio-wrap">
      <div>
        <div className="tour-radio-title">투어 유형</div>
        <div className="tour-type">
          <input
            type="radio"
            name="tourType"
            id="tourR1"
            value="1"
            onChange={changeTourType}
            checked={data === "1"}
          />
          <label htmlFor="tourR1">전시회</label>
          <input
            type="radio"
            name="tourType"
            id="tourR2"
            value="2"
            onChange={changeTourType}
            checked={data === "2"}
          />
          <label htmlFor="tourR2">액티비티</label>
          <input
            type="radio"
            name="tourType"
            id="tourR3"
            value="3"
            onChange={changeTourType}
            checked={data === "3"}
          />
          <label htmlFor="tourR3">테마파크</label>
          <input
            type="radio"
            name="tourType"
            id="tourR4"
            value="4"
            onChange={changeTourType}
            checked={data === "4"}
          />
          <label htmlFor="tourR4">박람회</label>
          <input
            type="radio"
            name="tourType"
            id="tourR5"
            value="5"
            onChange={changeTourType}
            checked={data === "5"}
          />
          <label htmlFor="tourR5">입장권</label>
        </div>
      </div>
    </div>
  );
};

const TourInputWrap = (props) => {
  const placeholder = props.placeholder;
  const label = props.label;
  const content = props.content;
  const data = props.data;
  const setData = props.setData;
  return (
    <div className="tour-input-wrap">
      <div>
        <div className="tour-label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="tour-input">
          <Input
            placeholder={placeholder}
            data={data}
            setData={setData}
            content={content}
          />
        </div>
      </div>
    </div>
  );
};

export default TourReg;
