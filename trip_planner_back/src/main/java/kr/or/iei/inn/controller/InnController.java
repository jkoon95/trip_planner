package kr.or.iei.inn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.ResponseDTO;
import kr.or.iei.inn.model.dto.Inn;
import kr.or.iei.inn.model.service.InnService;
import kr.or.iei.util.FileUtils;

@RestController
@RequestMapping("/inn")
@CrossOrigin("*")
public class InnController {
	@Autowired
	private InnService innService;
	@Autowired
	private FileUtils fileUtils;
	
	/*@PostMapping("/innReg")
	public ResponseEntity<ResponseDTO> insertInn(@ModelAttribute Inn inn, @ModelAttribute MultipartFile[] innFile){
		
	}
	*/
}
