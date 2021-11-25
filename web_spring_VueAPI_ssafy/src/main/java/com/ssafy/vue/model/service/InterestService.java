package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.BaseAddressDto;
import com.ssafy.vue.model.UserLocDto;

public interface InterestService {
	public int interestCheck(UserLocDto userLocDto) throws Exception;
	public BaseAddressDto getAddress(String sido, String gugun, String dong) throws Exception;
	public List<UserLocDto> getInterest(String userId) throws Exception;
	public List<BaseAddressDto> getTops() throws Exception;
	public List<BaseAddressDto> getInterests(String userId) throws Exception;
	public void registerInterest(UserLocDto userLocDto) throws Exception;
	public void plusHit(UserLocDto userLocDto) throws Exception;
	//void deleteInterest() throws Exception;
}
