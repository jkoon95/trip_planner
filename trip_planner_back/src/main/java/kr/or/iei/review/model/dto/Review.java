package kr.or.iei.review.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="review")
@Schema(description = "리뷰 객체")
public class Review {
	private int reviewNo;
	private int memberNo;
	private int reviewType;
	private String reviewTitle;
	private String reviewContent;
	private int reviewStar;
	private int refNo;
	private String reviewDate;
	
	private int innNo;
	
	private int tourNo;
	private String memberNickname;
	
	

}
