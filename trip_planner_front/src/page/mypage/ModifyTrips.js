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

const ModifyTrips = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const tripNo = params.tripNo;
  const [modifyMode, setModifyMode] = useState(false);

  const isLogin = props.isLogin;
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      text: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    }).then(navigate("/"));
  }
  const [trip, setTrip] = useState({}); //최종 데이터
  const [tripBtnDisabled, setTripBtnDisabled] = useState(true);
  const [tripDetailList, setTripDetailList] = useState([]);
  const [tripTitleInput, setTripTitleInput] = useState("");
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
  const [datePicker1Disabled, setDatePicker1Disabled] = useState(true);
  const [datePicker2Disabled, setDatePicker2Disabled] = useState(true);
  const [tripTitleInputDisabled, setTripTitleInputDisabled] = useState(true);
  const [btnTripCostDisabled, setBtnTripCostDisabled] = useState(true);
  const [btnChangeOrderDisabled, setBtnChangeOrderDisabled] = useState(true);
  const [btnTodoDisabled, setBtnTodoDisabled] = useState(true);
  const [btnPlaceDisabled, setBtnPlaceDisabled] = useState(true);
  const [btnDeltePlaceDisabled, setBtnDeltePlaceDisabled] = useState(true);
  const [btnModifyText, setBtnModifyText] = useState("수정하기");
  
  useEffect(() => {
    axios.get(backServer + "/trip/view/" + tripNo)
    .then((res) => {
      console.log(res.data.data);
      setTripTitle(res.data.data.tripTitle);
      setTripDetailList(res.data.data.tripDetailList);
      setTripStartDate(dayjs(res.data.data.tripStartDate));
      setTripEndDate(dayjs(res.data.data.tripEndDate));
      setTrip(res.data.data);
    })
    .catch((res) => {
      console.log(res);
    })
  }, [])
  // console.log(tripTitle);

  // 제목 수정
  useEffect(() => {
    if(modifyMode){
      if(tripTitle !== ""){
        const tripObj = {tripNo, tripTitle}
        axios.patch(backServer + "/trip/tripTbl", tripObj)
        .then((res) => {
          console.log("제목 수정 axios!!!!!");
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        })
      }
    }
  }, [tripTitle])


  const tripTitieBlurFunc = () => {
    setTripTitle(tripTitleInput);
  }

  // 여행 수정하기
  const modifyTripsFunc = () => { 
    setDatePicker1Disabled(!datePicker1Disabled);
    setDatePicker2Disabled(!datePicker2Disabled);
    setTripTitleInputDisabled(!tripTitleInputDisabled);
    setBtnTripCostDisabled(!btnTripCostDisabled);
    setBtnChangeOrderDisabled(!btnChangeOrderDisabled);
    setBtnTodoDisabled(!btnTodoDisabled);
    setBtnPlaceDisabled(!btnPlaceDisabled);
    setModifyMode(!modifyMode);
    setBtnDeltePlaceDisabled(!btnDeltePlaceDisabled);
    setBtnModifyText(btnModifyText === "수정하기" ? "수정완료" : "수정하기");
    console.log(tripDetailList);
  }

  // 디테일 수정
  useEffect(() => {
    // trip.tripDetailList = tripDetailList;
    // trip.tripDetailListStr = JSON.stringify(tripDetailList);
    // setTrip({...trip});
    if(modifyMode){

      if(tripDetailList.length != 0){
        const tripObj = {tripNo: tripNo, tripStartDate: trip.tripStartDate, tripEndDate: trip.tripEndDate, tripDetailList: tripDetailList, tripDetailListStr: JSON.stringify(tripDetailList)};
        console.log("디테일이 수정됐다");
        console.log(tripObj);
        axios.patch(backServer + "/trip/tripDetailTbl", tripObj)
        .then((res) => {
          console.log("디테일 수정 axios!!!!!");
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        })
      }
  
      // console.log("트립 디테일 변경!");
    }
  }, [tripDetailList])

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
    console.log(tripDetailList[todoDayIndex].selectPlaceList[todoIndex].tripTodo);
    console.log("todo 수정");
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

  /* 지도(최초 1회만 등록) */
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapRoutes, setMapRoutes] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [mapPs, setMapPs] = useState(null);
  useEffect(() => {
    const container = document.getElementById('map');
    const ps = new kakao.maps.services.Places();

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
    setMap(map);
    setMapPs(ps);
  }, []);

  /* 지도에 표시할 것들 분리 */
  useEffect(() => {
    if(map === null) {
      return;
    }

    // 지도 표시를 위한 영역값
    const bounds = new kakao.maps.LatLngBounds();

    // 담아놓은 여행장소가 하나라도 있으면
    const emptySp = tripDetailList.filter((item) => {
      return item.selectPlaceList.length === 0;
    })
    // 내 장소들 최초 표시
    const linePath = [];
    if(tripDetailList.length !== 0 && emptySp.length !== tripDetailList.length){
      displayMyMarker();
    }
    
    // 장소 검색
    const placesSearchCB = (data, status, pagination) => {
      placeResultList.length = 0;
      setPlaceResultList([...placeResultList]);

      if(status === kakao.maps.services.Status.OK) {
        removeMarker();
        removeInfoWindow();

        if(openSearchWrap){
          data.forEach((place) => {
            displayMarker(place);
            
            placeResultList.push({
              tripPlaceName : place.place_name,
              tripPlaceCategory : place.category_group_name !== "" ? place.category_group_name : place.category_name,
              tripPlaceAddress : place.address_name,
              tripPlacePhone : place.phone,
              tripPlaceLat : place.y,
              tripPlaceLng : place.x
            });
            setPlaceResultList([...placeResultList]);
          })
        }else{
          if(tripDetailList.length !== 0){
            displayMyMarker();
          }
        }
      }
    }

    if(searchPlaces !== "") {
      mapPs.keywordSearch(searchPlaces, placesSearchCB);
    }

    // 검색한 장소 마커와 인포윈도우
    const displayMarker = (place) => {
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
      });
      markers.push(marker);
      setMarkers([...markers]);
        
      const infoWindow = new kakao.maps.CustomOverlay({
        zIndex: 2,
        yAnchor: 1
      });
      infoWindows.push(infoWindow);
      setInfoWindows([...infoWindows]);

      kakao.maps.event.addListener(marker, 'click', function() {
        marker.setClickable(true);
        let infoWindowStr = [
          "<div class='infoWindow'>",
            "<div class='item_box'>",
              "<div class='item_box_content'>",
                "<div class='place_name'>"+place.place_name+"</div>",
                "<div class='place_info'>",
                  "<span>"+place.category_group_name+"</span>",
                  "<span>"+place.address_name+"</span>",
                "</div>",
                "<div class='place_phone'>"+place.phone+"</div>",
              "</div>",
            "</div>",
          "</div>"
        ].join("");
        infoWindow.setContent(infoWindowStr);
        infoWindow.setPosition(new kakao.maps.LatLng(place.y, place.x));
        for (let i=0; i<infoWindows.length; i++) {
          infoWindows[i].setMap(null);
        }
        infoWindow.setMap(map);
        map.setCenter(new kakao.maps.LatLng(place.y, place.x));
      });

      // kakao.maps.event.addListener(marker, 'custom_action', function(data){
      //   console.log(data + '가 발생했습니다.');
      // });
      // kakao.maps.event.trigger(marker, 'custom_action', '내 이벤트');

      map.setBounds(bounds);
    }

    // 내 장소 마커, 루트, 인포윈도우
    function displayMyMarker() {
      removeMarker();
      removeMapRoute();
      removeInfoWindow();
      linePath.length = 0;
      
      tripDetailList.forEach((detail) => {
        
        detail.selectPlaceList.forEach((place) => {
          bounds.extend(new kakao.maps.LatLng(place.tripPlaceLat, place.tripPlaceLng));

          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.tripPlaceLat, place.tripPlaceLng) 
          });
          markers.push(marker);
          setMarkers([...markers]);

          const infoWindow = new kakao.maps.CustomOverlay({
            zIndex: 2,
            yAnchor: 1
          });
          infoWindows.push(infoWindow);
          setInfoWindows([...infoWindows]);

          const mapRoute = new kakao.maps.CustomOverlay({
            map: map,
            position: new kakao.maps.LatLng(place.tripPlaceLat, place.tripPlaceLng),
            content: "<div class='map_route'>"+(place.tripRoute+1)+"</div>",
            yAnchor: 1,
            zIndex: 3,
            clickable: true
          });

          mapRoutes.push(mapRoute);
          setMapRoutes([...mapRoutes]);
            
          kakao.maps.event.addListener(marker, 'click', function() {
            const tripPlacePhone = place.tripPlacePhone ? place.tripPlacePhone : "";
            const tripPlaceCategory = place.tripPlaceCategory ? place.tripPlaceCategory : "";
            let infoWindowStr = [
              "<div class='infoWindow'>",
                "<div class='item_box'>",
                  "<div class='item_box_content'>",
                    "<div class='place_name'>"+place.tripPlaceName+"</div>",
                    "<div class='place_info'>",
                      "<span>"+tripPlaceCategory+"</span>",
                      "<span>"+place.tripPlaceAddress+"</span>",
                    "</div>",
                    "<div class='place_phone'>"+tripPlacePhone+"</div>",
                  "</div>",
                "</div>",
              "</div>"
            ].join("");
            infoWindow.setContent(infoWindowStr);
            infoWindow.setPosition(new kakao.maps.LatLng(place.tripPlaceLat, place.tripPlaceLng));
            for (let i=0; i<infoWindows.length; i++) {
              infoWindows[i].setMap(null);
            }
            infoWindow.setMap(map);
          });

          // 장소에 이을 선 좌표 배열 추가
          linePath.push(new kakao.maps.LatLng(place.tripPlaceLat, place.tripPlaceLng));
        })

      })

      // 선 생성
      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#E9511C',
        strokeOpacity: 0.2,
        strokeStyle: 'dashed'
      });
      // 선 표시
      polyline.setMap(map);  
      map.setBounds(bounds);
    }

    function removeMarker(){
      for(let i=0; i<markers.length; i++) {
        markers[i].setMap(null);
      }   
      markers.length = 0;
    }

    function removeMapRoute(){
      for (let i=0; i<mapRoutes.length; i++) {
        mapRoutes[i].setMap(null);
      }   
      mapRoutes.length = 0;
    }

    function removeInfoWindow(){
      for (let i=0; i<infoWindows.length; i++) {
        infoWindows[i].setMap(null);
      }   
      infoWindows.length = 0;
    }

  }, [map, trip, openSearchWrap, searchPlaces])

  /* datepicker */
  useEffect(()=>{
    //dayjs(new Date())
    //tripStartDate.format("YYYY-MM-DD")
    //조건검사(시작날짜,종료날짜 비교하는거, 값이있는지)
    // console.log(tripDetailList);

    if(tripStartDate && tripEndDate && new Date(tripEndDate.$d.getTime()) >= new Date(tripStartDate.$d.getTime())){
      trip.tripStartDate = tripStartDate;
      trip.tripEndDate = tripEndDate;

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
          if(tripDate === endDate){//마지막 바퀴에선 마지막 날짜에 사라진 날짜의 selectPlaceList를 추가
            const array = new Array();

            for(let i=tripDayCount;i<copyTripDetailList.length;i++){
              for(let j=0;j<copyTripDetailList[i].selectPlaceList.length;j++){
                copyTripDetailList[i].selectPlaceList[j].oldTripDay = copyTripDetailList[i].selectPlaceList[j].tripDay;
                array.push(copyTripDetailList[i].selectPlaceList[j]);
              }
            }

            if(copyTripDetailList[tripDayCount]){
              newTripDetailList.push({tripDetailNo: copyTripDetailList[tripDayCount].tripDetailNo, tripNo: copyTripDetailList[tripDayCount].tripNo, selectPlaceList : array, tripDay: tripDate, tripCost: copyTripDetailList[tripDayCount].tripCost});
            }else{
              newTripDetailList.push({selectPlaceList : array, tripDay: tripDate});
            }
          }else{
            if(copyTripDetailList[tripDayCount]){
              newTripDetailList.push({tripDetailNo: copyTripDetailList[tripDayCount].tripDetailNo, tripNo: copyTripDetailList[tripDayCount].tripNo, selectPlaceList : copyTripDetailList[tripDayCount].selectPlaceList, tripDay: tripDate, tripCost: copyTripDetailList[tripDayCount].tripCost});
            }else{
              newTripDetailList.push({selectPlaceList : copyTripDetailList[tripDayCount].selectPlaceList, tripDay: tripDate});
            }
          }
        }else{
          if(copyTripDetailList[tripDayCount]){
            newTripDetailList.push({tripDetailNo: copyTripDetailList[tripDayCount].tripDetailNo, tripNo: copyTripDetailList[tripDayCount].tripNo, selectPlaceList : [], tripDay: tripDate, tripCost: copyTripDetailList[tripDayCount].tripCost});
          }else{
            newTripDetailList.push({selectPlaceList: [], tripDay: tripDate});
          }
        }
        if(tripDate === endDate){
          break;
        }
        tripDayCount++;
      }
      setTripDays(newTripDate);
      setTripDetailList(newTripDetailList);
      trip.tripDetailList = [...newTripDetailList];
      setTrip({...trip});

      if(trip.tripStartDate !== dayjs(tripStartDate).format("YYYY-MM-DD")){
        console.log("시작 날짜 변경");
        trip.tripStartDate = dayjs(tripStartDate).format("YYYY-MM-DD");
      }
      if(trip.tripEndDate !== dayjs(tripEndDate).format("YYYY-MM-DD")){
        console.log("종료 날짜 변경");
        trip.tripEndDate = dayjs(tripEndDate).format("YYYY-MM-DD");
      }

      const tripObj = {tripNo: tripNo, tripStartDate: trip.tripStartDate, tripEndDate: trip.tripEndDate};
      
      if(modifyMode){
        console.log("날짜 수정 여기용");
        console.log(tripObj);

        axios.patch(backServer + "/trip/tripTbl", tripObj)
        .then((res) => {
          console.log("날짜 수정 axios!!!!!");
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        })
      }

    }
  },[tripStartDate, tripEndDate])

  return (
    <section className="contents trips">
      <h2 className="hidden">여행 일정 수정</h2>
      <div className="createTrips_wrap">
        <div className="left_area">
          <div className="trips_wrap">
            <div className="trips_input_wrap">
              <div className="set_title_wrap">
                <Input type="text" disabled={tripTitleInputDisabled} data={tripTitleInput === "" ? tripTitle : ""} setData={setTripTitleInput} placeholder="여행 제목을 입력해주세요" blurEvent={tripTitieBlurFunc} />
              </div>
              <div className="set_date_wrap">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker disabled={datePicker1Disabled} onChange={(newValue)=>{
                      if(tripEndDate != null && dayjs(newValue).format("YYYY-MM-DD") <= dayjs(new Date(tripEndDate.$d.getTime())).format("YYYY-MM-DD")){
                        setTripStartDate(newValue);
                        // console.log(trip);
                      }
                    }} format="YYYY-MM-DD" value={tripStartDate || dayjs(new Date())} disablePast />
                    <DatePicker disabled={datePicker2Disabled} onChange={(newValue)=>{
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
                    <SetDayWrap key={"day" + index} tripDetailItem={item} tripDetailList={tripDetailList} setTripDetailList={setTripDetailList} dayIndex={index} tripDays={tripDays[index]} setOpenSearchWrap={setOpenSearchWrap} openTodoModal={openTodoModal} setOpenTodoModal={setOpenTodoModal} setModalTitle={setModalTitle} setTodoDayIndex={setTodoDayIndex} setTodoIndex={setTodoIndex} setSearchInput={setSearchInput} setTripCost={setTripCost} setOpenCostModal={setOpenCostModal} setDetailListNo={setDetailListNo} setTripTodo={setTripTodo} btnTripCostDisabled={btnTripCostDisabled} btnChangeOrderDisabled={btnChangeOrderDisabled} btnTodoDisabled={btnTodoDisabled} btnPlaceDisabled={btnPlaceDisabled} btnDeltePlaceDisabled={btnDeltePlaceDisabled}/>
                  );
                })
              }
            </div>
            <div className="btn_area">
              {/* <Button text="여행 등록하기" class="btn_primary" clickEvent={createTripsFunc} disabled={tripBtnDisabled} /> */}
              <Button text={btnModifyText} class="btn_primary" clickEvent={modifyTripsFunc} />
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

