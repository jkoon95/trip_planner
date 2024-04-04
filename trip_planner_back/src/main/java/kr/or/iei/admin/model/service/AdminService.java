package kr.or.iei.admin.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
