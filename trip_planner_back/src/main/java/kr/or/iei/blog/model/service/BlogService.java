package kr.or.iei.blog.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.blog.model.dao.BlogDao;
import kr.or.iei.blog.model.dto.Blog;

@Service
public class BlogService {
	@Autowired
	private BlogDao blogDao;
	
	@Transactional
	public int insertBlog(Blog blog, String memberEmail) {
		int result = blogDao.insertBlog(blog, memberEmail);
		if(result == 1) {
			result = blogDao.insertBlogDate(blog);
		}
		return result;
	}
}
