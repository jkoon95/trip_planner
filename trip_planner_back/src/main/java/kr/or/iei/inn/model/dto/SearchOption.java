package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="searchOption")
@Schema(description = "숙소 검색 옵션 객체")
public class SearchOption {
	private String detailPlace;
	private String detailPeople;
	private String detailCheckIn;
	private String detailCheckOut;
}
