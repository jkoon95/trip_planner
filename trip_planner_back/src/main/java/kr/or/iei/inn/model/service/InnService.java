package kr.or.iei.inn.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.inn.model.dao.InnDao;

@Service
public class InnService {
	@Autowired
	private InnDao innDao;

	public List selectRoomOption() {
		
		return innDao.selectRoomOption();
	}
}
