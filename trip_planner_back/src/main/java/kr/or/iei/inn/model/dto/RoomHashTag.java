package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("roomHashTag")
public class RoomHashTag {
	private int roomNo;
	private String hashTag;
}
