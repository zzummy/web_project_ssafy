package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.vue.model.MemoDto;

public interface MemoMapper {
	public boolean writeMemo(MemoDto memoDto) throws SQLException;
	public List<MemoDto> listMemo(int articleno) throws SQLException;
	public MemoDto getMemo(int memono) throws SQLException;
	public int modifyMemo(MemoDto memoDto) throws SQLException;
	public boolean deleteMemo(int memono) throws SQLException;
}
