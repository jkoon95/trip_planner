package kr.or.iei.partner.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
