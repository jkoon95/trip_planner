package kr.or.iei.partner.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.inn.model.dto.Room;
import kr.or.iei.inn.model.dto.SelectInnInfo;
import kr.or.iei.partner.model.dao.PartnerDao;
import kr.or.iei.partner.model.dto.Partner;

@Service
public class PartnerService {
	@Autowired
	private PartnerDao partnerDao;

	public Partner selectPartner(int memberNo) {
		return partnerDao.selectPartner(memberNo);
	}

	public int getPartnerNo(int memberNo) {
		return partnerDao.getPartnerNo(memberNo);
	}

	public SelectInnInfo selectInnInfo(int roomNo, int innNo) {
		Room r = new Room();
		r.setInnNo(innNo);
		r.setRoomNo(roomNo);
		SelectInnInfo si = partnerDao.selectInnInfo(r);
		return si;
	}
}
