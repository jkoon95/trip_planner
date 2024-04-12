package kr.or.iei.promotion.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.or.iei.ResponseDTO;
import kr.or.iei.promotion.model.dto.Promotion;
import kr.or.iei.promotion.model.service.PromotionService;
import kr.or.iei.tour.model.dto.TourBook;

@CrossOrigin("*")
@RestController
@RequestMapping("/promotion")
public class PromotionController {
	
	@Autowired
	private PromotionService promotionService;
	
	@GetMapping("/promotionList/{reqPage}")
	public ResponseEntity<ResponseDTO> selectPromotionList(@PathVariable int reqPage) {
		Map map = promotionService.selectPromotionList(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@GetMapping("/promotionList/latest/{reqPage}")
	public ResponseEntity<ResponseDTO> selectPromotionListLatest(@PathVariable int reqPage) {
		Map map = promotionService.selectPromotionListLatest(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@GetMapping("/promotionList/price/{reqPage}")
	public ResponseEntity<ResponseDTO> selectPromotionListPrice(@PathVariable int reqPage) {
		Map map = promotionService.selectPromotionListPrice(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@GetMapping("/promotionList/deadline/{reqPage}")
	public ResponseEntity<ResponseDTO> selectPromotionListDeadline(@PathVariable int reqPage) {
		Map map = promotionService.selectPromotionListDeadline(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
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
}
