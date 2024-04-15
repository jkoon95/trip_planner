package kr.or.iei.tour.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.like.model.dto.Like;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.partner.model.dto.Partner;
import kr.or.iei.review.model.dto.Review;
import kr.or.iei.tour.model.dto.Tour;
import kr.or.iei.tour.model.dto.TourBook;
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

	List viewTourDetail(int tourNo);

	List viewTicket(int tourNo);

	List selectPartner(int tourNo);

	int searchMember(String memberEmail);

	int insertReview(Review review);

	List selectReviewList(int tourNo);

	Member selectLoginMember(String memberEmail);

	int modifyTourReview(int reviewNo, Review review);

	int deleteReview(int reviewNo);

	List<TourBook> selectBookTourList(String memberEmail, int start, int end);

	int insertBook(TourBook tourBook);

	int totalBookCount(int memberNo);

	List selectTourBook(int start, int end, int memberNo);

	int totalSearchProduct(String searchText, int memberNo);

	List searchTourMgmt1(int start, int end, String searchText, int memberNo);

	int totalSearchMember(String searchText, int memberNo);

	List searchTourMgmt2(int start, int end, String searchText, int memberNo);

	List selectTopTour();

	int insertLike(Like like);

	List selectLikeTourList(int memberNo);

	int deleteLikeTour(int memberNo, int tourNo);

}
