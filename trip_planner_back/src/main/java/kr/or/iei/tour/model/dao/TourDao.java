package kr.or.iei.tour.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.tour.model.dto.Tour;
import kr.or.iei.util.PageInfo;

@Mapper
public interface TourDao {

	int searchPartner(String memberEmail);
	
	int insertTour(Tour tour);

	int totalCount(int memberNo);

	List selectTourSale(int start, int end, int memberNo);

	int updateStatus(int tourNo, int updateStatus);

	int deleteTour(int tourNo);
	
}
