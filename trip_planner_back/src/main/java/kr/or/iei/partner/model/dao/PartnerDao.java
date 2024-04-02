package kr.or.iei.partner.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.partner.model.dto.Partner;

@Mapper
public interface PartnerDao {

	Partner selectPartner(int memberNo);

	int getPartnerNo(int memberNo);

}
