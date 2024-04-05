import { SetDayWrap, ItemTripPlace } from "./CreateTrips";
import { useEffect, useState } from "react";
import { Button, Input, Textarea } from "../../component/FormFrm";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from "../../component/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
const { kakao } = window;

const ModifyTrips = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const tripNo = params.tripNo;

  const [trip, setTrip] = useState({}); //최종 데이터
  const [tripBtnDisabled, setTripBtnDisabled] = useState(true);
  const [tripDetailList, setTripDetailList] = useState([]);
  const [tripTitle, setTripTitle] = useState("");
  const [tripStartDate, setTripStartDate] = useState();
  const [tripEndDate, setTripEndDate] = useState();
  const [tripDays, setTripDays] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchPlaces, setSearchPlaces] = useState("");
  const [openSearchWrap, setOpenSearchWrap] = useState(false);
  const [placeResultList, setPlaceResultList] = useState([]);
  const [detailListNo, setDetailListNo] = useState(-1);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [tripTodo, setTripTodo] = useState("");
  const [todoDayIndex, setTodoDayIndex] = useState(-1);
  const [todoIndex, setTodoIndex] = useState(-1);
  const [tripCost, setTripCost] = useState(0);

  useEffect(() => {
    axios.get(backServer + "/trip/view/" + tripNo)
    .then((res) => {
      console.log(res.data.data);
      setTrip(res.data.data);
      setTripTitle(res.data.data.tripTitle);
      setTripStartDate(dayjs(res.data.data.tripStartDate));
      setTripEndDate(dayjs(res.data.data.tripEndDate));
      setTripDetailList(res.data.data.tripDetailList);
    })
    .catch((res) => {
      console.log(res);
    })
  }, [])
  // console.log(tripStartDate);

  // 제목 수정
  useEffect(() => {
    const tripObj = {tripNo, tripTitle}
    axios.patch(backServer + "/trip", tripObj)
    .then((res) => {
      console.log(res.data);
    })
    .catch((res) => {
      console.log(res);
    })
  }, [tripTitle])

  // 여행 등록하기
  const createTripsFunc = () => {
    if(tripTitle === ""){
      trip.tripTitle = "국내 여행";
      setTripTitle("국내 여행");
    }
    console.log(trip);
    // axios.post(backServer + "/trip", trip)
    // .then((res) => {
    //   if(res.data.message === "success"){
    //     Swal.fire({icon: "success", title: "등록 완료", text: "여행 일정이 등록되었습니다.", confirmButtonText: "닫기"});
    //     navigate("/");
    //   }
    // })
    // .catch((res) => {
    //   console.log(res);
    //   Swal.fire({icon: "warning", text: "문제가 발생했습니다. 잠시 후 다시 시도해주세요.", confirmButtonText: "닫기"})
    // })
  }



  useEffect(() => {
    setTrip({tripTitle: tripTitle, tripStartDate: dayjs(tripStartDate).format("YYYY-MM-DD"), tripEndDate: dayjs(tripEndDate).format("YYYY-MM-DD"), tripDetailListStr: tripDetailList});
  }, [tripTitle, tripStartDate, tripEndDate, tripDetailList])

  const closeTodoModalFunc = () => {
    document.body.classList.remove("scroll_fixed");
    setTripTodo("");
    setOpenTodoModal(false);
  }

  const closeCostModalFunc = () => {
    document.body.classList.remove("scroll_fixed");
    setTripCost("");
    setOpenCostModal(false);
  }

  const addTodoFunc = () => {
    tripDetailList[todoDayIndex].selectPlaceList[todoIndex].tripTodo = tripTodo;
    setTripDetailList([...tripDetailList]);
    setTripTodo("");
    setOpenTodoModal(false);
  }

  const addCostFunc = () => {
    tripDetailList[todoDayIndex].tripCost = tripCost;
    setTripDetailList([...tripDetailList]);
    setTripCost("");
    setOpenCostModal(false);
  }

  const closeSearchWrap = () => {
    setOpenSearchWrap(false);
  }

  const searchFunc = () => {
    if(searchInput !== searchPlaces){
      placeResultList.length = 0;
      setPlaceResultList([...placeResultList]);
    }
    setSearchPlaces(searchInput);
  }

  const searchKeyDownEvnet = (e) => {
    if(e.key === "Enter"){
      searchFunc();
    }
  }

  // 지도
  useEffect(() => {
    // const infowindow = new kakao.maps.InfoWindow({zIndex:1});
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    const placesSearchCB = (data, status, pagination) => {
      placeResultList.length = 0;
      setPlaceResultList([...placeResultList]);

      if(status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        
        data.forEach((place) => {
          if(openSearchWrap){
            displayMarker(place);
          }
          
          placeResultList.push({
            tripPlaceName : place.place_name,
            tripPlaceCategory : place.category_group_name !== "" ? place.category_group_name : place.category_name,
            tripPlaceAddress : place.address_name,
            tripPlacePhone : place.phone,
            tripPlaceLat : place.y,
            tripPlaceLng : place.x
          });
          setPlaceResultList([...placeResultList]);

          bounds.extend(new kakao.maps.LatLng(place.y, place.x));

        })
        
        if(!openSearchWrap){
          tripDetailList.forEach((detail) => {
            detail.selectPlaceList.forEach((place) => {
              // const infowindow = new kakao.maps.InfoWindow({zIndex:1});
              const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.tripPlaceLat, place.tripPlaceLng) 
              });
              // infowindow.setContent("<div class='infowindow'>"+(place.tripRoute+1)+"</div>");
              // infowindow.open(map, marker);
            })
          })
        }
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
    }

  }, [searchPlaces, openSearchWrap, tripDetailList]);

  // datepicker
  useEffect(()=>{
    //dayjs(new Date())
    //tripStartDate.format("YYYY-MM-DD")
    //조건검사(시작날짜,종료날짜 비교하는거, 값이있는지)
    if(tripStartDate && tripEndDate && (dayjs(new Date(tripEndDate.$d.getTime())).format("YYYY-MM-DD") >= dayjs(new Date(tripStartDate.$d.getTime())).format("YYYY-MM-DD"))){
      const copyTripDetailList = tripDetailList.filter((item)=>{
        return item.length !== 0;
      });
      tripDays.length = 0;
      tripDetailList.length = 0;

      const newTripDetailList = new Array();
      const newTripDate = new Array();
      const endDate = tripEndDate.format("YYYY-MM-DD");
      let tripDayCount = 0;
      while(true){
        const tripDate = dayjs(new Date(tripStartDate.$d.getTime()+86400000*tripDayCount)).format("YYYY-MM-DD");
        newTripDate.push(tripDate);
        if(tripDayCount < copyTripDetailList.length){
          if(tripDate === endDate){
            const array = new Array();

            for(let i=tripDayCount;i<copyTripDetailList.length;i++){
              for(let j=0;j<copyTripDetailList[i].selectPlaceList.length;j++){
                array.push(copyTripDetailList[i].selectPlaceList[j]);
              }
            }
            newTripDetailList.push({selectPlaceList : array, tripDay: tripDate});
          }else{
            newTripDetailList.push({selectPlaceList : copyTripDetailList[tripDayCount].selectPlaceList, tripDay: tripDate});
          }
        }else{
          newTripDetailList.push({selectPlaceList: [], tripDay: tripDate});
        }
        if(tripDate === endDate){
          break;
        }
        tripDayCount++;
      }
      setTripDays(newTripDate);
      setTripDetailList(newTripDetailList);
    }
  },[tripStartDate, tripEndDate])
  
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
                    <DatePicker onChange={(newValue)=>{
                      if(tripEndDate != null && dayjs(newValue).format("YYYY-MM-DD") <= dayjs(new Date(tripEndDate.$d.getTime())).format("YYYY-MM-DD")){
                        setTripStartDate(newValue);
                        // console.log(trip);
                      }
                    }} format="YYYY-MM-DD" value={tripStartDate || dayjs(new Date())} disablePast />
                    <DatePicker onChange={(newValue)=>{
                      setTripEndDate(newValue);
                      setTripBtnDisabled(false);
                      // console.log(trip);
                    }} format="YYYY-MM-DD" value={tripEndDate || dayjs(new Date())} disablePast />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="trips_plan_wrap">
              {
                tripDetailList.map((item, index) => {
                  return(
                    <SetDayWrap key={"day" + index} tripDetailItem={item} tripDetailList={tripDetailList} setTripDetailList={setTripDetailList} dayIndex={index} tripDays={tripDays[index]} setOpenSearchWrap={setOpenSearchWrap} openTodoModal={openTodoModal} setOpenTodoModal={setOpenTodoModal} setModalTitle={setModalTitle} setTodoDayIndex={setTodoDayIndex} setTodoIndex={setTodoIndex} setSearchInput={setSearchInput} setTripCost={setTripCost} setOpenCostModal={setOpenCostModal} setDetailListNo={setDetailListNo} setTripTodo={setTripTodo} />
                  );
                })
              }
            </div>
            <div className="btn_area">
              {/* <Button text="여행 등록하기" class="btn_primary" clickEvent={createTripsFunc} disabled={tripBtnDisabled} /> */}
              <Button text="여행 등록하기" class="btn_primary" clickEvent={createTripsFunc} />
            </div>
          </div>

          {
            openSearchWrap ? (
              <div className="search_wrap">
                <div className="search_input_wrap">
                  <div className="search_input">
                    <Input type="text" data={searchInput} setData={setSearchInput} placeholder="여행지나 숙소를 검색해보세요" keyDownEvent={searchKeyDownEvnet} />
                    <button type="button" className="btn_search" onClick={searchFunc}><span className="hidden">검색</span></button>
                  </div>
                </div>
                <div className="search_result_wrap">
                  <div className="result_title">장소</div>
                  <div className="result_place_area">
                    <ul className="place_list">
                      {
                        placeResultList.map((place, index) => {
                          // console.log(place);
                          return(
                            <ItemTripPlace key={"place"+index} tripDetailList={tripDetailList} setTripDetailList={setTripDetailList} place={place} thisIndex={detailListNo} listType="result_items" setOpenSearchWrap={setOpenSearchWrap} tripDays={tripDays} />
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
            ) : ""
          }
          
        </div>

        <div className="map_area" id="map"></div>
      </div>

      <Modal class="modal lg" open={openTodoModal} closeModal={closeTodoModalFunc} title={modalTitle}>
        <Textarea data={tripTodo} setData={setTripTodo} placeholder="할 일을 입력해주세요" />

        <div className="btn_area">
          <Button class="btn_secondary outline" text="취소" clickEvent={closeTodoModalFunc} />
          <Button class="btn_secondary" text="확인" clickEvent={addTodoFunc} />
        </div>
      </Modal>

      <Modal class="modal" open={openCostModal} closeModal={closeCostModalFunc} title={modalTitle} useCloseBtn={true}>
        <Input type="number" data={tripCost} setData={setTripCost} placeholder="비용을 입력해주세요" />

        <div className="btn_area">
          <Button class="btn_secondary" text="확인" clickEvent={addCostFunc} />
        </div>
      </Modal>
      
    </section>
  );
}

export default ModifyTrips;