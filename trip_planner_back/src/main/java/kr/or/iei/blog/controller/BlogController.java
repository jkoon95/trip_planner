package kr.or.iei.blog.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.or.iei.ResponseDTO;
import kr.or.iei.blog.model.dao.BlogDao;
import kr.or.iei.blog.model.dto.Blog;
import kr.or.iei.blog.model.dto.BlogDate;
import kr.or.iei.blog.model.service.BlogService;
import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.trip.model.dto.Trip;
import kr.or.iei.util.FileUtils;
import kr.or.iei.util.Pagination;

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
	
	@GetMapping(value="/list/{reqPage}")
	public ResponseEntity<ResponseDTO> blogList(@PathVariable int reqPage) {
		Map map = blogService.selectBlogList(reqPage);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	
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
		if(result == true) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}		
		
	}
	
	@GetMapping(value="/one/{blogNo}")
	public ResponseEntity<ResponseDTO> selectOneBlog(@PathVariable int blogNo){
		Map<String, Object> blog = blogService.selectOneBlog(blogNo);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", blog);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
	}
	
	@DeleteMapping(value="{blogNo}")
	public ResponseEntity<ResponseDTO> deleteBlog(@PathVariable int blogNo){
		List<BlogDate> list = blogService.deleteBlog(blogNo);
		if(list != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", null);
			return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());
		}else {
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
		return new ResponseEntity<ResponseDTO>(response,response.getHttpStatus());			
		}
	}
	
	@Operation(summary = "내 블로그 리스트 조회", description = "내 블로그 리스트 조회")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping(value="/myBlogList/{reqPage}")
	public ResponseEntity<ResponseDTO> selectMyBlogList(@PathVariable int reqPage, @RequestAttribute String memberEmail){
		List<Blog> myBlogList = blogService.selectMyBlogList(reqPage, memberEmail);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", myBlogList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
	
	@Operation(summary = "메인 블로그리스트 호출", description = "메인 블로그리스트 호출")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping(value="/main/blogList")
	public ResponseEntity<ResponseDTO> selectMainBlogList() {
		List<Blog> blogList = blogService.selectMainBlogList();
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", blogList);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}
}
