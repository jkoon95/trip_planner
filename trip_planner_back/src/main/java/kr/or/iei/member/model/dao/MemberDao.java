package kr.or.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.dto.Member;
import kr.or.iei.partner.model.dto.Partner;

@Mapper
public interface MemberDao {

	Member login(Member member);

	Member kakaoLogin(String memberEmail);

	Member selectOneMember(String memberEmail);

	int insertMember(Member member);

	Member selectOneMemberNickName(String memberNickName);

	int insertPartner(Partner partner);


	String getMemberNickName(String memberEmail);

	int getMemberNo(String memberEmail);

	int updateMember(Member member);

}
