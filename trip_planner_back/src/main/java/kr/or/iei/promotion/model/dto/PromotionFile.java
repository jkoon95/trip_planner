package kr.or.iei.promotion.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias(value="promotionFile")
public class PromotionFile {
	private int promotionFileNo;
	private int promotionNo;
	private String proFilePath;
	private String proFileName;
}
