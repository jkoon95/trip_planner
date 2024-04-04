package kr.or.iei.trip.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("/tripDetail")
@Schema(description = "여행일지 상세 객체")
public class TripDetail {
	private int tripDetailNo;
	private int tripNo;
	private String tripDay;
	private int tripCost;
	private List<TripPlace> selectPlaceList;
}
