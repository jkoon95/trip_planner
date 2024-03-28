package kr.or.iei.partner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.ResponseDTO;
import kr.or.iei.partner.model.dto.Partner;
import kr.or.iei.partner.model.service.PartnerService;

@CrossOrigin("*")
@RestController
@RequestMapping("/partner")
public class PartnerController {
	@Autowired
	private PartnerService partnerService;
	
	@GetMapping(value="/{memberNo}")
	public ResponseEntity<ResponseDTO> selectPartner(@PathVariable int memberNo){
		Partner p = partnerService.selectPartner(memberNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", p);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
}
