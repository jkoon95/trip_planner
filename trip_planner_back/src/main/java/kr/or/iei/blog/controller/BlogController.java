package kr.or.iei.blog.controller;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.iei.ResponseDTO;
import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blog.model.dto.BlogDate;
import kr.or.iei.blog.model.service.BlogService;
import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/blog")
public class BlogController {
	@Autowired
	private BlogService blogService;	
	@Autowired
	private FileUtils fileUtils;	
	@Autowired
	private MemberService memberService;
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
	public ResponseEntity<ResponseDTO> insertBlog(@ModelAttribute Blog blog, @ModelAttribute MultipartFile thumbnail) throws JsonMappingException, JsonProcessingException{	
		String blogTitle = blog.getBlogTitle();
		String blogDateDay = blog.getBlogDateDay();
		String memberNickName = blog.getMemberNickName();
		
		ObjectMapper om = new ObjectMapper();
		List<List<LinkedHashMap<String, String>>> blogDateList = (List<List<LinkedHashMap<String, String>>>)om.readValue(blogDateDay, List.class);
		
		String savepath = root + "/blogEditor/";	
		String filepath = fileUtils.upload(savepath, thumbnail);
		
		blog.setBlogThumbnail(filepath);
		
		boolean result = blogService.insertBlog(blog,blogDateList);
		System.out.println(result);
		if(result == true) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}		
		
	}
}
