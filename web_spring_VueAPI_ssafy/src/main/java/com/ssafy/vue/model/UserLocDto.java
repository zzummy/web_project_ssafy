package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "UserLocDto : 유저 관심 지역 정보", description = "유저 관심 지역 정보를 나타낸다.")
public class UserLocDto {
	@ApiModelProperty(value = "유저 아이디")
	private String userid;
	@ApiModelProperty(value = "관심 동코드")
	private String dongcode;
	@ApiModelProperty(value = "조회수")
	private int hit;
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getDongcode() {
		return dongcode;
	}
	public void setDongcode(String dongcode) {
		this.dongcode = dongcode;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
}
