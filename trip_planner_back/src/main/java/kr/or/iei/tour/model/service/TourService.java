package kr.or.iei.tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.tour.model.dao.TourDao;
import kr.or.iei.tour.model.dto.Tour;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.Pagination;

@Service
public class TourService {
	@Autowired
	private TourDao tourDao;
	@Autowired
	private Pagination pagination;
	
	@Transactional
	public int insertTour(Tour tour, String memberEmail) {
		int partnerNo = tourDao.searchPartner(memberEmail);
		tour.setPartnerNo(partnerNo);
		System.out.println("업체번호 : "+tour.getPartnerNo());
		int result = tourDao.insertTour(tour);
		return result;
	}

//	public Map selectTourSale(int reqPage) {
//		int numPerPage = 10;
//		int pageNaviSize = 5;
//		int totalCount = tourDao.totalCount();
//		// 페이징처리에 필요한 값을 계산해서 객체로 리턴받음
//		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
//		List list = tourDao.selectTourSale(pi);
//		HashMap<String, Object> map = new HashMap<String, Object>();
//		map.put("tourSale",list);
//		map.put("pi",pi);
//		return map;
//	}

	
}
