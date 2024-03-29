package kr.or.iei.tour.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.ResponseDTO;
import kr.or.iei.tour.model.dto.Tour;
import kr.or.iei.tour.model.service.TourService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/tour")
public class TourController {
	@Autowired
	private TourService tourService;
	
//	@PostMapping("/reg")
//	public ResponseEntity<ResponseDTO> insertTour(@ModelAttribute Tour tour, @ModelAttribute MultipartFile thumbnail, @RequestAttribute int partnerNo) {
//		tour.setPartnerNo(partnerNo);
//		String savepath = root+"/tour/";
//		
//	}
}
