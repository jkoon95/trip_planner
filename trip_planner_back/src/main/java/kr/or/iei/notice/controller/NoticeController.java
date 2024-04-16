package kr.or.iei.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.ResponseDTO;
import kr.or.iei.notice.model.dto.Notice;
import kr.or.iei.notice.model.service.NoticeService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping(value="/list/{reqPage}")
	public ResponseEntity<ResponseDTO> noticeList(@PathVariable int reqPage) {
		Map map = noticeService.selectNoticeList(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@PostMapping(value="selectOneNotice/{noticeNo}")
	public ResponseEntity<ResponseDTO> selectOneNotice(@PathVariable int noticeNo){
		Notice notice = noticeService.selectOneNotice(noticeNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", notice);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@DeleteMapping(value="deleteNotice/{noticeNo}")
	public ResponseEntity<ResponseDTO> deleteNotice(@PathVariable int noticeNo) {
		int result = noticeService.deleteNotice(noticeNo);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
		
	}
	
	@PostMapping(value="/write")
	public ResponseEntity<ResponseDTO> writeNotice(@ModelAttribute Notice notice) {
		System.out.println(notice);
		int result = noticeService.writeNotice(notice);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
		
	}
	
}
