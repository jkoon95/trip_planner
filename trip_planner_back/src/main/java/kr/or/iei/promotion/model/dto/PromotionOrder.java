package kr.or.iei.promotion.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias(value="promotionOrder")
public class PromotionOrder {
	private int orderNo;
	private int memberNo;
	private int promotionNo;
	private int seat;
}