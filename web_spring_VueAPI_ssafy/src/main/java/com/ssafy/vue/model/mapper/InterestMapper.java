package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.vue.model.BaseAddressDto;
import com.ssafy.vue.model.UserLocDto;

public interface InterestMapper {
	int interestCheck(UserLocDto userLocDto) throws SQLException;
	BaseAddressDto getAddress(BaseAddressDto baseAddressDto) throws SQLException;
	List<UserLocDto> getInterest(String userId) throws SQLException;
	List<BaseAddressDto> getInterests(String userId) throws SQLException;
	List<BaseAddressDto> getTops() throws SQLException;
	void registerInterest(UserLocDto userLocDto) throws SQLException;
	void plusHit(UserLocDto userLocDto) throws SQLException;
	
	//void deleteInterest() throws Exception;
}
