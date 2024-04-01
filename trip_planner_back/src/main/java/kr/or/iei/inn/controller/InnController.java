package kr.or.iei.inn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.ResponseDTO;
import kr.or.iei.inn.model.dto.Inn;
import kr.or.iei.inn.model.service.InnService;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.util.FileUtils;

@RestController
@RequestMapping("/inn")
@CrossOrigin("*")
public class InnController {
	@Autowired
	private InnService innService;
	@Autowired
	private FileUtils fileUtils;
	
	
	@PostMapping("/innReg")
	public ResponseEntity<ResponseDTO> insertInn(@ModelAttribute Inn inn, @ModelAttribute MultipartFile[] innFile, @RequestBody Member member){
		
	}
	
	
	@GetMapping("/roomOption")
	public ResponseEntity<ResponseDTO> selectRoomOption(){
		List list = innService.selectRoomOption();
		if(!list.isEmpty()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", list);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
}
