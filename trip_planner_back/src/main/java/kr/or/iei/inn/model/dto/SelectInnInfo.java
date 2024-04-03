package kr.or.iei.inn.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class SelectInnInfo {
	private int roomNo;
	private String roomName;
	private int roomMinPeople;
	private int roomMaxPeople;
	private String roomPrice;
	private String partnerName;
	private String innCheckInTime;
	private String innCheckOutTime;
	private String innFilepath;
}
