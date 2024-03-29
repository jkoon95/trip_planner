import { useState } from "react";
import { Button, Input } from "../../component/FormFrm";

const CreateTrips = () => {
  const [tripTitle, setTripTitle] = useState("");

  return(
    <section className="contents createTrips">
      <h2 className="hidden">여행 일정 만들기</h2>
      <div className="createTrips_wrap">
        <div className="left_area">
          <div className="trips_wrap">
            <div className="trips_input_wrap">
              <div className="input_item">
                <Input type="text" data={tripTitle} setData={setTripTitle} placeholder="여행 제목을 입력해주세요" />
              </div>
              
            </div>
            <div className="btn_area">
              <Button text="여행 등록하기" />
            </div>
          </div>
          <div className="search_wrap">
            
          </div>
        </div>
        <div className="map_area" id="map"></div>
      </div>
    </section>
  );
}

export default CreateTrips;