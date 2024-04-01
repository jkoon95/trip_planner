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
	public int insertTour(Tour tour) {
		int result = tourDao.insertTour(tour);
		return result;
	}
	
}
