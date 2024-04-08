package kr.or.iei.blogComment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.ResponseDTO;
import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blogComment.model.dto.BlogComment;
import kr.or.iei.blogComment.model.service.BlogCommentService;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/blogComment")
public class BlogCommentController {
	@Autowired
	private BlogCommentService blogCommentService;
	
	@PostMapping
	public ResponseEntity<ResponseDTO> insertComment(@ModelAttribute Blog blog ,@ModelAttribute BlogComment blogComment){
		String memberNickName = blogComment.getMemberNickName();
		String commentContent = blogComment.getCommentContent();
		int blogNo = blog.getBlogNo();
		
		
		int result = blogCommentService.insertComment(blogComment);
		if(result > 0) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
		else {ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());			
		}
	}
	@GetMapping(value="/commentList/{blogNo}")
		public ResponseEntity<ResponseDTO> selectCommentList(@PathVariable int blogNo){
			List<BlogComment> list = blogCommentService.selectCommentList(blogNo);
			if(list != null) {
				ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", list);
				return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
			}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());			
			}
		}
	@DeleteMapping(value="{commentNo}")
	public ResponseEntity<ResponseDTO> deleteComment(@PathVariable int commentNo){
		int result = blogCommentService.deleteComment(commentNo);
		if(result > 0){
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());			
		}
	}
}
