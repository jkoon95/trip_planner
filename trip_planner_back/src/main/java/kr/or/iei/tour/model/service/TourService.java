package kr.or.iei.tour.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.tour.model.dao.TourDao;
import kr.or.iei.tour.model.dto.Tour;

@Service
public class TourService {
	@Autowired
	private TourDao tourDao;
	
	@Transactional
	public int insertTour(Tour tour, String memberEmail) {
		int partnerNo = tourDao.searchPartner(memberEmail);
		tour.setPartnerNo(partnerNo);
		System.out.println("업체번호 : "+tour.getPartnerNo());
		int result = tourDao.insertTour(tour);
		return result;
	}

	
}
