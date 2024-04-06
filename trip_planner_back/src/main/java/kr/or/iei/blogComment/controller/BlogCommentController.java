package kr.or.iei.blogComment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.blogComment.model.service.BlogCommentService;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/blogComment")
public class BlogCommentController {
	private BlogCommentService blogCommentService;
}
