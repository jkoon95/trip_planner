package kr.or.iei.blog.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blog.model.dto.BlogDate;


@Mapper
public interface BlogDao {

	int insertBlog(Blog blog);

	int insertBlogDate(BlogDate bd);



}
