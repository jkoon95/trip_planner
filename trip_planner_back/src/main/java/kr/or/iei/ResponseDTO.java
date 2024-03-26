package kr.or.iei;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor//모든매개변수가있는 생성자
@Getter	//getter
public class ResponseDTO {
	private int code;
	private HttpStatus httpStatus;
	private String message;
	private Object data;
}
