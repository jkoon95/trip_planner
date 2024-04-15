package kr.or.iei.inn.model.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.Pagination;

@Service
public class InnService {
	@Autowired
	private InnDao innDao;
	@Autowired
	private Pagination pagination;
	

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
	public Map selectInnList(SelectInnList selectInnList, String memberEmail) {
		int numPerPage = 15;
		int pageNaviSize = 10;
		int totalCount = innDao.totalCount(selectInnList);
		int reqPage = selectInnList.getReqPage();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		selectInnList.setStart(pi.getStart());
		selectInnList.setEnd(pi.getEnd());
		List list = innDao.selectInnList(selectInnList);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("selectInnList", list);
		map.put("pi",pi);
		return map;
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
	public List selectHashTag(int roomNo) {		
		return innDao.selectHashTag(roomNo);
	}
	@Transactional
	public int likeUpdate(int innNo, int memberNo) {
		return innDao.likeUpdate(innNo, memberNo);
	}	
}
