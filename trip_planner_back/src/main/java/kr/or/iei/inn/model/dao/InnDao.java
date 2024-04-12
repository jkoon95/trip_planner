package kr.or.iei.inn.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.inn.model.dto.Inn;
import kr.or.iei.inn.model.dto.InnFile;
import kr.or.iei.inn.model.dto.InnReservation;
import kr.or.iei.inn.model.dto.Room;
import kr.or.iei.inn.model.dto.RoomHashTag;
import kr.or.iei.inn.model.dto.RoomOption;

@Mapper
public interface InnDao {

	List selectRoomOption();

	int insertInn(Inn inn);

	int insertInnFile(InnFile innfile);

	int getInnNo(int partnerNo);

	int insertRoom(Room room);

	int insertRoomFile(InnFile innfile);

	int insertOption(int optionNo);

	int insertRoomOption(RoomOption roomOption);

	int insertRoomHashTag(RoomHashTag roomHashTag);

	Inn selectInnDetail(int innNo);

	int reservationInn(InnReservation innReservation);

	List<InnReservation> selectBookInnsList(String memberEmail, int start, int end);

}
