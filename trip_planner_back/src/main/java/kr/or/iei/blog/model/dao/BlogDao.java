package kr.or.iei.blog.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blog.model.dto.BlogDate;
import kr.or.iei.util.PageInfo;


@Mapper
public interface BlogDao {

	int insertBlog(Blog blog);

	int insertBlogDate(BlogDate bd);

	int totalCount();

	List selectBlogList(PageInfo pi);



}
