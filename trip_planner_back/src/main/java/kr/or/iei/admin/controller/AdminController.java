package kr.or.iei.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.ResponseDTO;
import kr.or.iei.admin.model.dto.CouponList;
import kr.or.iei.admin.model.service.AdminService;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.member.model.service.MemberService;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private MemberService memberService;
	
	@PostMapping(value="/couponReg")
	public ResponseEntity<ResponseDTO> join(@RequestBody CouponList couponList){
		System.out.println("쿠폰값 : " + couponList);
		int result = adminService.insertCounponList(couponList);
		if(result>0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@GetMapping("/selectCouponList")
	public ResponseEntity<ResponseDTO> selectCouponList(@RequestAttribute String memberEmail){
		int memberNo = memberService.getMemberNo(memberEmail);
		List list = adminService.selectCouponList(memberNo);
		if(!list.isEmpty()) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", list);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@GetMapping(value="/memberList/{reqPage}")
	public ResponseEntity<ResponseDTO> memberList(@PathVariable int reqPage) {
		Map map = adminService.selectMemberList(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@GetMapping(value="/selectOneMember/{memberNo}")
	public ResponseEntity<ResponseDTO> selectOneMember(@PathVariable int memberNo){
		Member member = adminService.selectOneMember(memberNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", member);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@PatchMapping(value="/blockMember/{memberNo}")
	public ResponseEntity<ResponseDTO> blockMember(@PathVariable int memberNo){
		int result = adminService.blockMember(memberNo);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
	
	@GetMapping(value="/partnerList/{reqPage}")
	public ResponseEntity<ResponseDTO> partnerList(@PathVariable int reqPage) {
		Map map = adminService.selectPartnerList(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
}
