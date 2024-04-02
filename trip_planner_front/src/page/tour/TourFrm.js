import { useState } from "react";
import { Button, Input } from "../../component/FormFrm";

const TourFrm = (props) => {
  const tourName = props.tourName;
  const setTourName = props.setTourName;
  const tourType = props.tourType;
  const setTourType = props.setTourType;
  const tourAddr = props.tourAddr;
  const setTourAddr = props.setTourAddr;
  const salesCount = props.salesCount;
  const setSalesCount = props.setSalesCount;
  const salesPeriod = props.salesPeriod;
  const setSalesPeriod = props.setSalesPeriod;
  const tourImg = props.tourImg;
  const setTourImg = props.setTourImg;
  const tourIntro = props.tourIntro;
  const setTourIntro = props.setTourIntro;

  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const intronail = props.intronail;
  const setIntronail = props.setIntronail;

  const buttonFunction = props.buttonFunction;
  const type = props.type;
  const thumbnailCheck = props.thumbnailCheck;
  const setThumbnailCheck = props.setThumbnailCheck;
  const intronailCheck = props.intronailCheck;
  const setIntronailCheck = props.setIntronailCheck;

  const backServer = process.env.REACT_APP_BACK_SERVER;

  // 섬네일 파일 추가시 동작할 함수
  const changeThumbnail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      if (type === "edit") {
        setThumbnailCheck(1);
      }
      setThumbnail(files[0]); // 전송용 state에 file객체를 세팅
      // 화면에 섬네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setTourImg(reader.result); // 이미지 파일을 읽어와서 섬네일로 설정
      };
    } else {
      setThumbnail(null);
      setTourImg(null);
    }
  };

  const changeIntronail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      if (type === "edit") {
        setIntronailCheck(1);
      }
      setIntronail(files[0]);
      // 화면에 섬네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setTourIntro(reader.result);
      };
    } else {
      setIntronail(null);
      setTourIntro(null);
    }
  };

  return (
    <div className="tour-frm-wrap">
      <div className="tour-frm-top">
        <div className="tour-info">
          <table style={{ width: "90%" }} className="tour-info-tbl">
            <tbody>
              <tr>
                <td style={{ width: "25%" }}>
                  <label htmlFor="tourName">투어 이름</label>
                  <span>*</span>
                </td>
                <td style={{ width: "75%" }}>
                  <Input
                    type="text"
                    data={tourName}
                    setData={setTourName}
                    content="tourName"
                    placeholder="상품명을 입력해주세요."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tourType">투어 유형</label>
                  <span>*</span>
                </td>
                <td>
                  <TypeInput
                    data={tourType}
                    setData={setTourType}
                    content="tourType"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tourAddr">투어 주소</label>
                  <span>*</span>
                </td>
                <td>
                  <Input
                    type="text"
                    data={tourAddr}
                    setData={setTourAddr}
                    content="tourAddr"
                    placeholder="투어 주소를 입력해주세요."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="salesCount">일일 판매수량</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={salesCount}
                    setData={setSalesCount}
                    content="salesCount"
                    placeholder="숫자만 입력해주세요."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="salesPeriod">판매 종료날짜</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={salesPeriod}
                    setData={setSalesPeriod}
                    content="salesPeriod"
                    placeholder="예) 2024-04-17"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tourImg">대표 이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={changeThumbnail}
                    multiple={false}
                  />
                  <div className="tour-thumbnail">
                    {tourImg === null ? (
                      <img alt="기본이미지" src="/images/defaultTour.png" />
                    ) : type === "edit" && thumbnailCheck === 0 ? (
                      <img
                        alt="수정전이미지"
                        src={backServer + "/tour/thumbnail/" + tourImg}
                      />
                    ) : (
                      <img alt="등록한이미지" src={tourImg} />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tourIntro">상품소개 이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="intronail"
                    accept="image/*"
                    onChange={changeIntronail}
                    multiple={false}
                  />
                  <div className="tour-intronail">
                    {tourIntro === null ? (
                      <img src="/images/defaultTour.png" />
                    ) : type === "edit" && intronailCheck === 0 ? (
                      <img src={backServer + "/tour/intronail/" + tourIntro} />
                    ) : (
                      <img src={tourIntro} />
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="tour-frm-btn-box">
        <Button
          class="btn_primary"
          text={type === "edit" ? "수정하기" : "등록하기"}
          clickEvent={buttonFunction}
        />
      </div>
    </div>
  );
};

const TypeInput = (props) => {
  const data = props.data;
  const setData = props.setData;
  const changeTourType = (e) => {
    setData(e.target.value); // 선택한 라디오 버튼의 값으로 상위 컴포넌트의 상태 업데이트
  };
  return (
    <div className="tour-radio-wrap">
      <div>
        <div className="tour-type">
          <input
            type="radio"
            name="tourType"
            id="tourT1"
            value="1"
            onChange={changeTourType}
            checked={data === 1}
          />
          <label htmlFor="tourT1">전시회</label>
          <input
            type="radio"
            name="tourType"
            id="tourT2"
            value="2"
            onChange={changeTourType}
            checked={data === 2}
          />
          <label htmlFor="tourT2">액티비티</label>
          <input
            type="radio"
            name="tourType"
            id="tourT3"
            value="3"
            onChange={changeTourType}
            checked={data === 3}
          />
          <label htmlFor="tourT3">테마파크</label>
          <input
            type="radio"
            name="tourType"
            id="tourT4"
            value="4"
            onChange={changeTourType}
            checked={data === 4}
          />
          <label htmlFor="tourT4">박람회</label>
          <input
            type="radio"
            name="tourType"
            id="tourT5"
            value="5"
            onChange={changeTourType}
            checked={data === 5}
          />
          <label htmlFor="tourT5">입장권</label>
        </div>
      </div>
    </div>
  );
};

export default TourFrm;
