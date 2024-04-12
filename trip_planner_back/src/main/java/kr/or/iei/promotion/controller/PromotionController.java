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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.ResponseDTO;
import kr.or.iei.promotion.model.dto.Promotion;
import kr.or.iei.promotion.model.service.PromotionService;

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
	
	@GetMapping("/promotionList/region/{reqPage}")
	public ResponseEntity<ResponseDTO> selectPromotionListRegion(@PathVariable int reqPage) {
		Map map = promotionService.selectPromotionListRegion(reqPage);
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
	
	/*
	@GetMapping("/promotionList/search/{reqPage}")
	public ResponseEntity<ResponseDTO> selectPromotionListSearch(@PathVariable int reqPage, @RequestParam String keyword){
		Map map = promotionService.selectPromotionListSearch(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	*/
	
	@GetMapping("/selectOnePromotion")
	public ResponseEntity<ResponseDTO> selectOnePromotion(@PathVariable int promotionNo) {
		Promotion promotion = promotionService.selectOnePromotion(promotionNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", promotion);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
}
