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

const ModifyTrips = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const tripNo = params.tripNo;

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

  
  useEffect(() => {
    axios.get(backServer + "/trip/view/" + tripNo)
    .then((res) => {
      // console.log(res.data.data);
      setTripDetailList(res.data.data.tripDetailList);
      setTripStartDate(dayjs(res.data.data.tripStartDate));
      setTripEndDate(dayjs(res.data.data.tripEndDate));
      // setTrip(res.data.data);
    })
    .catch((res) => {
      console.log(res);
    })
  }, [])
  // console.log(tripTitle);

  // 제목 수정
  useEffect(() => {
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
  }, [tripTitle])


  const tripTitieBlurFunc = () => {
    setTripTitle(tripTitleInput);
  }

  // 여행 등록하기
  const createTripsFunc = () => {
    // if(tripTitle === ""){
    //   trip.tripTitle = "국내 여행";
    //   setTripTitle("국내 여행");
    // }
    console.log(trip);
    // console.log(tripDetailList);
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


  // 수정 시점..
  useEffect(() => {
    // console.log("trip에 저장된 tripStartDate: "+trip.tripStartDate);
    // console.log("아마도 변경한 tripStartDate: "+dayjs(tripStartDate).format("YYYY-MM-DD"));
    // console.log("trip에 저장된 tripEndDate: "+trip.tripEndDate);
    // console.log("아마도 변경한 tripEndDate: "+dayjs(tripEndDate).format("YYYY-MM-DD"));

    
    trip.tripDetailList = tripDetailList;
    trip.tripDetailListStr = JSON.stringify(tripDetailList);
    setTrip({...trip});
    // console.log(trip);

    // const tripObj = {tripNo: tripNo, tripDetailListStr: trip.tripDetailListStr};
    // axios.patch(backServer + "/trip/tripDetailTbl", tripObj)
    // .then((res) => {
    //   console.log("디테일 수정 axios!!!!!");
    //   console.log(res.data);
    // })
    // .catch((res) => {
    //   console.log(res);
    // })

    // console.log("트립 디테일 변경! 이걸로 모든 걸 제어할 수 있을까? 아니.");
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

    if(tripStartDate && tripEndDate && (dayjs(new Date(tripEndDate.$d.getTime())).format("YYYY-MM-DD") >= dayjs(new Date(tripStartDate.$d.getTime())).format("YYYY-MM-DD"))){
      const copyTripDetailList = tripDetailList.filter((item)=>{
        return item.length !== 0;
      });
      // console.log(copyTripDetailList);
      tripDays.length = 0;
      tripDetailList.length = 0;

      // const newTripDetailList = new Array();
      
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

      if(trip.tripStartDate !== dayjs(tripStartDate).format("YYYY-MM-DD")){
        console.log("시작 날짜 변경");
        trip.tripStartDate = dayjs(tripStartDate).format("YYYY-MM-DD");
      }
      if(trip.tripEndDate !== dayjs(tripEndDate).format("YYYY-MM-DD")){
        console.log("종료 날짜 변경");
        trip.tripEndDate = dayjs(tripEndDate).format("YYYY-MM-DD");
      }

      console.log(newTripDetailList);
  
      // const tripObj = {tripNo: tripNo, tripStartDate: trip.tripStartDate, tripEndDate: trip.tripEndDate};
      // axios.patch(backServer + "/trip/tripTbl", tripObj)
      // .then((res) => {
      //   console.log("날짜 수정 axios!!!!!");
      //   console.log(res.data);

      //   tripObj.tripDetailListStr = JSON.stringify(newTripDetailList);
      //   axios.patch(backServer + "/trip/tripDetailTbl", tripObj)
      //   .then((res) => {
      //     console.log("디테일 수정 axios!!!!!");
      //     console.log(res.data);
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //   })

      // })
      // .catch((res) => {
      //   console.log(res);
      // })

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
                <Input type="text" data={tripTitleInput} setData={setTripTitleInput} placeholder="여행 제목을 입력해주세요" blurEvent={tripTitieBlurFunc} />
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