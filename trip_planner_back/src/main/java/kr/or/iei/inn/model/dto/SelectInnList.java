package kr.or.iei.inn.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SelectInnList {
	private int innType;
	private List hashTag;
	private List option;
	private String checkInDate;
	private String checkOutDate;
	private String innAddr;
	private int bookGuest;
	private int minPrice;
	private int maxPrice;
	private String selectSort;
}
