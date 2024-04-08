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
	private List<RoomHashTag> hashTagMenu;
	private List<Option> optionMenu;
	private String checkInDate;
}
