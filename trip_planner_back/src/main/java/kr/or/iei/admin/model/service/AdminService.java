package kr.or.iei.admin.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.admin.model.dao.AdminDao;
import kr.or.iei.admin.model.dto.CouponList;

@Service
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;

	public int insertCounponList(CouponList couponList) {
		// TODO Auto-generated method stub
		return adminDao.insertCouponList(couponList);
	}

	public List selectCouponList(int memberNo) {
		List list = adminDao.selectCouponList(memberNo);
		return list;
	}

	@Transactional
	public int updateCoupon(int couponNo) {
		
		return adminDao.updateCoupon(couponNo);
	}
}
