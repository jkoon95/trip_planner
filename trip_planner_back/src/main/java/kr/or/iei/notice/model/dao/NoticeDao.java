package kr.or.iei.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.notice.model.dto.Notice;
import kr.or.iei.util.PageInfo;

@Mapper
public interface NoticeDao {

	int totalCount();

	List selectNoticeList(PageInfo pi);

	int deleteNotice(int noticeNo);

	Notice selectOneNotice(int noticeNo);

}