const SetDayWrap = (props) => {
  const tripDetailItem = props.tripDetailItem;
  const tripDetailList = props.tripDetailList;
  const setTripDetailList = props.setTripDetailList;
  const dayIndex = props.dayIndex;
  const tripDays = props.tripDays;
  const setOpenSearchWrap = props.setOpenSearchWrap;
  const setOpenTodoModal = props.setOpenTodoModal;
  const setModalTitle = props.setModalTitle;
  const setTodoDayIndex = props.setTodoDayIndex;
  const setTodoIndex = props.setTodoIndex;
  const setSearchInput = props.setSearchInput;
  const setTripCost = props.setTripCost;
  const setOpenCostModal = props.setOpenCostModal;
  const setDetailListNo = props.setDetailListNo;
  const setTripTodo = props.setTripTodo;
  const btnTripCostDisabled = props.btnTripCostDisabled;
  const btnChangeOrderDisabled = props.btnChangeOrderDisabled
  const btnTodoDisabled = props.btnTodoDisabled;
  const btnPlaceDisabled = props.btnPlaceDisabled;
  const btnDeltePlaceDisabled = props.btnDeltePlaceDisabled;

  const openSearchWrapFunc = () => {
    setOpenSearchWrap(true);
    setDetailListNo(dayIndex);
    setSearchInput("");
  }

  const openCostModalFunc = () => {
    document.body.classList.add("scroll_fixed");
    setModalTitle("Day "+(dayIndex+1));
    setTodoDayIndex(dayIndex);
    setTripCost(tripDetailItem.tripCost);
    setOpenCostModal(true);
  }

  // console.log(dayIndex, tripDetailList[dayIndex]);

  return(
    <div className="set_day_wrap">
      <div className="day_title_wrap">
        <div className="day_title">Day {dayIndex+1}<span className="tripDay">{tripDays}</span></div>
        {
          tripDetailItem.tripCost ? (
            <button disabled={btnTripCostDisabled} type="button" className="btn_tripCost on" onClick={openCostModalFunc}>{tripDetailItem.tripCost}</button>
          ) : (
            <button disabled={btnTripCostDisabled} type="button" className="btn_tripCost" onClick={openCostModalFunc}>비용 추가</button>
          )
        }
      </div>
      <div className="day_items_wrap">
        <ul className="place_list">
          {
            tripDetailItem.selectPlaceList.map((item, index) => {
              if(item.delNo === 1){
                item.tripRoute = -1
              }else{
                item.tripRoute = index;
                item.delNo = -1;
              }
              item.tripDay = tripDetailItem.tripDay;
              return (
                <ItemTripPlace key={"select" + index} tripDetailList={tripDetailList} setTripDetailList={setTripDetailList} routeIndex={index} thisIndex={dayIndex} place={item} listType="day_items" setOpenTodoModal={setOpenTodoModal} setModalTitle={setModalTitle} setTodoDayIndex={setTodoDayIndex} setTodoIndex={setTodoIndex} setTripTodo={setTripTodo} btnChangeOrderDisabled={btnChangeOrderDisabled} btnTodoDisabled={btnTodoDisabled} btnDeltePlaceDisabled={btnDeltePlaceDisabled}/>
              );
            })
          }
        </ul>
      </div>
      <div className="day_btns_wrap">
        <div className="btn_area">
          <Button disabled={btnPlaceDisabled} text="장소 추가" class="btn_secondary md" clickEvent={openSearchWrapFunc} />
        </div>
      </div>
    </div>
  );
}

