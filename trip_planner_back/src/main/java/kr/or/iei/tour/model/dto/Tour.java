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
	private String tourAddr;
	private String tourImg;
	private String tourIntro;
	private int salesCount;
	private String salesPeriod;
	private int salesStatus;

	private int thumbnailCheck;
	private int intronailCheck;
	private String memberEmail;
	private String searchText;
	private String startDate;
	private int ticketAdult;
	private int ticketYouth;
	private int ticketChild;
}
