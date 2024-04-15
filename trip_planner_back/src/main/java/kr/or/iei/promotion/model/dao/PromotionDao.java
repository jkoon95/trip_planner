package kr.or.iei.promotion.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.member.model.dto.Member;
import kr.or.iei.promotion.model.dto.Promotion;
import kr.or.iei.util.PageInfo;

@Mapper
public interface PromotionDao {

	int totalCount();

	List selectPromotionList(PageInfo pi);

	List selectPromotionListRegion(PageInfo pi);

	List selectPromotionListPrice(PageInfo pi);

	List selectPromotionListDeadline(PageInfo pi);
	/*
	List selectPromotionListSearch(PageInfo pi);

	List<Promotion> selectBookPromotionList(String memberEmail, int start, int end);

	int totalSearchCount();
	*/

	Promotion selectOnePromotion(int promotionNo);

	List<Promotion> selectBookPromotionList(String memberEmail, int start, int end);

	int checkRemainingSeat(int promotionNo);

	int purchasePromotion(int promotionNo, int memberNo, int seat);

	List<Promotion> selectMainPromotionList();

	int applyPromotion(Promotion promotion);

	int applyPromotionFile(MultipartFile promotionFile);

}
