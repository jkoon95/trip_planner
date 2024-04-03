package kr.or.iei.blog.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="blogDate")
public class BlogDate {
	private int blogDateNo;
	private int blogNo;
	private int blogDateDay;
	private String blogDateScheduleTitle;
	private String blogDateScheduleContent;	
	
}
