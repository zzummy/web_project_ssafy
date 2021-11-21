package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.MemberDto;
import com.ssafy.vue.model.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public MemberDto login(MemberDto memberDto) throws Exception {
		if(memberDto.getUserid() == null || memberDto.getUserpwd() == null)
			return null;
		return sqlSession.getMapper(MemberMapper.class).login(memberDto);
	}

	@Override
	public MemberDto userInfo(String userid) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).userInfo(userid);
	}

	@Override
	public boolean registerMember(MemberDto memberDto) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).registerMember(memberDto);
	}

	@Override
	public boolean updateMember(MemberDto memberDto) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).updateMember(memberDto);
	}

	@Override
	public boolean deleteMember(String userid) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).deleteMember(userid);
	}

	@Override
	public List<MemberDto> listMember() throws Exception {
		return sqlSession.getMapper(MemberMapper.class).listMember();
	}

}
