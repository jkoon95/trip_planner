package kr.or.iei.tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.partner.model.dto.Partner;
import kr.or.iei.tour.model.dao.TourDao;
import kr.or.iei.tour.model.dto.Tour;
import kr.or.iei.tour.model.dto.TourTicket;
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
//		System.out.println("업체번호 : "+tour.getPartnerNo());
		int result = tourDao.insertTour(tour);
		return result;
	}

	public Map selectTourSale(int reqPage, int memberNo) {
		int numPerPage = 3;		// 한 페이지당 게시물 수
		int pageNaviSize = 5;	// 페이지 네비게이션 길이
		int totalCount = tourDao.totalCount(memberNo);	// 전체 게시물 수
		// 페이징처리에 필요한 값을 계산해서 객체로 리턴받음
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int end = reqPage*numPerPage;
		int start = end-numPerPage+1;
		List list = tourDao.selectTourSale(start, end, memberNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("tourSale",list);
		map.put("pi",pi);
		return map;
	}
	
	@Transactional
	public int updateStatus(int tourNo, int salesStatus) {
		int updateStatus = (salesStatus == 1) ? 2 : 1;
		return tourDao.updateStatus(tourNo,updateStatus);
	}
	
	@Transactional
	public int deleteTour(int tourNo) {
		return tourDao.deleteTour(tourNo);
	}

	public Tour selectOneTour(int tourNo) {
		return tourDao.selectOneTour(tourNo);
	}

	@Transactional
	public int updateTour(Tour tour) {
		return tourDao.updateTour(tour);
	}

	public int getLastInsertTourNo() {
		return tourDao.getLastInsertTourNo();
	}
	
	public TourTicket selectTourTicket(int tourNo) {
		return tourDao.selectTourTicket(tourNo);
	}

	@Transactional
	public int modifyTourTicket(TourTicket tourTicket) {
		return tourDao.modifyTourTicket(tourTicket);
	}

	@Transactional
	public int tempTourTicket(int tourNo) {
		return tourDao.tempTourTicket(tourNo);
	}

	public int searchTourNo(int tourNo, String memberEmail) {
		int result = tourDao.searchTourNo(tourNo, memberEmail);
		return result;
	}

	public int searchPartnerNo(String memberEmail) {
		int partnerNo = tourDao.searchPartner(memberEmail);
		return partnerNo;
	}

	public int checkPartnerNo(int tourNo) {
		int checkNo = tourDao.checkPartnerNo(tourNo);
		return checkNo;
	}

	public Map selectTourList() {
		List tourList = tourDao.selectTourList();
		List ticketList = tourDao.selectTicketList();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("tourList", tourList);
		map.put("ticketList", ticketList);
		return map;
	}

	public Map searchTour(String searchText, String startDate) {
		List tourList = tourDao.searchTour(searchText, startDate);
		List ticketList = tourDao.searchTicket(searchText, startDate);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("tourList", tourList);
		map.put("ticketList", ticketList);
		return map;
	}

	public Map searchType(int tourType) {
		List tourList = tourDao.searchType(tourType);
		List ticketList = tourDao.searchTypeTicket(tourType);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("tourList", tourList);
		map.put("ticketList", ticketList);
		return map;
	}

	public Map viewTourDetail(int tourNo) {
		List tourList = tourDao.viewTourDetail(tourNo);
		List ticketList = tourDao.viewTicket(tourNo);
		List partner = tourDao.selectPartner(tourNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("tourList", tourList);
		map.put("ticketList", ticketList);
		map.put("partner", partner);
		return map;
	}

	
}
