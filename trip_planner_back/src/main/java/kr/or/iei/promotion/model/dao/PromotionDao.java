package kr.or.iei.promotion.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.util.PageInfo;

@Mapper
public interface PromotionDao {

	int totalCount();

	List selectPromotionList(PageInfo pi);

}
