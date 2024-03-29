package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("hashtag")
public class HashTag {
	private int hashTagNo;
	private String hashTagName;
}
