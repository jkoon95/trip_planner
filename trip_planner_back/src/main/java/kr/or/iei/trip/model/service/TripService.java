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
	public int insertTrip(Trip trip, List<TripDetail> tripDetailList, String memberEmail) {
		Member m = memberDao.selectOneMember(memberEmail);
		trip.setMemberNo(m.getMemberNo()); 
		int result = tripDao.insertTrip(trip);
		for(TripDetail td : tripDetailList) {
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
		int numPerPage = 10;
		int end = reqPage * numPerPage;
		int start = end - numPerPage + 1;
		List<Trip> tripList = tripDao.selectMyTripList(memberEmail, start, end);
		return tripList;
	}

	
}
