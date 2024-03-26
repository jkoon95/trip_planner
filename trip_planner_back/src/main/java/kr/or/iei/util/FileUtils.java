package kr.or.iei.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class FileUtils {
	//저장경로, 파일객체를 매개변수로 받아서
	//해당 저장경로에 파일명이 중복되지 않도록 업로드하고, 업로드한 파일명을 리턴
	public String upload(String savepath, MultipartFile file) {
		//원본 파일명 추출 => test.txt
		String filename = file.getOriginalFilename();
		//test.txt	->	test		.txt
		String onlyFilename = filename.substring(0, filename.lastIndexOf("."));//파일명에 .이 여러군데 있을 수 있기 때문에 가장 마지막 .을 기준으로 자르기
		String extention = filename.substring(filename.lastIndexOf("."));//.부터 끝까지가 확장자니까, .의 위치를 알아내서 넣기(substring은 매개변수가 1개이면 거기서부터 끝까지 자름)
		//실제 업로드할 파일명
		String filepath = null;
		//중복파일명이 있으면 1씩 증가시키면서 뒤에 붙일 숫자
		int count = 0;
		while(true) {
			if(count == 0) {
				//첫 번째의 경우는 숫자를 붙이지 않고 바로 검증
				filepath = onlyFilename+extention;
			}else {
				//파일명에 숫자를 붙여서 생성
				filepath = onlyFilename+"_"+count+extention;//test_1.txt
			}
			//위에 if로 만든 파일명이 사용중인지 체크
			File checkFile = new File(savepath+filepath);//저장경로+파일명
			if(!checkFile.exists()) {
				break;
			}
			count++;
		}
		//파일명 중복체크 끝 -> 내가 업로드할 파일명 결정 -> 파일업로드 진행
		
		try {
			//중복처리 끝난 파일명으로 파일 업로드
			file.transferTo(new File(savepath+filepath));//저장경로+파일명
		} catch (IllegalStateException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filepath;
	}

	public void downloadFile(String savepath, String filename, String filepath, HttpServletResponse response) {
		String downFile = savepath+filepath;
		
		try {
			//파일을 JAVA로 읽어오기 위한 주 스트림 생성
			FileInputStream fis = new FileInputStream(downFile);
			//속도개선을 위한 보조스트림 생성
			BufferedInputStream bis = new BufferedInputStream(fis);
			
			//읽어온 파일을 사용자에게 내보낼 주스트림 생성
			ServletOutputStream sos = response.getOutputStream();
			//속도개선을 위한 보조스트림 생성
			BufferedOutputStream bos = new BufferedOutputStream(sos);
			
			//다운로드할 파일이름(사용자가 받았을 때 파일이름) 처리
			String resFilename = new String(filename.getBytes("UTF-8"),"ISO-8859-1");
			
			//파일다운로드를 위한 HTTP 헤더 설정(이걸 보고 브라우저가 해석해서 다운로드를 걸어주는 것)
			response.setContentType("application/octet-stream");//파일이라고 알려주고
			response.setHeader("Content-Disposition", "attachment;filename="+resFilename);//파일명을 알려줌
			
			//파일전송
			while(true) {
				int read = bis.read();
				if(read != -1) {
					bos.write(read);
				}else {
					break;
				}
			}
			bos.close();
			bis.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void deleteFile(String savepath, String filepath) {
		File delFile = new File(savepath+filepath);
		delFile.delete();
	}
}







