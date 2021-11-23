package com.ssafy.vue.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.vue.model.HospitalDto;
import com.ssafy.vue.model.SidoGugunCodeDto;
import com.ssafy.vue.model.service.HospitalService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/hospital")
@Api("Hospital 컨트롤러  API V1")
public class HospitalController {
	
	private final Logger logger = LoggerFactory.getLogger(HospitalController.class);

	@Autowired
	private HospitalService hospitalService;
	
	@ApiOperation(value = "코로나 선별 진료소 정보", notes = "코로나 선별 진료소를 반환한다.", response = List.class)
	@PostMapping("/list")
	public ResponseEntity<List<HospitalDto>> listHospital(@RequestBody @ApiParam(value = "시구군 정보.", required = true) SidoGugunCodeDto sidoGugunCodeDto) throws Exception {
		
		logger.info("hospital sido - {}", sidoGugunCodeDto.getSidoName());
		logger.info("hospital gugun - {}", sidoGugunCodeDto.getGugunName());
		return new ResponseEntity<List<HospitalDto>>(hospitalService.listHospital(sidoGugunCodeDto), HttpStatus.OK);
	}
}
