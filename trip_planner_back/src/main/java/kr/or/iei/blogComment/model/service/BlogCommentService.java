package kr.or.iei.blogComment.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.blogComment.model.dao.BlogCommentDao;
import kr.or.iei.blogComment.model.dto.BlogComment;

@Service
public class BlogCommentService {
	@Autowired
	private BlogCommentDao blogCommentDao;
	
	@Transactional
	public int insertComment(BlogComment blogComment) {		
		int result = blogCommentDao.insertComment(blogComment);
		return result;
	}

	public List<BlogComment> selectCommentList(int blogNo) {
		List<BlogComment> list = blogCommentDao.selectCommentlist(blogNo);
		return list;
	}
	@Transactional
	public int deleteComment(int commentNo) {
		int result = blogCommentDao.deleteComment(commentNo);
		return result;
	}

}
