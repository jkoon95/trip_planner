package kr.or.iei.like.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("like")
public class Like {
	private int likeNo;
	private int memberNo;
	private int likeType;
	private int refNo;
}
