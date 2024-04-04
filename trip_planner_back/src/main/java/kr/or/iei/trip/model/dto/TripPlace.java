package kr.or.iei.trip.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("/tripPlace")
@Schema(description = "여행일지 장소 객체")
public class TripPlace {
	private int tripDetailNo;
	private int tripRoute;
	private String tripPlaceName;
	private String tripPlaceCategory;
	private String tripPlaceAddress;
	private String tripPlacePhone;
	private String tripPlaceLat;
	private String tripPlaceLng;
	private String tripTodo;
}