package kr.or.iei.tour.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.tour.model.dao.TourDao;

@Service
public class TourService {
	@Autowired
	private TourDao tourDao;
	
}
