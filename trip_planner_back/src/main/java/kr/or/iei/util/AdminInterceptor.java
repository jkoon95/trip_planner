package kr.or.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.member.model.service.MemberService;

@Component
public class AdminInterceptor implements HandlerInterceptor{
	/*
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private MemberService memberService;
	
	//컨트롤러로 가기 전에 토큰에서 아이디를 추출해서 컨트롤에서 사용할 수 있도록 등록
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//로그인을 성공한 이후에 요청이 들어오면 header에서 인증 토큰을 꺼냄
		String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
		String token = auth.split(" ")[1];
		String memberEmail = jwtUtil.getMemberEmail(token);
		Member member = memberService.selectOneMember(memberEmail);
		if(member.getMemberType() != 3) {
			return false;
		}else {			
			return true;
		}
	}
*/
}









