package kr.or.iei.mypage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.admin.model.dto.CouponList;
import kr.or.iei.admin.model.service.AdminService;
import kr.or.iei.inn.model.dto.InnReservation;
import kr.or.iei.inn.model.service.InnService;
import kr.or.iei.promotion.model.dto.Promotion;
import kr.or.iei.promotion.model.service.PromotionService;
import kr.or.iei.tour.model.dto.TourBook;
import kr.or.iei.tour.model.service.TourService;

@CrossOrigin("*")
@RestController
@RequestMapping("/mypage")
@Tag(name = "MYPATE", description = "MYPAGE API")
public class MypageController {
	@Autowired InnService innService;
	@Autowired TourService tourService;
	@Autowired PromotionService promotionService;
	@Autowired AdminService adminService;
	
	@Operation(summary = "내 숙소 예약 리스트 조회", description = "내 숙소 예약 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping("/bookInnsList/{bookInnsReqPage}")
	public ResponseEntity<ResponseDTO> selectBookInnsList(@PathVariable int bookInnsReqPage, @RequestAttribute String memberEmail){
		List<InnReservation> bookInnsList = innService.selectBookInnsList(bookInnsReqPage, memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", bookInnsList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "내 투어 예약 리스트 조회", description = "내 투어 예약 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping("/bookTourList/{bookTourReqPage}")
	public ResponseEntity<ResponseDTO> selectBookTourList(@PathVariable int bookTourReqPage, @RequestAttribute String memberEmail){
		List<TourBook> bookTourList = tourService.selectBookTourList(bookTourReqPage, memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", bookTourList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "내 프로모션 예약 리스트 조회", description = "내 프로모션 예약 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping("/bookPromotionList/{bookPromotionReqPage}")
	public ResponseEntity<ResponseDTO> selectBookPromotionList(@PathVariable int bookPromotionReqPage, @RequestAttribute String memberEmail){
		List<Promotion> bookPromotionList = promotionService.selectBookPromotionList(bookPromotionReqPage, memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", bookPromotionList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "내 쿠폰 리스트 조회", description = "내 쿠폰 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@PostMapping("/myCouponList/{reqPage}")
	public ResponseEntity<ResponseDTO> selectMyCouponList(@PathVariable int reqPage, @RequestBody CouponList c, @RequestAttribute String memberEmail){
		List<CouponList> myCouponList = adminService.selectMyCouponList(reqPage, c.getCouponRange(), memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", myCouponList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "내 투어 찜 리스트 조회", description = "내 투어 찜 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping("/likeTourList/{memberNo}")
	public ResponseEntity<ResponseDTO> selectLikeTourList(@PathVariable int memberNo){
		Map map = tourService.selectLikeTourList(memberNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "내 투어 찜 삭제", description = "내 투어 찜 삭제")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@DeleteMapping("/cancelLikeTour/{memberNo}/{tourNo}")
	public ResponseEntity<ResponseDTO> deleteLikeTour(@PathVariable int memberNo, @PathVariable int tourNo){
		int result = tourService.deleteLikeTour(memberNo, tourNo);
		if(result == 1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	@GetMapping("/likeInnList/{memberNo}")
	public ResponseEntity<ResponseDTO> selectLikeInnList(@PathVariable int memberNo){
		List list = innService.selectListInnList(memberNo);
		return null;
	}

}
