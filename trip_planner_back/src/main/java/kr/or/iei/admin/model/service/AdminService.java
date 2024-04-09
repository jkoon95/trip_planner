package kr.or.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.admin.model.dao.AdminDao;
import kr.or.iei.admin.model.dto.CouponList;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.Pagination;

@Service
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private Pagination pagination;

	public int insertCounponList(CouponList couponList) {
		// TODO Auto-generated method stub
		return adminDao.insertCouponList(couponList);
	}

	public List selectCouponList(int memberNo) {
		List list = adminDao.selectCouponList(memberNo);
		return list;
	}


	public Map selectMemberList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = adminDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);	
		List list = adminDao.selectMemberList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("memberList",list);
		map.put("pi",pi);
		return map;
	}

	public Member selectOneMember(int memberNo) {
		return adminDao.selectOneMember(memberNo);
	}
	
	@Transactional
	public int blockMember(int memberNo) {
		return adminDao.blockMember(memberNo);
	}
	

	@Transactional
	public int updateCoupon(int couponNo) {
		
		return adminDao.updateCoupon(couponNo);
	}

	public Map selectPartnerList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalPartnerCount = adminDao.totalPartnerCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPartnerCount);	
		List list = adminDao.selectPartnerList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("partnerList",list);
		map.put("pi",pi);
		return map;
	}

}
