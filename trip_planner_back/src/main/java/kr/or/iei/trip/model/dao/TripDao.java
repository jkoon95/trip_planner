package kr.or.iei.trip.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.trip.model.dto.Trip;
import kr.or.iei.trip.model.dto.TripDetail;
import kr.or.iei.trip.model.dto.TripPlace;

@Mapper
public interface TripDao {

	int insertTrip(Trip trip);

	int insertTripDetail(TripDetail td);

	int insertTripPlace(TripPlace tp);

}
