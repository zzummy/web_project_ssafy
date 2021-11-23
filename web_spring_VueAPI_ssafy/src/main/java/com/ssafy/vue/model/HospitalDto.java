package com.ssafy.vue.model;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "HospitalDto : 병원정보", description = "코로나 선별진료소의 상세 정보를 나타낸다.")
public class HospitalDto {
	
	@ApiModelProperty(value = "병원일련번호")
	private int hospitalno;
	@ApiModelProperty(value = "등록일")
	private String regtime;
	@ApiModelProperty(value = "시도이름")
	private String sidoName;
	@ApiModelProperty(value = "구군이름")
	private String gugunName;
	@ApiModelProperty(value = "병원이름")
	private String hospitalName;
	@ApiModelProperty(value = "주소")
	private String address;
	@ApiModelProperty(value = "평일 운영시간")
	private String optimeWeekday;
	@ApiModelProperty(value = "토요일 운영시간")
	private String optimeSat;
	@ApiModelProperty(value = "일요일 운영시간")
	private String optimeSun;
	@ApiModelProperty(value = "전화번호")
	private String phonenumber;
	@ApiModelProperty(value = "관할 보건소")
	private String hcenter;
	@ApiModelProperty(value = "관할 보건소 연락처")
	private String hcenterContact;
	@ApiModelProperty(value = "기타사항")
	private String etc;
	
	public int getHospitalno() {
		return hospitalno;
	}
	public void setHospitalno(int hospitalno) {
		this.hospitalno = hospitalno;
	}
	public String getRegtime() {
		return regtime;
	}
	public void setRegtime(String regtime) {
		this.regtime = regtime;
	}
	public String getSidoName() {
		return sidoName;
	}
	public void setSidoName(String sidoName) {
		this.sidoName = sidoName;
	}
	public String getGugunName() {
		return gugunName;
	}
	public void setGugunName(String gugunName) {
		this.gugunName = gugunName;
	}
	public String getHospitalName() {
		return hospitalName;
	}
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getOptimeWeekday() {
		return optimeWeekday;
	}
	public void setOptimeWeekday(String optimeWeekday) {
		this.optimeWeekday = optimeWeekday;
	}
	public String getOptimeSat() {
		return optimeSat;
	}
	public void setOptimeSat(String optimeSat) {
		this.optimeSat = optimeSat;
	}
	public String getOptimeSun() {
		return optimeSun;
	}
	public void setOptimeSun(String optimeSun) {
		this.optimeSun = optimeSun;
	}
	public String getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getHcenter() {
		return hcenter;
	}
	public void setHcenter(String hcenter) {
		this.hcenter = hcenter;
	}
	public String getHcenterContact() {
		return hcenterContact;
	}
	public void setHcenterContact(String hcenterContact) {
		this.hcenterContact = hcenterContact;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	
}
