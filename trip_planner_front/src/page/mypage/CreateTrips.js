import "./createTrips.css";
import { useState } from "react";
import { Button, Input } from "../../component/FormFrm";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateTrips = () => {
  const [tripTitle, setTripTitle] = useState("");
  const [tripStartDate, setTripStartDate] = useState();
  const [tripEndDate, setTripEndDate] = useState();
  const [searchPlace, setSearchPlace] = useState("");
  
  return(
    <section className="contents createTrips">
      <h2 className="hidden">여행 일정 만들기</h2>
      <div className="createTrips_wrap">
        <div className="left_area">
          <div className="trips_wrap">
            <div className="trips_input_wrap">
              <div className="set_title_wrap">
                <Input type="text" data={tripTitle} setData={setTripTitle} placeholder="여행 제목을 입력해주세요" />
              </div>
              <div className="set_date_wrap">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker value={tripStartDate} onChange={(newValue) => setTripStartDate(newValue)} format="YYYY-MM-DD" defaultValue={dayjs(new Date())} />
                    <DatePicker value={tripEndDate} onChange={(newValue) => setTripEndDate(newValue)} format="YYYY-MM-DD" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="trips_plan_wrap">
              <div className="set_day_wrap">
                <div className="day_title_wrap">
                  <div className="day_title">Day 1<span className="tripDay">4.24/수</span></div>
                  <button type="button" className="btn_tripCost">예산 추가</button>
                </div>
                <div className="day_items_wrap">
                  <div className="item tripPlace">
                    <div className="tripRoute_no">1</div>
                    <div className="item_box">
                      <div className="item_box_content">
                        <div className="place_title">부산역</div>
                        <div className="place_info">부산 동구</div>
                      </div>
                      <div className="item_btn_wrap">
                        <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
                        <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="item tripPlace">
                    <div className="tripRoute_no">2</div>
                    <div className="item_box">
                      <div className="item_box_content">
                        <div className="place_title">해운대 해수욕장</div>
                        <div className="place_info">해운대</div>
                      </div>
                      <div className="item_btn_wrap">
                        <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
                        <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="item tripTodo">
                    <div className="tripRoute_no">2</div>
                    <div className="item_box">
                      <div className="item_box_content">할일 메모 메모메모<br /> 할 일<br /> 메모메모</div>
                      <div className="item_btn_wrap">
                        <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
                        <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="day_btns_wrap">
                  <div className="btn_area">
                    <Button text="장소 추가" class="btn_secondary md" />
                    <Button text="할 일 추가" class="btn_secondary outline md" />
                  </div>
                </div>
              </div>

              <div className="set_day_wrap">
                <div className="day_title_wrap">
                  <div className="day_title">Day 2<span className="tripDay">4.25/목</span></div>
                  <button type="button" className="btn_tripCost">예산 추가</button>
                </div>
                <div className="day_items_wrap">
                  <div className="item tripPlace">
                    <div className="tripRoute_no">1</div>
                    <div className="item_box">
                      <div className="item_box_content">
                        <div className="place_title">부산역</div>
                        <div className="place_info">부산 동구</div>
                      </div>
                      <div className="item_btn_wrap">
                        <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
                        <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="item tripPlace">
                    <div className="tripRoute_no">2</div>
                    <div className="item_box">
                      <div className="item_box_content">
                        <div className="place_title">해운대 해수욕장</div>
                        <div className="place_info">해운대</div>
                      </div>
                      <div className="item_btn_wrap">
                        <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
                        <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="item tripTodo">
                    <div className="tripRoute_no">2</div>
                    <div className="item_box">
                      <div className="item_box_content">할일 메모 메모메모<br /> 할 일<br /> 메모메모</div>
                      <div className="item_btn_wrap">
                        <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
                        <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="day_btns_wrap">
                  <div className="btn_area">
                    <Button text="장소 추가" class="btn_secondary md" />
                    <Button text="할 일 추가" class="btn_secondary outline md" />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <Button text="여행 등록하기" class="btn_primary" />
            </div>
          </div>

          <div className="search_wrap">
            <div className="search_input_wrap">
              <Input type="text" data={searchPlace} setData={setSearchPlace} placeholder="여행지나 숙소를 검색해보세요" />
            </div>
            <div className="search_result_wrap">
              <div className="result_place_area">
                <div className="result_title">장소</div>
                <ul className="place_list">
                  <li>
                    여기에 이제.. 장소 정보를..
                  </li>
                </ul>
              </div>
              <div className="result_inns_area">
                <div className="result_title">숙소</div>
                <ul className="inn_list">
                  <li>
                    여기에 이제.. 숙소 정보를..
                  </li>
                </ul>
                <div className="btn_area">
                  <Button text="숙소 검색 결과 더보기" class="btn_primary outline md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="map_area" id="map"></div>
      </div>
    </section>
  );
}

export default CreateTrips;