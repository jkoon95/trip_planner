package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("innFile")
public class InnFile {
	private int innFileNo;
	private int innNo;
	private int roomNo;
	private String innFilePath;
}
