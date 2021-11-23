package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.HospitalDto;
import com.ssafy.vue.model.SidoGugunCodeDto;

public interface HospitalService {

	public List<HospitalDto> listHospital(SidoGugunCodeDto sidoGugunCodeDto) throws Exception;

}
