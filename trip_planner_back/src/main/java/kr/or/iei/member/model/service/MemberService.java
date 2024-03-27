package kr.or.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.util.JwtUtil;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private JwtUtil jwtUtil;

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberEmail());
		if(m != null) {
			long expiredDateMs = 60*60*1000l;
			String accessToken = jwtUtil.createToken(member.getMemberEmail(), expiredDateMs);
			return accessToken;
		}else {			
			return null;
		}
	}

	public Member kakaoLogin(Member member) {
		System.out.println(member);
		return memberDao.kakaoLogin(member);
	}
	
	public Member selectOneMember(String memberEmail) {
		// TODO Auto-generated method stub
		return memberDao.selectOneMember(memberEmail);
	}
}
