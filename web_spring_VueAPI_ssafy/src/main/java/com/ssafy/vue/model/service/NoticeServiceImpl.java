package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.util.PageNavigation;
import com.ssafy.vue.model.NoticeDto;
import com.ssafy.vue.model.NoticeParameterDto;
import com.ssafy.vue.model.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public boolean writeNotice(NoticeDto noticeDto) throws Exception {
		if(noticeDto.getSubject() == null || noticeDto.getContent() == null) {
			throw new Exception();
		}
		return sqlSession.getMapper(NoticeMapper.class).writeNotice(noticeDto) == 1;
	}

	@Override
	public List<NoticeDto> listNotice(NoticeParameterDto noticeParameterDto) throws Exception {
		int start = noticeParameterDto.getPg() == 0 ? 0 : (noticeParameterDto.getPg() - 1) * noticeParameterDto.getSpp();
		noticeParameterDto.setStart(start);		
		return sqlSession.getMapper(NoticeMapper.class).listNotice(noticeParameterDto);
	}
	
	@Override
	public List<NoticeDto> listNoticeAll() throws Exception {
		return sqlSession.getMapper(NoticeMapper.class).listNoticeAll();
	}

	@Override
	public PageNavigation makePageNavigation(NoticeParameterDto noticeParameterDto) throws Exception {
		int naviSize = 5;
		PageNavigation pageNavigation = new PageNavigation();
		pageNavigation.setCurrentPage(noticeParameterDto.getPg());
		pageNavigation.setNaviSize(naviSize);
		int totalCount = sqlSession.getMapper(NoticeMapper.class).getTotalCount(noticeParameterDto);//총글갯수  269
		pageNavigation.setTotalCount(totalCount);  
		int totalPageCount = (totalCount - 1) / noticeParameterDto.getSpp() + 1;//27
		pageNavigation.setTotalPageCount(totalPageCount);
		boolean startRange = noticeParameterDto.getPg() <= naviSize;
		pageNavigation.setStartRange(startRange);
		boolean endRange = (totalPageCount - 1) / naviSize * naviSize < noticeParameterDto.getPg();
		pageNavigation.setEndRange(endRange);
		pageNavigation.makeNavigator();
//		System.out.println("totalCount : "+ totalCount);
//		System.out.println("totalPageCount : "+ totalPageCount);
		return pageNavigation;
	}

	@Override
	public NoticeDto getNotice(int noticeno) throws Exception {
		return sqlSession.getMapper(NoticeMapper.class).getNotice(noticeno);
	}
	
	@Override
	public void updateHit(int noticeno) throws Exception {
		sqlSession.getMapper(NoticeMapper.class).updateHit(noticeno);
	}

	@Override
	@Transactional
	public boolean modifyNotice(NoticeDto noticeDto) throws Exception {
		return sqlSession.getMapper(NoticeMapper.class).modifyNotice(noticeDto) == 1;
	}

	@Override
	@Transactional
	public boolean deleteNotice(int noticeno) throws Exception {
		return sqlSession.getMapper(NoticeMapper.class).deleteNotice(noticeno) == 1;
	}
}