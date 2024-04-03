package kr.or.iei.blog.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="blog")
public class Blog {
	private int blogNo;
	private String memberNickName;
	private String blogTitle;
	private String blogDate;
	private String blogThumbnail;
	private String blogDateDay;
}
