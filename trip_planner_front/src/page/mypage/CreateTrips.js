import "./createTrips.css";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Textarea } from "../../component/FormFrm";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from "../../component/Modal";
const { kakao } = window;

const CreateTrips = (props) => {
  const member = props.member;
  const [tripList, setTripList] = useState({}); //최종 데이터
  const [tripDetailList, setTripDetailList] = useState([]);
  const [tripTitle, setTripTitle] = useState("");
  const [tripStartDate, setTripStartDate] = useState(dayjs(new Date()));
  const [tripEndDate, setTripEndDate] = useState();
  const [tripDays, setTripDays] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchPlaces, setSearchPlaces] = useState("");
  const [openSearchWrap, setOpenSearchWrap] = useState(false);
  const [placeResultList, setPlaceResultList] = useState([]);
  const [detailListNo, setDetailListNo] = useState(-1);
  const [tripRoute, setTripRoute] = useState(-1);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [tripTodo, setTripTodo] = useState("");
  const [todoDayIndex, setTodoDayIndex] = useState(-1);
  const [todoIndex, setTodoIndex] = useState(-1);
  const [tripCost, setTripCost] = useState(0);

  useEffect(() => {
    setTripList({memberNo: member.memberNo, tripTitle: tripTitle, tripStartDate: dayjs(tripStartDate).format("YYYY-MM-DD"), tripEndDate: dayjs(tripEndDate).format("YYYY-MM-DD"), tripDetailList: tripDetailList});
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
    setTripTodo("");
    setOpenTodoModal(false);
  }

  const addCostFunc = () => {
    tripDetailList[todoDayIndex].tripCost = tripCost;
    setTripCost("");
    setOpenCostModal(false);
  }

  const closeSearchWrap = () => {
    setOpenSearchWrap(false);
  }

  const searchFunc = () => {
    if(searchInput !== searchPlaces){
      setPlaceResultList([]);
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
        
        data.forEach((place) => {
          // console.log(place);
          if(openSearchWrap){
            displayMarker(place);
          }
          // place.itemType = "tripPlace";
          placeResultList.push(place);
          setPlaceResultList([...placeResultList]);
          bounds.extend(new kakao.maps.LatLng(place.y, place.x));
        })

        map.setBounds(bounds);
      }
    }

    if(searchPlaces !== ""){
      ps.keywordSearch(searchPlaces, placesSearchCB);
    }

    // if(selectPlaceList.length !== 0 && !openSearchWrap){
    //   selectPlaceList.forEach((item) => {
    //     item.forEach((place) => {
    //       new kakao.maps.Marker({
    //         map: map,
    //         position: new kakao.maps.LatLng(place.y, place.x) 
    //       })
    //     })
    //   })
    // }

    const displayMarker = (place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
      });
    }

  }, [searchPlaces, openSearchWrap]);

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
            newTripDetailList.push({selectPlaceList : array});
          }else{
            newTripDetailList.push({selectPlaceList : copyTripDetailList[tripDayCount].selectPlaceList});
          }
        }else{
          newTripDetailList.push({selectPlaceList: []})
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

  // 여행 등록하기
  const createTrips = () => {
    console.log("여행 등록하기!!!");
    console.log(tripList);
  }
  
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
                      if(dayjs(newValue).format("YYYY-MM-DD") <= dayjs(new Date(tripEndDate.$d.getTime())).format("YYYY-MM-DD")){
                        setTripStartDate(newValue);
                      }
                    }} format="YYYY-MM-DD" defaultValue={dayjs(new Date())} disablePast />
                    <DatePicker onChange={(newValue)=>{
                      setTripEndDate(newValue);
                    }} format="YYYY-MM-DD" disablePast />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="trips_plan_wrap">
              {
                tripDetailList.map((item, index) => {
                  return(
                    <SetDayWrap key={"day" + index} tripDetailItem={item} tripDetailList={tripDetailList} setTripDetailList={setTripDetailList} dayIndex={index} tripDays={tripDays[index]} setOpenSearchWrap={setOpenSearchWrap} openTodoModal={openTodoModal} setOpenTodoModal={setOpenTodoModal} setModalTitle={setModalTitle} setTodoDayIndex={setTodoDayIndex} setTodoIndex={setTodoIndex} setSearchInput={setSearchInput} setTripTodo={setTripTodo} setTripCost={setTripCost} setOpenCostModal={setOpenCostModal} setDetailListNo={setDetailListNo} />
                  );
                })
              }
            </div>
            <div className="btn_area">
              <Button text="여행 등록하기" class="btn_primary" clickEvent={createTrips} />
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
  const setTripTodo = props.setTripTodo;
  const setTripCost = props.setTripCost;
  const setOpenCostModal = props.setOpenCostModal;
  const setDetailListNo = props.setDetailListNo;

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
            <button type="button" className="btn_tripCost on" onClick={openCostModalFunc}>{tripDetailItem.tripCost}</button>
          ) : (
            <button type="button" className="btn_tripCost" onClick={openCostModalFunc}>비용 추가</button>
          )
        }
      </div>
      <div className="day_items_wrap">
        <ul className="place_list">
          {
            tripDetailItem.selectPlaceList.map((item, index) => {
              return (
                <ItemTripPlace key={"select" + index} tripDetailList={tripDetailList} setTripDetailList={setTripDetailList} routeIndex={index} thisIndex={dayIndex} place={item} listType="day_items" setOpenTodoModal={setOpenTodoModal} setModalTitle={setModalTitle} setTodoDayIndex={setTodoDayIndex} setTodoIndex={setTodoIndex} setTripTodo={setTripTodo} />
              );
            })
          }
        </ul>
      </div>
      <div className="day_btns_wrap">
        <div className="btn_area">
          <Button text="장소 추가" class="btn_secondary md" clickEvent={openSearchWrapFunc} />
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

  const addPlaceFunc = () => {
    tripDetailList[thisIndex].tripDay = tripDays[thisIndex];
    tripDetailList[thisIndex].selectPlaceList.push({tripPlace: place});
    setTripDetailList([...tripDetailList]);
    setOpenSearchWrap(false);
  }

  const openTodoModalFunc = () => {
    document.body.classList.add("scroll_fixed");
    setModalTitle(place.tripPlace.place_name);
    setTodoDayIndex(thisIndex);
    setTodoIndex(routeIndex);
    setOpenTodoModal(true);
  }
  
  const modifyTodo = () => {
    document.body.classList.add("scroll_fixed");
    setTripTodo(place.tripTodo);
    setModalTitle(place.tripPlace.place_name);
    setTodoDayIndex(thisIndex);
    setTodoIndex(routeIndex);
    setOpenTodoModal(true);
  }

  const deleteTodo = () => {
    tripDetailList[thisIndex].selectPlaceList[routeIndex].tripTodo = "";
    setTripDetailList([...tripDetailList]);
    setTripTodo("");
  }

  return(
    listType === "day_items" ? (
      <>
        <li className="item tripPlace">
          <div className="tripRoute_no">{(routeIndex+1)}</div>
          <div className="item_box">
            <div className="item_box_content">
              <div className="place_name">{place.tripPlace.place_name}</div>
              <div className="place_info">
                <span>{place.tripPlace.category_group_name !== "" ? place.tripPlace.category_group_name : place.tripPlace.category_name}</span>
                <span>{place.tripPlace.address_name}</span>
              </div>
            </div>
            <div className="item_btn_wrap">
              <button type="button" className="btn_changeOrder down"><span className="hidden">내리기</span></button>
              <button type="button" className="btn_changeOrder up"><span className="hidden">올리기</span></button>
            </div>
            {!place.tripTodo ? (
              <div className="btn_area">
                <Button text="할 일 추가" class="btn_secondary outline md" clickEvent={openTodoModalFunc} />
              </div>
            ) : ""}
          </div>
        </li>
        {place.tripTodo ? (
          <li className="item tripTodo">
          <div className="tripRoute_no"></div>
          <div className="item_box">
            <div className="item_box_content" onClick={modifyTodo}>{place.tripTodo}</div>
            <button type="button" className="btn_delete" onClick={deleteTodo}><span className="hidden">삭제</span></button>
          </div>
        </li>
        ) : ""}
      </>
    ) : (
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
    )
  )
}

export default CreateTrips;