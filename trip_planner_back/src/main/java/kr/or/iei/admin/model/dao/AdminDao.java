package kr.or.iei.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.admin.model.dto.CouponList;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.util.PageInfo;

@Mapper
public interface AdminDao {

	int insertCouponList(CouponList couponList);

	List selectCouponList(int memberNo);

	int totalCount();

	List selectMemberList(PageInfo pi);

	Member selectOneMember(int memberNo);

	int blockMember(int memberNo);

	int updateCoupon(int couponNo);


}
