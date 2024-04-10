package kr.or.iei.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.ResponseDTO;
import kr.or.iei.inn.model.dto.SearchOption;
import kr.or.iei.inn.model.service.InnService;

@CrossOrigin("*")
@RestController
@RequestMapping("/main")
@Tag(name = "MAIN", description = "MAIN API")
public class MainController {
	@Autowired InnService innService;
	
	@Operation(summary = "메인 숙소 검색", description = "메인에서 숙소 검색 시 요청 컨트롤러")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "message 값 확인"),
		@ApiResponse(responseCode = "500", description = "서버 에러")
	})
	@GetMapping(value="/search/inn")
	public ResponseEntity<ResponseDTO> searchInnList(@RequestBody SearchOption searchObj) {
		System.out.println("아아");
		System.out.println(searchObj);
		return null;
	}
}
