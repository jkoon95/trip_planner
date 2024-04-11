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
		int insertTdLength = 0;
		int insertResult = 0;
		int tpLength = 0;
		int updateTpResult = 0;
		int returnResult = 0;
		int updateTdLength = 0; 
		int updateTdResult = 0;
		for(TripDetail td : trip.getTripDetailList()) {
			//일정이 새로 추가됐을 경우(날짜를 늘리고 새 일정 추가)
			if(td.getTripDetailNo() == 0) {
				System.out.println("일정이 새로 추가됐을 경우");
				insertTdLength++;
				td.setTripNo(trip.getTripNo());
				//들어온 일정의 tripDay에 해당하는 tripDetailNo가 있는지 조회
				String detailNo = tripDao.selectTripDetailNo(td);
				//들어온 일정의 tripDay에 해당하는 tripDetailNo가  있으면
				if(detailNo != null){
					if(td.getSelectPlaceList() != null) {
						//장소만 tripDetailNo 넣어서 insert
						for(TripPlace tp : td.getSelectPlaceList()) {
							tp.setTripDetailNo(Integer.parseInt(detailNo));
							insertResult += tripDao.insertTripPlace(tp);
						}
					}
				}else {//들어온 일정의 tripDay에 해당하는 tripDetailNo가 없으면 tripDetail에 일정 추가
					insertResult += tripDao.insertTripDetail(td);
					if(td.getSelectPlaceList() != null) {
						//장소마다 tripDetailNo 넣어서 insert
						for(TripPlace tp : td.getSelectPlaceList()) {
							tp.setTripDetailNo(td.getTripDetailNo());
							insertResult += tripDao.insertTripPlace(tp);
						}
					}
				}
			}else {//기존 일정인 경우(등록되어있는 날짜에 장소를 추가/수정/삭제)
				System.out.println("기존 일정인 경우");
				if(td.getSelectPlaceList() != null) {
					//기존 날짜에 장소가 있는 경우 
					System.out.println("기존 날짜에 장소가 있는 경우");
					for(TripPlace tp : td.getSelectPlaceList()) {
						tp.setTripNo(td.getTripNo());
						//기존 날짜에 장소가 새로 추가된 경우
						if(tp.getTripDetailNo() == 0) {
							insertTdLength++;
							//장소가 가진 detailNo가 0이기 때문에 td의 detailNo 부여
							tp.setTripDetailNo(td.getTripDetailNo());
							//장소 insert
							insertResult += tripDao.insertTripPlace(tp);			
						}else {//기존 날짜에 기존 장소가 변경된 경우
							//기존 장소가 삭제예정인 경우
							if(tp.getDelNo() == 1) {
								System.out.println("service1 : "+tp.getDelNo()+"/"+tp.getOldTripRoute());
								tpLength++;
								System.out.println("delNo가 1이다");
								//tripDetailNo와 oldTripRoute번호로 지우기
								tp.setTripRoute(tp.getOldTripRoute());
								System.out.println("oldTripRoute와 : "+tp.getOldTripRoute());
								System.out.println("detailNo로 : "+tp.getTripDetailNo());
								updateTpResult += tripDao.deleteTripPlace(tp);
							}else if(tp.getDelNo() != 1 && (tp.getOldTripRoute() != -1 && tp.getOldTripRoute() != tp.getTripRoute()) && (td.getTripDetailNo() != tp.getTripDetailNo())) {
								System.out.println("진짜 무슨 일일까"+tp.getTripDetailNo());
								System.out.println("service2 : "+tp.getDelNo()+"/"+tp.getOldTripRoute());
								System.out.println("여기가 돈걸까..?");
								tpLength++;
								updateTpResult += tripDao.updateTripPlace1(tp);
							}
							else if(tp.getDelNo() != 1 && tp.getOldTripRoute() != tp.getTripRoute()) {
								System.out.println("여기가 이제 평범하게 순서 변경하는 곳");
								tpLength++;
								updateTpResult += tripDao.updateTripPlace1(tp);
							}
							//기존 일정을 줄여서 장소의 정보가 변경된 경우
							if(tp.getOldTripDay() != null && (!tp.getOldTripDay().equals(tp.getTripDay()))) {
								System.out.println();
								System.out.println("oldTripDay"+tp.getOldTripDay());
								System.out.println("tripday"+tp.getTripDay());
								System.out.println("tdTripDetailNO"+td.getTripDetailNo());
								tpLength++;
								int tpDeNo = tp.getTripDetailNo();
								tp.setTripDetailNo(td.getTripDetailNo());
								updateTpResult += tripDao.updateTripPlace2(tp);
							
								System.out.println("tpno"+tpDeNo);
								//줄어든 날짜는 tripDetail에서 지우기
								tp.setTripDetailNo(tpDeNo);
								tripDao.deleteTripDetail(tp);
							}
						}
					}
					//마지막에 전체 트립루트 싹 업데이트
//					for(TripPlace tp : td.getSelectPlaceList()) {
//						System.out.println("이거 안돌아?");
//						System.out.println("old"+tp.getOldTripRoute());
//						System.out.println("new"+tp.getTripRoute());
//						System.out.println("detailNo"+tp.getTripDetailNo());
//						tripDao.updateTripRoute(tp);
//					}
				}else {//기존 날짜에 장소가 없는 경우(빈 배열)
					updateTdLength++;
					System.out.println("기존 날짜에 장소가 없는 경우");
					//tripCost만 추가/수정/삭제
					updateTdResult += tripDao.updateTripDetail(td);
				}
				
			}
		}
		if(insertTdLength == insertResult) {
			returnResult = 1;
		}else {
			returnResult = -1;
		}
		if(tpLength == updateTpResult + 1) {
			returnResult = 1;
		}else {
			returnResult = -1;
		}
		if(updateTdLength == updateTdResult) {
			returnResult = 1;
		}else {
			returnResult = -1;
		}
		return returnResult;
	}
}
