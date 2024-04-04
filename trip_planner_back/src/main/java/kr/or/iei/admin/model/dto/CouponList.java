package kr.or.iei.admin.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="couponList")
public class CouponList {
	private int couponNo;
	private String couponName;
	private int couponRange;
	private int discountRate;
	private int DiscountAmount;
	private Date expiredDate;
}
