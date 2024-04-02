package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("roomOption")
public class RoomOption {
	private int roomNo;
	private int optionNo;

}
