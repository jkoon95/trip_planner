package kr.or.iei.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.notice.model.dao.NoticeDao;
import kr.or.iei.notice.model.dto.Notice;
import kr.or.iei.util.PageInfo;
import kr.or.iei.util.Pagination;

@Service
public class NoticeService {
	
	@Autowired
	private NoticeDao noticeDao;

	@Autowired
	private Pagination pagination;	
	
	public Map<String, Object> selectNoticeList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = noticeDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);	
		List list = noticeDao.selectNoticeList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("noticeList",list);
		map.put("pi",pi);
		return map;
	}
	
	@Transactional
	public int deleteNotice(int noticeNo) {
		// TODO Auto-generated method stub
		return noticeDao.deleteNotice(noticeNo);
	}

	public Notice selectOneNotice(int noticeNo) {
		return noticeDao.selectOneNotice(noticeNo);
	}

	public int writeNotice(Notice notice) {
		// TODO Auto-generated method stub
		return noticeDao.writeNotice(notice);
	}	
}