const ItemTripPlace = (props) => {
  const tripDetailList = props.tripDetailList;
  const setTripDetailList = props.setTripDetailList;
  const routeIndex = props.routeIndex;
  const thisIndex = props.thisIndex;
  const place = props.place;
  const listType = props.listType;
  const setOpenTodoModal = props.setOpenTodoModal;
  const setModalTitle = props.setModalTitle;
  const setTodoDayIndex = props.setTodoDayIndex;
  const setTodoIndex = props.setTodoIndex;
  const setOpenSearchWrap = props.setOpenSearchWrap;
  const setTripTodo = props.setTripTodo;
  const tripDays = props.tripDays;
  const btnChangeOrderDisabled = props.btnChangeOrderDisabled;
  const btnTodoDisabled = props.btnTodoDisabled;
  const btnDeltePlaceDisabled = props.btnDeltePlaceDisabled;

  const addPlaceFunc = () => {
    tripDetailList[thisIndex].tripDay = tripDays[thisIndex];
    tripDetailList[thisIndex].selectPlaceList.push({...place, tripDay: tripDays[thisIndex], delNo: -1, tripDetailNo: 0});
    setTripDetailList([...tripDetailList]);
    setOpenSearchWrap(false);
  }

  const openTodoModalFunc = () => {
    document.body.classList.add("scroll_fixed");
    setModalTitle(place.tripPlaceName);
    setTodoDayIndex(thisIndex);
    setTodoIndex(routeIndex);
    setOpenTodoModal(true);
  }
  
  const modifyTodo = () => {
    document.body.classList.add("scroll_fixed");
    setTripTodo(place.tripTodo);
    setModalTitle(place.tripPlaceName);
    setTodoDayIndex(thisIndex);
    setTodoIndex(routeIndex);
    setOpenTodoModal(true);
  }

  const deleteTodo = () => {
    tripDetailList[thisIndex].selectPlaceList[routeIndex].tripTodo = "";
    setTripDetailList([...tripDetailList]);
    setTripTodo("");
  }

  const deletePlace = () => {
    console.log(routeIndex);
    // tripDetailList[thisIndex].selectPlaceList.splice(routeIndex, 1);
    tripDetailList[thisIndex].selectPlaceList[routeIndex].delNo = 1;
    if(routeIndex > 0){
      tripDetailList[thisIndex].selectPlaceList[routeIndex-1].oldTripRoute = tripDetailList[thisIndex].selectPlaceList[routeIndex-1].tripRoute;
    }else{
      if(tripDetailList[thisIndex].selectPlaceList[routeIndex+1]){
        tripDetailList[thisIndex].selectPlaceList[routeIndex+1].oldTripRoute = tripDetailList[thisIndex].selectPlaceList[routeIndex+1].tripRoute
      }
      // console.log(tripDetailList[thisIndex]);
      // console.log(tripDetailList[thisIndex].selectPlaceList[routeIndex+1]);
      // console.log(tripDetailList[thisIndex].selectPlaceList[routeIndex+1].oldTripRoute);
      // console.log(tripDetailList[thisIndex].selectPlaceList[routeIndex+1].tripRoute);
      // tripDetailList[thisIndex].selectPlaceList[routeIndex+1].oldTripRoute = tripDetailList[thisIndex].selectPlaceList[routeIndex+1].tripRoute;
    }
    const delItem = tripDetailList[thisIndex].selectPlaceList.splice(routeIndex, 1);
    tripDetailList[thisIndex].selectPlaceList.push(...delItem);
    setTripDetailList([...tripDetailList]);
  }

  const tripRouteDown = () => {
    for(let i=0;i<tripDetailList[thisIndex].selectPlaceList.length;i++){
      tripDetailList[thisIndex].selectPlaceList[i].oldTripRoute = tripDetailList[thisIndex].selectPlaceList[i].tripRoute;
    }
    const thisItem = tripDetailList[thisIndex].selectPlaceList.splice(routeIndex, 1);
    tripDetailList[thisIndex].selectPlaceList.splice(routeIndex+1,0,thisItem[0]);
    setTripDetailList([...tripDetailList]);
    console.log("routeDown");
    console.log(tripDetailList);
  }

  const tripRouteUp = () => {
    for(let i=0;i<tripDetailList[thisIndex].selectPlaceList.length;i++){
      tripDetailList[thisIndex].selectPlaceList[i].oldTripRoute = tripDetailList[thisIndex].selectPlaceList[i].tripRoute;
    }
    const thisItem = tripDetailList[thisIndex].selectPlaceList.splice(routeIndex, 1);
    let newIndex = routeIndex-1;
    if(routeIndex === 0){
      newIndex = 0
    }
    tripDetailList[thisIndex].selectPlaceList.splice(newIndex,0,thisItem[0]);
    setTripDetailList([...tripDetailList]);
    console.log("routeUp");
    console.log(tripDetailList);
  }
  // console.log(tripDetailList[thisIndex])

  return(
    listType === "day_items" ? (
      <>
        {place.delNo !== 1 ? (
          <li className="item tripPlace">
            <div className="tripRoute_no">{(routeIndex+1)}</div>
            <div className="item_box">
              <div className="item_box_content">
                <div className="place_name">{place.tripPlaceName}</div>
                <div className="place_info">
                  <span>{place.tripPlaceCategory}</span>
                  <span>{place.tripPlaceAddress}</span>
                </div>
              </div>
              <div className="item_btn_wrap">
                {
                  tripDetailList[thisIndex].selectPlaceList.length > 1 && routeIndex === 0 ? (
                    <button disabled={btnChangeOrderDisabled} type="button" className="btn_changeOrder down" onClick={tripRouteDown}><span className="hidden">내리기</span></button>
                  ) : tripDetailList[thisIndex].selectPlaceList.length > 1 && routeIndex === tripDetailList[thisIndex].selectPlaceList.length - 1 ? (
                    <button disabled={btnChangeOrderDisabled} type="button" className="btn_changeOrder up" onClick={tripRouteUp}><span className="hidden">올리기</span></button>
                  ) : tripDetailList[thisIndex].selectPlaceList.length > 1 ? (
                    <>
                      <button disabled={btnChangeOrderDisabled} type="button" className="btn_changeOrder down" onClick={tripRouteDown}><span className="hidden">내리기</span></button>
                      <button disabled={btnChangeOrderDisabled} type="button" className="btn_changeOrder up" onClick={tripRouteUp}><span className="hidden">올리기</span></button>
                    </>
                  ) : ""
                }
              </div>
              {!place.tripTodo ? (
                <div className="btn_area">
                  <Button disabled={btnTodoDisabled} text="할 일 추가" class="btn_secondary outline md" clickEvent={openTodoModalFunc} />
                </div>
              ) : ""}
              <button disabled={btnDeltePlaceDisabled} type="button" className="btn_delete" onClick={deletePlace}><span className="hidden">삭제</span></button>
            </div>
          </li>
          ) : ""
        }
        {place.delNo !== 1 && place.tripTodo ? (
          <li className="item tripTodo">
          <div className="tripRoute_no"></div>
          <div className="item_box">
            <div className="item_box_content" onClick={modifyTodo}>{place.tripTodo}</div>
            <button disabled={btnDeltePlaceDisabled} type="button" className="btn_delete" onClick={deleteTodo}><span className="hidden">삭제</span></button>
          </div>
        </li>
        ) : ""}
      </>
    ) : (
      <li className="item tripPlace">
        <div className="item_box">
          <div className="item_box_content">
            <div className="place_name">{place.tripPlaceName}</div>
            <div className="place_info">
              <span>{place.tripPlaceCategory}</span>
              <span>{place.tripPlaceAddress}</span>
            </div>
            <div className="place_phone">{place.tripPlacePhone}</div>
          </div>
          <div className="item_btn_wrap">
            <Button text="일정 추가" class="btn_primary outline sm btn_addPlace" clickEvent={addPlaceFunc} />
          </div>
        </div>
      </li>
    )
  )
}

export default ModifyTrips;