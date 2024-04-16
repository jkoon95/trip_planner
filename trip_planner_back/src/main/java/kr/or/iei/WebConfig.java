package kr.or.iei;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import kr.or.iei.util.LoginInterceptor;


@Configuration
public class WebConfig implements WebMvcConfigurer{
	@Autowired
	private LoginInterceptor loginInterceptor;


	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
		.addResourceHandler("/blog/editor/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/blogEditor/");
		registry
		.addResourceHandler("/blog/blogThumbnail/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/blogEditor/");
		registry
		.addResourceHandler("/inn/innFileList/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/inn/");
		registry
		.addResourceHandler("/inn/innFileRoomList/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/room/");
		registry
		.addResourceHandler("/tour/thumbnail/**","/tour/intronail/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/tour/");
		registry
		.addResourceHandler("/inn/reservationInn/**","/inn/innList/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/inn/");
		registry
		.addResourceHandler("/promotion/promotionThumbnail/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/promotion/");
	}
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//로그인
		registry.addInterceptor(loginInterceptor)
				.addPathPatterns("/member/**","/blog/**","/tour/**","/inn/**","/trip/**", "/admin/**","/coupon/**","/promotion/**", "/mypage/**")				
				.excludePathPatterns("/member/login","/member/join","/member/nickName/*","/member/email/*","/member/businessAuth",
						"/blog/list/*","/tour/thumbnail/*","/tour/intronail/*","/tour","/tour/tourSearch","/tour/tourType","/tour/view/*","/tour/reviewList/*","/tour/topTour",
						"/blog/editor/*","/inn/innList/*","/blog/blogThumbnail/*","/blog/one/*","/inn/reservationInn/*","/inn/innFileList/*","/inn/innFileRoomList/*",
            "/blog/main/*","/inn/main/*","/promotion/main/*");
		
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
