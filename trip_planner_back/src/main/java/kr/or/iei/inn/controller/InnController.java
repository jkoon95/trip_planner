package kr.or.iei.inn.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.ResponseDTO;
import kr.or.iei.inn.model.dto.Inn;
import kr.or.iei.inn.model.dto.InnFile;
import kr.or.iei.inn.model.dto.Option;
import kr.or.iei.inn.model.dto.Room;
import kr.or.iei.inn.model.dto.RoomHashTag;
import kr.or.iei.inn.model.dto.RoomOption;
import kr.or.iei.inn.model.dto.SelectInnInfo;
import kr.or.iei.inn.model.service.InnService;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.partner.model.service.PartnerService;
import kr.or.iei.util.FileUtils;

@RestController
@RequestMapping(value="/inn")
@CrossOrigin("*")
public class InnController {
	@Autowired
	private InnService innService;
	@Autowired
	private FileUtils fileUtils;
	@Autowired
	private PartnerService partnerService;
	@Autowired
	private MemberService memberService;
	@Value("${file.root}")
	private String root;
	
	@PostMapping("/innReg")
	public ResponseEntity<ResponseDTO> insertInn(@ModelAttribute Inn inn, @ModelAttribute MultipartFile[] innFile, @RequestAttribute String memberEmail){
		int memberNo = memberService.getMemberNo(memberEmail);
		int partnerNo = partnerService.getPartnerNo(memberNo);
		inn.setPartnerNo(partnerNo);
	
		String savepath = root+"/inn/";
		ArrayList<InnFile> fileList = new ArrayList<InnFile>();
		if(innFile != null) {
			for(MultipartFile file : innFile) {
				String filepath = fileUtils.upload(savepath, file);
				InnFile innfile = new InnFile();
				innfile.setInnFilePath(filepath);
				fileList.add(innfile);
			}
		}
		int result = innService.insertInn(inn,fileList);
		if(result == 1+ fileList.size()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "faile", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
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
	
	@PostMapping("/roomReg")
	public ResponseEntity<ResponseDTO> insertRoom(@ModelAttribute Room room, @ModelAttribute RoomOption roomOption, @ModelAttribute RoomHashTag roomHashTag, @ModelAttribute MultipartFile[] innFile, @RequestAttribute String memberEmail){
		int memberNo = memberService.getMemberNo(memberEmail);
		int partnerNo = partnerService.getPartnerNo(memberNo);
		int innNo = innService.getInnNo(partnerNo);
		room.setInnNo(innNo);
		String savepath = root+"/room/";
		String[] optionNo = room.getOptionNo();
		String[] hashTagName = room.getHashTagName();
		int[] newOptionNo = Arrays.stream(optionNo).mapToInt(Integer::parseInt).toArray();
		
		ArrayList<InnFile> fileList = new ArrayList<InnFile>();
		if(innFile !=null) {
			for(MultipartFile file : innFile) {
				String filepath = fileUtils.upload(savepath, file);
				InnFile innfile = new InnFile();
				innfile.setInnFilePath(filepath);
				fileList.add(innfile);
			}
		}
		int result = innService.insertRoom(room,fileList,newOptionNo,hashTagName, roomOption, roomHashTag);
		if(result == 1+fileList.size()+newOptionNo.length+hashTagName.length) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@GetMapping("/selectInnInfo/{roomNo}/{innNo}")
	public ResponseEntity<ResponseDTO> selectInnInfo(@PathVariable int roomNo, @PathVariable int innNo){
		SelectInnInfo si = partnerService.selectInnInfo(roomNo, innNo);
		if(si != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", si);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	@GetMapping("/detail/{innNo}")
	public ResponseEntity<ResponseDTO> selectInnDetail(@PathVariable int innNo){
		Inn inn = innService.selectInnDetail(innNo);
		if(inn != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", inn);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
}
