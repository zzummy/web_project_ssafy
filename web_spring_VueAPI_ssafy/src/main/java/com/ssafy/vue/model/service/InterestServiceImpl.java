package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.BaseAddressDto;
import com.ssafy.vue.model.UserLocDto;
import com.ssafy.vue.model.mapper.InterestMapper;

@Service
public class InterestServiceImpl implements InterestService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public int interestCheck(UserLocDto userLocDto) throws Exception {
		return sqlSession.getMapper(InterestMapper.class).interestCheck(userLocDto);
	}

	@Override
	public BaseAddressDto getAddress(String sido, String gugun, String dong) throws Exception {
		return sqlSession.getMapper(InterestMapper.class).getAddress(new BaseAddressDto(sido, gugun, dong));
	}

	@Override
	public List<UserLocDto> getInterest(String userId) throws Exception {
		return sqlSession.getMapper(InterestMapper.class).getInterest(userId);
	}
	
	@Override
	public List<BaseAddressDto> getInterests(String userId) throws Exception {
		return sqlSession.getMapper(InterestMapper.class).getInterests(userId);
	}

	@Override
	public void registerInterest(UserLocDto userLocDto) throws Exception {
		sqlSession.getMapper(InterestMapper.class).registerInterest(userLocDto);
	}

	@Override
	public List<BaseAddressDto> getTops() throws Exception {
		return sqlSession.getMapper(InterestMapper.class).getTops();
	}

}
