package kr.or.iei.tour.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "tourBook")
@Schema(description = "투어예약 객체")
public class TourBook {
	private int tourBookNo;
	private int tourNo;
	private int memberNo;
	private String bookDate;
	private int bookGuest;
	private int bookFee;
	
	
}
