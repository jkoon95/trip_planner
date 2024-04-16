package kr.or.iei.inn.model.dto;



import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("innReservation")
public class InnReservation {
	private int innBookNo;
	private int memberNo;
	private int roomNo;
	private String guestName;
	private String guestPhone;
	private String guestWish;
	private String checkInDate;
	private String checkOutDate;
	private String bookDate;
	private int bookStatus;
	private int bookGuest;
	private int couponNo;
	
	private String partnerName;
	private int night;
	private String roomName;
	private String innFilepath;
	private String checkInDateStr;
	private String checkOutDateStr;
}
