package kr.or.iei.member.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.or.iei.ResponseDTO;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.partner.model.dto.Partner;
import lombok.Getter;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;

	
	@PostMapping(value="/login")
	public ResponseEntity<ResponseDTO> login(@RequestBody Member member){
		String accessToken = memberService.login(member);
		System.out.println(accessToken);
		if(accessToken != null) {
			if(accessToken.equals("block")) {
				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "block", null);
				return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			}else {				
				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", accessToken);
				return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			}
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@PostMapping(value="/kakaoLogin/{kakaoMemberEmail}")
	public ResponseEntity<ResponseDTO> kakaoLogin(@PathVariable String kakaoMemberEmail){
		System.out.println(kakaoMemberEmail);
		String accessToken = memberService.kakaoLogin(kakaoMemberEmail);
		System.out.println(accessToken);
		if(accessToken != null) {
			if(accessToken.equals("block")) {
				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "block", null);
				return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			}else {				
				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", accessToken);
				return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
			}
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}
	
	@Operation(summary = "닉네임 중복체크", description = "매개변수로 전달한 닉네임 사용여부 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버에러")
	})
	@GetMapping(value="/nickName/{memberNickName}")
	public ResponseEntity<ResponseDTO> selectOneMemberNickName(@PathVariable(name="memberNickName") String memberNickName){
		System.out.println(memberNickName);
		Member member = memberService.selectOneMemberNickName(memberNickName);
		System.out.println(member);
		if(member == null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "not duplication", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "duplication", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@GetMapping(value="/email/{memberEmail}")
	public ResponseEntity<ResponseDTO> selectOneMemberEmail(@PathVariable String memberEmail){
		System.out.println(memberEmail);
		Member member = memberService.selectOneMember(memberEmail);
		System.out.println(member);
		if(member == null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "not duplication", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "duplication", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	
	@GetMapping
	public ResponseEntity<ResponseDTO> getMember(@RequestAttribute String memberEmail){
		Member member = memberService.selectOneMember(memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", member);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@PostMapping(value="/join")
	public ResponseEntity<ResponseDTO> join(@RequestBody Member member){
		int result = memberService.insertMember(member);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@PostMapping(value="/businessAuth")
	public ResponseEntity<ResponseDTO> businessAuth(@RequestBody Partner partner){
		Member member = memberService.selectOneMember(partner.getMemberEmail());
		partner.setMemberNo(member.getMemberNo());
		int result = memberService.insertPartner(partner);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
		
	}
	
	@PatchMapping(value="/updateMember")
	public ResponseEntity<ResponseDTO> updateMember(@RequestBody Member member){
		int result = memberService.updateMember(member);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
}
