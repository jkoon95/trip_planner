package kr.or.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.partner.model.dto.Partner;
import kr.or.iei.util.JwtUtil;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberEmail());
		if(m != null  && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
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

	@Transactional
	public int insertMember(Member member) {
		// TODO Auto-generated method stub
		return memberDao.insertMember(member);
	}

	public Member selectOneMemberNickName(String memberNickName) {
		return memberDao.selectOneMemberNickName(memberNickName);
	}


	public String getMemberNickName(String memberEmail) {
		return memberDao.getMemberNickName(memberEmail);

	}
	public int getMemberNo(String memberEmail) {
		return memberDao.getMemberNo(memberEmail);

	}

	public int insertPartner(Partner partner) {
		// TODO Auto-generated method stub
		return memberDao.insertPartner(partner);
	}
}
