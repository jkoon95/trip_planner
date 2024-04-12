package kr.or.iei.blog.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blog.model.dto.BlogDate;
import kr.or.iei.trip.model.dto.Trip;
import kr.or.iei.util.PageInfo;


@Mapper
public interface BlogDao {

	int insertBlog(Blog blog);

	int insertBlogDate(BlogDate bd);

	int totalCount();

	List selectBlogList(PageInfo pi);

	Blog selectOneBlog(int blogNo);

	List selectOneBlogDate(int blogNo);

	int deleteBlog(int blogNo);

	List<Blog> selectMyBlogList(String memberEmail, int start, int end);

}
