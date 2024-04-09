package kr.or.iei.blogComment.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.blogComment.model.dto.BlogComment;

@Mapper
public interface BlogCommentDao {

	int insertComment(BlogComment blogComment);

	List<BlogComment> selectCommentlist(int blogNo);

	int deleteComment(int commentNo);

	int modifyComment(BlogComment blogComment);

}
