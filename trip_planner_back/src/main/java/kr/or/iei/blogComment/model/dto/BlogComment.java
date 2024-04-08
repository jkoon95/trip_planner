package kr.or.iei.blogComment.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="blogComment")
public class BlogComment {
	private int commentNo;
	private int blogNo;
	private String memberNickName;
	private String commentContent;
	private String commentDate;
}
