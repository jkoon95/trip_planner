package kr.or.iei.trip.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.trip.model.dao.TripDao;
import kr.or.iei.trip.model.dto.Trip;
import kr.or.iei.trip.model.dto.TripDetail;
import kr.or.iei.trip.model.dto.TripPlace;

@Service
public class TripService {
	@Autowired
	private TripDao tripDao;
	@Autowired
	private MemberDao memberDao;

	@Transactional
	public int insertTrip(Trip trip, String memberEmail) {
		Member m = memberDao.selectOneMember(memberEmail);
		trip.setMemberNo(m.getMemberNo()); 
		int result = tripDao.insertTrip(trip);
		for(TripDetail td : trip.getTripDetailList()) {
			td.setTripNo(trip.getTripNo());
			result += tripDao.insertTripDetail(td);
			if(td.getSelectPlaceList() != null) {
				for(TripPlace tp : td.getSelectPlaceList()) {
					tp.setTripDetailNo(td.getTripDetailNo());
					result += tripDao.insertTripPlace(tp);
				}				
			}
		}
		return result;
	}

	public List<Trip> selectMyTripList(int reqPage, String memberEmail) {
		int amount = 5;
		int end = reqPage * amount;
		int start = end - amount + 1;
		List<Trip> tripList = tripDao.selectMyTripList(memberEmail, start, end);
		return tripList;
	}

	public Trip selectOneTrip(int tripNo) {
		return tripDao.selectOneTrip(tripNo);
	}

	@Transactional
	public int updateTrip(Trip trip) {
		System.out.println("날짜 수정의 trip: "+trip);
		return tripDao.updateTrip(trip);
	}

	@Transactional
	public int updateTripDetail(Trip trip) {
		int delTripDetail = 0;
		int insertTdLength = 0;
		int insertResult = 0;
		for(TripDetail td : trip.getTripDetailList()) {
			System.out.println(td);
			//일정이 새로 추가됐을 경우
			if(td.getTripDetailNo() == 0) {
				System.out.println("일정이 새로 추가됐을 경우");
				insertTdLength++;
				td.setTripNo(trip.getTripNo());

				String detailNo = tripDao.selectTripDetailNo(td);
				if(detailNo != null){
					if(td.getSelectPlaceList() != null) {
						for(TripPlace tp : td.getSelectPlaceList()) {
							tp.setTripDetailNo(Integer.parseInt(detailNo));
							insertResult += tripDao.insertTripPlace(tp);
						}				
					}
				}else {
					insertResult += tripDao.insertTripDetail(td);					
					if(td.getSelectPlaceList() != null) {
						for(TripPlace tp : td.getSelectPlaceList()) {
							tp.setTripDetailNo(td.getTripDetailNo());
							insertResult += tripDao.insertTripPlace(tp);
						}				
					}
				}
			}else {//기존 일정인 경우
				System.out.println("기존 일정인 경우");
				List<TripDetail> checkTdList = tripDao.checkTdList(td.getTripNo());
				System.out.println("들어온 디테일 개수 "+trip.getTripDetailList().size());
				System.out.println("기존 디테일 개수 "+checkTdList.size());
				System.out.println(td.getTripDetailNo());
				
				for(TripPlace tp : td.getSelectPlaceList()) {
					System.out.println("??" + tp.getTripDetailNo());
					if(tp.getTripDetailNo() != td.getTripDetailNo()) {
						System.out.println(tp.getTripDetailNo());
						System.out.println(td.getTripDetailNo());
					}
				}
				
			}
		}
		return 0;
	}
}
