package kr.or.iei.promotion.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.member.model.dto.Member;
import kr.or.iei.promotion.model.dao.PromotionDao;
import kr.or.iei.promotion.model.dto.Promotion;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.Pagination;

@Service
public class PromotionService {
	
	@Autowired
	private PromotionDao promotionDao;

	@Autowired
	private Pagination pagination;	
	
	public Map<String, Object> selectPromotionList(int reqPage) {
		int numPerPage = 3;
		int pageNaviSize = 5;
		int totalCount = promotionDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);	
		List list = promotionDao.selectPromotionList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("promotionList",list);
		map.put("pi",pi);
		return map;
	}

	public Map selectPromotionListRegion(int reqPage) {
		int numPerPage = 3;
		int pageNaviSize = 5;
		int totalCount = promotionDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);	
		List list = promotionDao.selectPromotionListRegion(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("promotionList",list);
		map.put("pi",pi);
		return map;
	}

	public Map selectPromotionListPrice(int reqPage) {
		int numPerPage = 3;
		int pageNaviSize = 5;
		int totalCount = promotionDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);	
		List list = promotionDao.selectPromotionListPrice(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("promotionList",list);
		map.put("pi",pi);
		return map;
	}

	public Map selectPromotionListDeadline(int reqPage) {
		int numPerPage = 3;
		int pageNaviSize = 5;
		int totalCount = promotionDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);	
		List list = promotionDao.selectPromotionListDeadline(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("promotionList",list);
		map.put("pi",pi);
		return map;
	}
	
	public List<Promotion> selectBookPromotionList(int bookPromotionReqPage, String memberEmail) {
		int amount = 6;
		int end = bookPromotionReqPage * amount;
		int start = end - amount + 1;
		List<Promotion> bookPromotionList = promotionDao.selectBookPromotionList(memberEmail, start, end);
		return bookPromotionList;
	}

	public Promotion selectOnePromotion(int promotionNo) {
		return promotionDao.selectOnePromotion(promotionNo);
	}

	public int checkRemainingSeat(int promotionNo) {
		return promotionDao.checkRemainingSeat(promotionNo);
	}

	@Transactional
	public int purchasePromotion(int promotionNo, int memberNo, int seat) {
		// TODO Auto-generated method stub
		return promotionDao.purchasePromotion(promotionNo, memberNo, seat);
	}
	
	/*
	public Map selectPromotionListSearch(int reqPage) {
		int numPerPage = 3;
		int pageNaviSize = 5;
		int totalCount = promotionDao.totalSearchCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = promotionDao.selectPromotionListSearch(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("promotionList",list);
		map.put("pi",pi);
		return map;
	}
	*/
	
}
