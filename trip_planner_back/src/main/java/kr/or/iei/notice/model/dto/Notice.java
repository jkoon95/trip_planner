package kr.or.iei.notice.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="notice")
public class Notice {
	private int noticeNo;
	private int memberNo;
	private String memberNickName;
	private String noticeTitle;
	private String noticeContent;
	private String noticeDate;
}
