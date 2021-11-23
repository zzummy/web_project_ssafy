package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.HospitalDto;
import com.ssafy.vue.model.SidoGugunCodeDto;

@Mapper
public interface HospitalMapper {
	
	public List<HospitalDto> listHospital(SidoGugunCodeDto sidoGugunCodeDto) throws SQLException;
}
