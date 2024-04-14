package kr.or.iei.inn.model.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.inn.model.dao.InnDao;
import kr.or.iei.inn.model.dto.Inn;
import kr.or.iei.inn.model.dto.InnFile;
import kr.or.iei.inn.model.dto.InnReservation;
import kr.or.iei.inn.model.dto.Option;
import kr.or.iei.inn.model.dto.Room;
import kr.or.iei.inn.model.dto.RoomHashTag;
import kr.or.iei.inn.model.dto.RoomOption;
import kr.or.iei.inn.model.dto.SelectInnList;
import kr.or.iei.trip.model.dto.Trip;

@Service
public class InnService {
	@Autowired
	private InnDao innDao;
	

	public List selectRoomOption() {
		
		return innDao.selectRoomOption();
	}
	@Transactional
	public int insertInn(Inn inn, ArrayList<InnFile> fileList) {
		int result = innDao.insertInn(inn);
		for(InnFile innfile : fileList) {
			innfile.setInnNo(inn.getInnNo());
			result += innDao.insertInnFile(innfile);
		}
		return result;
	}
	public int getInnNo(int partnerNo) {
		
		return innDao.getInnNo(partnerNo);
	}
	@Transactional
	public int insertRoom(Room room, ArrayList<InnFile> fileList, int[] newOptionNo, String[] hashTagName, RoomOption roomOption, RoomHashTag roomHashTag) {
		int result = innDao.insertRoom(room);
		for(InnFile innfile : fileList) {
			innfile.setRoomNo(room.getRoomNo());
			innfile.setInnNo(room.getInnNo());
			result += innDao.insertRoomFile(innfile);
		}
		for(int optionNo : newOptionNo) { 
			roomOption.setRoomNo(room.getRoomNo());
			roomOption.setOptionNo(optionNo);
	        result += innDao.insertRoomOption(roomOption);
	    }
		for(String hashTag : hashTagName) {
			roomHashTag.setRoomNo(room.getRoomNo());
			roomHashTag.setHashTag(hashTag);
			result += innDao.insertRoomHashTag(roomHashTag);
		}
		return result;
	}
	public Inn selectInnDetail(int innNo) {
		return innDao.selectInnDetail(innNo);
	}
	@Transactional
	public int reservationInn(InnReservation innReservation) {
		
		return innDao.reservationInn(innReservation);
	}
	public List selectInnList(SelectInnList selectInnList, String memberEmail) {
		List list = innDao.selectInnList(selectInnList);
		return list;
	}
	public List<InnReservation> selectBookInnsList(int bookInnsReqPage, String memberEmail) {
		int amount = 5;
		int end = bookInnsReqPage * amount;
		int start = end - amount + 1;
		List<InnReservation> bookInnsList = innDao.selectBookInnsList(memberEmail, start, end);
		return bookInnsList;
	}
	public List selectRoomDetail(int innNo) {
		return innDao.selectRoomDetail(innNo);
	}
	public List selectInnFileDetail(int innNo) {
		return innDao.selectInnFileDetail(innNo);
	}
	public List selectInnFileRoom(int innNo) {
		return innDao.selectInnFileRoom(innNo);
	}
	@Transactional
	public int likeUpdate(int innNo, int memberNo) {
		return innDao.likeUpdate(innNo, memberNo);
	}	
}
