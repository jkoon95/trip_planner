package kr.or.iei.blog.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.blog.model.dao.BlogDao;
import kr.or.iei.blog.model.dto.Blog;

@Service
public class BlogService {
	@Autowired
	private BlogDao blogDao;

	public int insertBlog(Blog blog, String memberEmail) {
		
		return blogDao.insertBlog(blog, memberEmail);
	}
}
