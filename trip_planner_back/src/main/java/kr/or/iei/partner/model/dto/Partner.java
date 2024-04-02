package kr.or.iei.partner.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="partner")
@Schema(description = "업체 객체")
public class Partner {
	private int partnerNo;
	private int memberNo;
	private String partnerName;
	private String partnerTel;
	private int partnerType;
	private int partnerStatus;
	private String businessNo;
	private String memberEmail;
}
