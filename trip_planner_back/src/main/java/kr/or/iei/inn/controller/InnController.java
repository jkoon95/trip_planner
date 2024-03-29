package kr.or.iei.inn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.inn.model.service.InnService;

@RestController
@RequestMapping("/inn")
@CrossOrigin("*")
public class InnController {
	@Autowired
	private InnService innService;
}
