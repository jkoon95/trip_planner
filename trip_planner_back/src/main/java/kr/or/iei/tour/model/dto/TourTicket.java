package kr.or.iei.tour.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "tourTicket")
@Schema(description = "투어티켓 객체")
public class TourTicket {
	private int tourNo;
	private int ticketAdult;
	private int ticketYouth;
	private int ticketChild;
	
	private String searchText;
	private String startDate;
}
