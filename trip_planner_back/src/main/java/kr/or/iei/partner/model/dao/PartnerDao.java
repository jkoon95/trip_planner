package kr.or.iei.partner.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.inn.model.dto.Room;
import kr.or.iei.inn.model.dto.SelectInnInfo;
import kr.or.iei.partner.model.dto.Partner;

@Mapper
public interface PartnerDao {

	Partner selectPartner(int memberNo);

	int getPartnerNo(int memberNo);

	SelectInnInfo selectInnInfo(Room r);

	String selectPartnerName(int partnerNo);

}
