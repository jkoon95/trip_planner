package kr.or.iei.tour.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.tour.model.dto.Tour;
import kr.or.iei.tour.model.dto.TourTicket;
import kr.or.iei.util.PageInfo;

@Mapper
public interface TourDao {

	int searchPartner(String memberEmail);
	
	int insertTour(Tour tour);

	int totalCount(int memberNo);

	List selectTourSale(int start, int end, int memberNo);

	int updateStatus(int tourNo, int updateStatus);

	int deleteTour(int tourNo);

	Tour selectOneTour(int tourNo);

	int updateTour(Tour tour);

	int getLastInsertTourNo();

	TourTicket selectTourTicket(int tourNo);

	int modifyTourTicket(TourTicket tourTicket);

	int tempTourTicket(int tourNo);

	int searchTourNo(int tourNo, String memberEmail);

	int checkPartnerNo(int tourNo);

	List selectTourList();

	List selectTicketList();

	List searchTour(String searchText, String startDate);

	List searchTicket(String searchText, String startDate);

	List searchType(int tourType);

	List searchTypeTicket(int tourType);
	
}
