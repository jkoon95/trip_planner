package kr.or.iei.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.ResponseDTO;
import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blog.model.service.BlogService;
import kr.or.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/blog")
public class BlogController {
	@Autowired
	private BlogService blogService;
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	private String root;
	
	@PostMapping(value="/editor")
	public ResponseEntity<ResponseDTO> editorUpload(@ModelAttribute MultipartFile image){
		String savepath = root + "/blogEditor/";
		String filepath = fileUtils.upload(savepath, image);
		String returnPath = "/blog/editor/"+filepath;
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", returnPath);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	
	@PostMapping
	public ResponseEntity<ResponseDTO> insertBlog(@ModelAttribute Blog blog, @RequestAttribute String memberEmail){
		int result = blogService.insertBlog(blog, memberEmail);
		if(result == 1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}
	}
}