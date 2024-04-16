package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("likeInnList")
public class LikeInnList {
	private String partnerName;
	private int minRoomPrice;
	private String innCheckInTime;
	private String innCheckOutTime;
	private int innNo;
	private int partnerNo;
	private int innType;
	private String filePath;
	private String innAddr;
}
