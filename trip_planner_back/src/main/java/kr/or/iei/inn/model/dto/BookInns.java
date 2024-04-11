package kr.or.iei.inn.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="bookInns")
public class BookInns {
	private String partnerName;
	private int bookStatus;
	private String checkInDate;
	private String checkOutDate;
	private int night;
	private String roomName;
	private int bookGuest;
	private String guestName;
	private String guestPhone;
	private String bookDate;
	private String guestWish;
	private String innFilepath;
}
