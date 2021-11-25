package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;

@ApiModel(value = "UserLocDto : 유저 관심 지역 정보", description = "유저 관심 지역 정보를 나타낸다.")
public class UserLocDto {
	
	private String userId;
	private String dongCode;
	private int hit;
	
	public UserLocDto(String userId, String dongCode, int hit) {
		super();
		this.userId = userId;
		this.dongCode = dongCode;
		this.hit = hit;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDongCode() {
		return dongCode;
	}
	public void setDongCode(String dongCode) {
		this.dongCode = dongCode;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
}
