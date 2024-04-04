package kr.or.iei.admin.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.admin.model.dto.CouponList;

@Mapper
public interface AdminDao {

	int insertCouponList(CouponList couponList);

}
