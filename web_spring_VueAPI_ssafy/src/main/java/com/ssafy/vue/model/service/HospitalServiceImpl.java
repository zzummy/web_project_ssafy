package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.HospitalDto;
import com.ssafy.vue.model.SidoGugunCodeDto;
import com.ssafy.vue.model.mapper.HospitalMapper;

@Service
public class HospitalServiceImpl implements HospitalService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<HospitalDto> listHospital(SidoGugunCodeDto sidoGugunCodeDto) throws Exception {
		return sqlSession.getMapper(HospitalMapper.class).listHospital(sidoGugunCodeDto);
	}

}
