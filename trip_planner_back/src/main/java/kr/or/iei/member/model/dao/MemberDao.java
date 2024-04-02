package kr.or.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.dto.Member;
import kr.or.iei.partner.model.dto.Partner;

@Mapper
public interface MemberDao {

	Member login(Member member);

	Member kakaoLogin(Member member);

	Member selectOneMember(String memberEmail);

	int insertMember(Member member);

	Member selectOneMemberNickName(String memberNickName);

	int insertPartner(Partner partner);


	String getMemberNickName(String memberEmail);

}
