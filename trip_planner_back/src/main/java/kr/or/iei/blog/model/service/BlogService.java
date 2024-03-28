package kr.or.iei.blog.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.blog.model.dao.BlogDao;

@Service
public class BlogService {
	@Autowired
	private BlogDao blogDao;
	}
