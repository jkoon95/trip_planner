package kr.or.iei.promotion.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.or.iei.ResponseDTO;
import kr.or.iei.inn.model.dto.InnFile;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.promotion.model.dto.Promotion;
import kr.or.iei.promotion.model.dto.PromotionFile;
import kr.or.iei.promotion.model.service.PromotionService;
import kr.or.iei.tour.model.dto.TourBook;
import kr.or.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping("/promotion")
public class PromotionController {
	
	@Autowired
	private PromotionService promotionService;
	
	@Value("${file.root}")
	private String root;
	
	@Autowired
	private FileUtils fileUtils;
	
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
	
	@PostMapping("/selectOnePromotion/{promotionNo}")
	public ResponseEntity<ResponseDTO> selectOnePromotion(@PathVariable int promotionNo) {
		Promotion promotion = promotionService.selectOnePromotion(promotionNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", promotion);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}

	@PostMapping("/checkRemainingSeat/{promotionNo}")
	public ResponseEntity<ResponseDTO> checkRemainingSeat(@PathVariable int promotionNo) {
		int remainingSeat = promotionService.checkRemainingSeat(promotionNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", remainingSeat);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@PostMapping("/purchasePromotion/{seat}")
	public ResponseEntity<ResponseDTO> purchasePromotion(@ModelAttribute Member member, @ModelAttribute Promotion promotion,@PathVariable int seat){
		int memberNo = member.getMemberNo();
		int promotionNo = promotion.getPromotionNo();
		int result = promotionService.purchasePromotion(promotionNo, memberNo, seat);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", result);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
		
	}
	
	@PostMapping("/applyPromotion")
	public ResponseEntity<ResponseDTO> applyPromotion(@ModelAttribute Promotion promotion, @ModelAttribute MultipartFile promotionImage, @ModelAttribute MultipartFile promotionFile){
		String savepath = root+"/promotion/";
		
		System.out.println(promotion);
		
		String thumbnailFilepath = fileUtils.upload(savepath, promotionImage);
		
		
		promotion.setPromotionImg(thumbnailFilepath);
		PromotionFile promotionfile = new PromotionFile();
		System.out.println(promotionFile);
		if(promotionFile != null) {
			String filename = promotionFile.getOriginalFilename();
			String filepath = fileUtils.upload(savepath, promotionFile);
			promotionfile.setProFileName(filename);
			promotionfile.setProFilePath(filepath);	
		}
		
		
		int result = promotionService.applyPromotion(promotion,promotionFile);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "faile", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary = "메인 프로모션리스트 호출", description = "메인 프로모션리스트 호출")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping("/main/promotionList")
	public ResponseEntity<ResponseDTO> selectMainPromotionList() {
		List<Promotion> promotionList = promotionService.selectMainPromotionList();
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", promotionList);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}

}
