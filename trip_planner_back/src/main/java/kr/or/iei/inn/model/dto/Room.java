package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("room")
public class Room {
	private int roomNo;
	private int innNo;
	private String roomName;
	private int roomMaxPeople;
	private String roomPrice;
	private String etcOption;
	
	private String[] hashTagName;
	private String[] optionNo;
}
