package kr.or.iei.tour.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
import kr.or.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/tour")
public class TourController {
	@Autowired
	private TourService tourService;
	@Autowired
	private FileUtils fileUtils;
	@Value("${file.root}")
	private String root;
	
	@PostMapping
	public ResponseEntity<ResponseDTO> insertTour(@ModelAttribute Tour tour, @ModelAttribute MultipartFile thumbnail, @ModelAttribute MultipartFile tourIntro, @RequestAttribute int partnerNo) {
		tour.setPartnerNo(partnerNo);
		System.out.println("업체번호 : "+partnerNo);
		
		String savepath = root+"/tour/";
		
		if(thumbnail != null) {
			String filepath = fileUtils.upload(savepath, thumbnail);
			tour.setTourImg(filepath);
		}
		if(tourIntro != null) {
			String intropath = fileUtils.upload(savepath, tourIntro);
			tour.setTourIntro(intropath);
		}
		
		int result = tourService.insertTour(tour);
		if(result == 1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
}
