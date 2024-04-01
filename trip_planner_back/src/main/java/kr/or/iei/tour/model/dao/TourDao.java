package kr.or.iei.tour.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.tour.model.dto.Tour;

@Mapper
public interface TourDao {

	int insertTour(Tour tour);
	
}
