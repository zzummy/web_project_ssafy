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
        <house-list :key="listkey" />
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
// var overlay;
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
      listkey: -1,
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
      "CLEAR_HOUSE_LIST",
      "SET_HOUSE_LIST",
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
          this.SET_HOUSE_LIST(this.houses);
          this.listkey *= -1;
          this.displayMarker(this.houses);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //검색 결과 목록과 마커를 표출하는 함수입니다
    async displayMarker(houses) {
      console.log("마커지워줘");
      console.log(this.markers.length);
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      // 지도에 표시되고 있는 마커를 제거합니다
      //this.removeMarker();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      var positions = [];
      var houseArr = [];
      await houses.forEach((house) => {
        //console.log("forEach->house");
        //console.log(house);
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
        houseArr.push(house);
      });

      console.log(positions);

      // 주소 -> 좌표 변환 라이브러리
      var geocoder = new kakao.maps.services.Geocoder();
      if (positions.length > 0) {
        positions.forEach(function (addr) {
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
                clickable: true,
              });

              marker.setMap(map);

              // 커스텀 오버레이에 표시할 컨텐츠 입니다
              // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
              // 별도의 이벤트 메소드를 제공하지 않습니다
              // var content =
              //   '<div class="wrap">' +
              //   '    <div class="info">' +
              //   '        <div class="title">' +
              //   houseArr[index].아파트 +
              //   '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
              //   "        </div>" +
              //   '        <div class="body">' +
              //   '            <div class="desc">' +
              //   '                <div class="ellipsis">' +
              //   addr +
              //   '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
              //   '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
              //   "            </div>" +
              //   "        </div>" +
              //   "    </div>" +
              //   "</div>";
              // 마커 위에 커스텀오버레이를 표시합니다
              // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
              // overlay = new kakao.maps.CustomOverlay({
              //   content: content,
              //   map: map,
              //   position: marker.getPosition(),
              // });

              kakao.maps.event.addListener(marker, "click", function () {
                //overlay.setMap(map);
              });

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        });
      }
    },

    // }, // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    // removeMarker() {
    //   console.log("removeMarker");
    //   console.log(this.markers.length);
    //   for (var i = 0; i < this.markers.length; i++) {
    //     this.markers[i].setMap(null);
    //   }
    //   this.markers = [];
    // },
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
    // closeOverlay() {
    //   overlay.setMap(null);
    // },
  },
};
</script>

<style>
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
