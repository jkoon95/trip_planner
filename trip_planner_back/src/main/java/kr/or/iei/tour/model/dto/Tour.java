package kr.or.iei.tour.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="tour")
@Schema(description = "투어 객체")
public class Tour {
	private int tourNo;
	private int partnerNo;
	private String tourName;
	private int tourType;
	private String tourRegion;
	private String tourIntro;
	private String tourFilepath;
	private int tourCount;
	private String salesPeriod;
	private int salesStatus;

}
