package kr.or.iei.inn.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.inn.model.dao.InnDao;

@Service
public class InnService {
	@Autowired
	private InnDao innDao;
}
