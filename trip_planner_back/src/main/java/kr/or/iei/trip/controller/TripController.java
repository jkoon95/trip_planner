package kr.or.iei.trip.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.trip.model.dto.Trip;
import kr.or.iei.trip.model.dto.TripDetail;
import kr.or.iei.trip.model.dto.TripPlace;
import kr.or.iei.trip.model.service.TripService;

@CrossOrigin("*")
@RestController
@RequestMapping("/trip")
@Tag(name = "TRIP", description = "TRIP API")
public class TripController {
	@Autowired TripService tripService;
	
	@Operation(summary = "여행 일정 등록", description = "여행 일정 등록")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@PostMapping()
	public ResponseEntity<ResponseDTO> insertTrip(@RequestBody Trip trip, @RequestAttribute String memberEmail) throws JsonMappingException, JsonProcessingException{
		//System.out.println(trip);
		ObjectMapper om = new ObjectMapper();
		List<TripDetail> tripDetailList = new ArrayList<TripDetail>();
		List<LinkedHashMap<String, Object>> list = (List<LinkedHashMap<String, Object>>)om.readValue(trip.getTripDetailListStr(), List.class);
		for(LinkedHashMap<String, Object> map : list) {
			TripDetail tdl = new TripDetail();
			//System.out.println(map);
			String tripDay = (String)map.get("tripDay");
			//System.out.println(tripDay);
			tdl.setTripDay(tripDay);
			String tripCostStr = (String)map.get("tripCost");
			if(tripCostStr != null) {
				tdl.setTripCost(Integer.parseInt(tripCostStr));
			}
			//System.out.println(tdl);
			List<LinkedHashMap<String, Object>> spl = (List<LinkedHashMap<String, Object>>)map.get("selectPlaceList");
			
			List<TripPlace> selectPlaceList = new ArrayList<TripPlace>();
			for(LinkedHashMap<String, Object> data : spl) {
				TripPlace tp = new TripPlace();
				tp.setTripRoute((Integer)data.get("tripRoute"));
				tp.setTripTodo((String)data.get("tripTodo"));
				
//				LinkedHashMap<String, String> tripPlace = (LinkedHashMap<String, String>)data.get("tripPlace");
//				String tripPlaceName = tripPlace.get("tripPlaceName");
//				String tripPlaceCategory = tripPlace.get("tripPlaceCategory");
//				String tripPlaceAddress = tripPlace.get("tripPlaceAddress");
//				String tripPlacePhone = tripPlace.get("tripPlacePhone");
//				String tripPlaceLat = tripPlace.get("tripPlaceLat");
//				String tripPlaceLng = tripPlace.get("tripPlaceLng");
				
				tp.setTripPlaceName((String)data.get("tripPlaceName"));
				tp.setTripPlaceCategory((String)data.get("tripPlaceCategory"));
				tp.setTripPlaceAddress((String)data.get("tripPlaceAddress"));
				tp.setTripPlacePhone((String)data.get("tripPlacePhone"));
				tp.setTripPlaceLat((String)data.get("tripPlaceLat"));
				tp.setTripPlaceLng((String)data.get("tripPlaceLng"));
				
				selectPlaceList.add(tp);
				tdl.setSelectPlaceList(selectPlaceList);
			}
			tripDetailList.add(tdl);
		}
//		System.out.println(tripDetailList);
		int result = tripService.insertTrip(trip, tripDetailList, memberEmail);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary = "여행 일정 리스트 조회", description = "다가오는 여행/지난 여행 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping(value="/list/{reqPage}")
	public ResponseEntity<ResponseDTO> selectMyTripList(@PathVariable int reqPage, @RequestAttribute String memberEmail){
		List<Trip> tripList = tripService.selectMyTripList(reqPage, memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", tripList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "여행 일정 상세 조회", description = "다가오는 여행/지난 여행 상세 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping(value="/view/{tripNo}")
	public ResponseEntity<ResponseDTO> selectOneTrip(@PathVariable int tripNo){
		Trip trip = tripService.selectOneTrip(tripNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", trip);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "여행 일정 상세 trip_tbl 수정", description = "여행 일정 상세 trip_tbl 수정")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@PatchMapping(value="/tripTbl")
	public ResponseEntity<ResponseDTO> updateTrip(@RequestBody Trip trip){
//		System.out.println(trip);
		int result = tripService.updateTrip(trip);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
//	@PatchMapping(value="/tripDetailTbl")
//	public ResponseEntity<ResponseDTO> updateTripDetail(@RequestBody TripDetail tripDetail){
//		
//	}
}






