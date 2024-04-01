package kr.or.iei.tour.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.tour.model.dto.Tour;

@Mapper
public interface TourDao {

	int searchPartner(String memberEmail);
	
	int insertTour(Tour tour);
	
}
