import "./createTrips.css";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "../../component/FormFrm";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const { kakao } = window;

const CreateTrips = () => {
  const [tripTitle, setTripTitle] = useState("");
  const [tripStartDate, setTripStartDate] = useState();
  const [tripEndDate, setTripEndDate] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [searchPlaces, setSearchPlaces] = useState("");
  const searchWrapRef = useRef();
  const searchWrapInputRef = useRef();
  const [placeResultList, setPlaceResultList] = useState([]);
  const [selectPlaceList, setSelectPlaceList] = useState([]);
  const [tripRoute, setTripRoute] = useState(0);

  const openSearchWrap = () => {
    searchWrapRef.current.style.display = "flex";
    searchWrapInputRef.current.focus();
  }
  const closeSearchWrap = () => {
    searchWrapRef.current.style.display = "none";
  }
  const searchFunc = () => {
    setPlaceResultList([]);
    setSearchPlaces(searchInput);
  }

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    const placesSearchCB = (data, status, pagination) => {
      if(status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        
        data.forEach((item) => {
          displayMarker(item);
          // console.log(item);
          placeResultList.push(item);
          setPlaceResultList([...placeResultList]);
          bounds.extend(new kakao.maps.LatLng(item.y, item.x));
        })

        map.setBounds(bounds);
      } 
    }

    if(searchPlaces !== ""){
      ps.keywordSearch(searchPlaces, placesSearchCB);
    }

    const displayMarker = (place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
      });
  
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }

  }, [searchPlaces]);

  return (
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
                    <DatePicker value={tripStartDate} onChange={(newValue) => {
                      setTripStartDate(newValue)
                    }} format="YYYY-MM-DD" defaultValue={dayjs(new Date())} />
                    <DatePicker value={tripEndDate} onChange={(newValue) => {
                      setTripEndDate(newValue)
                    }} format="YYYY-MM-DD" />
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
                  <ul className="place_list">
                    {
                      selectPlaceList.map((place, index) => {
                        return(
                          <ItemTripPlace key={"place"+index} place={place} listType="day_items" itemType="tripPlace" tripRoute={index+1} />
                        );
                      })
                    }
                  </ul>
                </div>
                <div className="day_btns_wrap">
                  <div className="btn_area">
                    <Button text="장소 추가" class="btn_secondary md" clickEvent={openSearchWrap} />
                    <Button text="할 일 추가" class="btn_secondary outline md" />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_area">
              <Button text="여행 등록하기" class="btn_primary" />
            </div>
          </div>

          <div className="search_wrap" style={{ display: "none" }} ref={searchWrapRef}>
            <div className="search_input_wrap">
              <div className="search_input">
                <Input type="text" data={searchInput} setData={setSearchInput} placeholder="여행지나 숙소를 검색해보세요" inputRef={searchWrapInputRef} />
                <button type="button" className="btn_search" onClick={searchFunc}><span className="hidden">검색</span></button>
              </div>
            </div>
            <div className="search_result_wrap">
              <div className="result_title">장소</div>
              <div className="result_place_area">
                <ul className="place_list">
                  {
                    placeResultList.map((place, index) => {
                      return(
                        <ItemTripPlace key={"place"+index} place={place} selectPlaceList={selectPlaceList} setSelectPlaceList={setSelectPlaceList} listType="result_items" itemType="tripPlace" />
                      );
                    })
                  }
                </ul>
              </div>
              <div className="result_title">숙소</div>
              <div className="result_inns_area">
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
            <button type="button" className="btn_close" onClick={closeSearchWrap}><span className="hidden">닫기</span></button>
          </div>
        </div>

        <div className="map_area" id="map"></div>
      </div>
    </section>
  );
}

const ItemTripPlace = (props) => {
  const place = props.place;
  const selectPlaceList = props.selectPlaceList;
  const setSelectPlaceList = props.setSelectPlaceList;
  const listType = props.listType;
  const itemType = props.itemType;
  const tripRoute = props.tripRoute;

  const addPlaceFunc = () => {
    setSelectPlaceList([...selectPlaceList, place]);
  }

  return(
    listType === "day_items" && itemType === "tripPlace" ? (
      <li className="item tripPlace">
        <div className="tripRoute_no">{tripRoute}</div>
        <div className="item_box">
          <div className="item_box_content">
            <div className="place_name">{place.place_name}</div>
            <div className="place_info">
              <span>{place.category_group_name !== "" ? place.category_group_name : place.category_name}</span>
              <span>{place.address_name}</span>
            </div>
          </div>
          <div className="item_btn_wrap">
            <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
            <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
          </div>
        </div>
      </li>
    ) : listType === "day_items" && itemType === "tripTodo" ? (
      <li className="item tripTodo">
        <div className="tripRoute_no"></div>
        <div className="item_box">
          <div className="item_box_content">할일 메모 메모메모<br /> 할 일<br /> 메모메모</div>
          <div className="item_btn_wrap">
            <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
            <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
          </div>
        </div>
      </li>
    ) : listType === "result_items" ? (
      <li className="item tripPlace">
        <div className="item_box">
          <div className="item_box_content">
            <div className="place_name">{place.place_name}</div>
            <div className="place_info">
              <span>{place.category_group_name !== "" ? place.category_group_name : place.category_name}</span>
              <span>{place.address_name}</span>
            </div>
            <div className="place_phone">{place.phone}</div>
          </div>
          <div className="item_btn_wrap">
            <Button text="일정 추가" class="btn_primary outline sm btn_addPlace" clickEvent={addPlaceFunc} />
          </div>
        </div>
      </li>
    ) : ""
  )
}

export default CreateTrips;