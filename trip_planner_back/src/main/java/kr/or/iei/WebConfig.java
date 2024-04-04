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
		.addResourceLocations("file:///C:/Temp/trip_planner/");
		registry
		.addResourceHandler("/blog/blogThumbnail/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/blogEditor/");
		registry
		.addResourceHandler("/tour/thumbnail/**","/tour/intronail/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/tour/");
		registry
		.addResourceHandler("/inn/reservationInn/**")
		.addResourceLocations("file:///C:/Temp/trip_planner/inn/");
	}
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(loginInterceptor)
				.addPathPatterns("/member/**","/blog/**","/tour/**","/inn/**","/trip/**")				
				.excludePathPatterns("/member/login","/member/join","/member/nickName/*","/member/email/*","/member/businessAuth",
						"/bloglist/*","/tour/thumbnail/*","/tour/intronail/"
								+ "*","/blog/editor/*","/inn/innList/*","/blog/blogThumbnail/*");

	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
