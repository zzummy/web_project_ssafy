<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row class="mt-4 mb-4 text-center">
      <b-col class="sm-3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="searchApt"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-button type="button" @click="showHospitalList"
          >코로나 선별 진료소</b-button
        >
      </b-col>
    </b-row>
    <b-row v-if="showHospital">
      <hospital-list
        v-bind:sidoName="sidoName"
        v-bind:gugunName="gugunName"
      ></hospital-list>
    </b-row>
    <br />
    <b-row>
      <b-col cols="4" align="left">
        <house-list />
      </b-col>
      <b-col cols="8">
        <div id="map"></div>
        <div><house-detail /></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import HospitalList from "@/components/hospital/HospitalList.vue";
// import HouseMap from "@/components/house/HouseMap.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import { houseList } from "@/api/house.js";
/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.
  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }  
*/
const houseStore = "houseStore";
var map;
//var marker;
//var markers = [];
export default {
  name: "HouseSearchBar",
  components: {
    HospitalList,
    // HouseMap,
    HouseList,
    HouseDetail,
  },
  data() {
    return {
      sidoCode: null,
      sidoName: null,
      gugunCode: null,
      gugunName: null,
      showHospital: false,
      //houses: [],
      //dongCode: null,
      markers: [],
      // map에서 쓸 안자른 이름
      sidoName2: null,
      //gugunName2: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getHouseList",
      "setMarker",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DETAIL_HOUSE",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      this.getSidoName();
      console.log(this.sidoName);
      if (this.sidoCode) {
        this.getGugun(this.sidoCode);
      }
    },
    searchApt() {
      this.showHospital = false;
      this.getGugunName();
      console.log(this.gugunName);
      if (this.gugunCode) {
        //console.log("gugunCode -> " + this.gugunCode);
        this.getHouseList(this.gugunCode);
        console.log("houses ");
        console.log(this.houses);
        this.getHouseList1(this.gugunCode);
      }
    },
    showHospitalList() {
      if (this.sidoName != null && this.gugunName != null) {
        this.showHospital = !this.showHospital;
      } else {
        alert("지역을 선택하세요");
      }
    },
    getSidoName() {
      this.sidos.forEach((sido) => {
        if (sido.value === this.sidoCode) {
          this.sidoName = sido.text.substring(0, 2);
          this.sidoName2 = sido.text;
        }
      });
    },
    getGugunName() {
      this.guguns.forEach((gugun) => {
        if (gugun.value === this.gugunCode) {
          this.gugunName = gugun.text;
        }
      });
    },
    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      map = new kakao.maps.Map(mapContainer, mapOption);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      map.relayout();
    },
    getHouseList1(gugunCode) {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      //   const SERVICE_KEY =
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(SERVICE_KEY),
        pageNo: encodeURIComponent("1"),
        numOfRows: encodeURIComponent("100"),
      };
      houseList(
        params,
        (response) => {
          // console.log(response.data.response.body.items.item);
          this.houses = response.data.response.body.items.item;
          this.displayMarker(this.houses);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //검색 결과 목록과 마커를 표출하는 함수입니다
    async displayMarker(houses) {
      // if (this.markers.length > 0) {
      //   this.markers.forEach((marker) => marker.setMap(null));
      // }
      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      var positions = [];
      await houses.forEach((house) => {
        console.log("forEach->house");
        console.log(house);
        const sido = this.sidoName2;
        // const sido = this.sidoName;
        console.log(sido);
        //const gugun = this.gugunName;
        //const dong = house.법정동;
        const street = house.도로명;
        const jibun = house.도로명건물본번호코드;
        const addr = sido + " " + street + " " + jibun;
        // const addr = sido + " " + gugun + dong + " " + jibun;
        //console.log(addr);
        positions.push(addr);
      });
      console.log(positions);
      // 주소 -> 좌표 변환 라이브러리
      var geocoder = new kakao.maps.services.Geocoder();
      if (positions.length > 0) {
        positions.forEach(function (addr, index) {
          geocoder.addressSearch(addr, function (result, status) {
            //console.log(result);
            console.log(status);
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              var imageSrc =
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
              var imageSize = new kakao.maps.Size(24, 35);
              var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage, // 마커이미지 설정
              });
              marker.setMap(map);
              var infowindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">' +
                  positions[index] +
                  "</div>",
              });
              infowindow.open(map, marker);
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        });
      }
    },
    //마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    // addMarker(position, idx, title) {
    //   var imageSrc =
    //       "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //     imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    //     imgOptions = {
    //       spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    //       spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    //       offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    //     },
    //     markerImage = new kakao.maps.MarkerImage(
    //       imageSrc,
    //       imageSize,
    //       imgOptions
    //     ),
    //     marker = new kakao.maps.Marker({
    //       position: position, // 마커의 위치
    //       image: markerImage,
    //     });
    //   marker.setMap(map); // 지도 위에 마커를 표출합니다
    //   markers.push(marker); // 배열에 생성된 마커를 추가합니다
    //   return marker;
    // }, // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      console.log("removeMarker");
      console.log(this.markers.length);
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
  },
};
</script>

<style></style>
