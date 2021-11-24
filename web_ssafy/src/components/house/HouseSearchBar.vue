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
    };
  },
  computed: {
    ...mapState(houseStore, [
      "houses",
      "sidos",
      "guguns",
      "houses",
      // "map",
      // "ps",
      // "geocoder",
      // "infowindow",
      // "customOverlay",
    ]),
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
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      //"CLEAR_DONG_LIST",
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
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      this.showHospital = false;
      this.getGugunName();
      console.log(this.gugunName);
      if (this.gugunCode) {
        this.getHouseList(this.gugunCode);
      }
      this.displayMarker(this.houses);
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
    displayMarker(houses) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      // var geocoder = new kakao.maps.services.Geocoder();

      // geocoder.addressSearch(
      //   "제주특별자치도 제주시 첨단로 242",
      //   function (result, status) {
      //     // 정상적으로 검색이 완료됐으면
      //     if (status === kakao.maps.services.Status.OK) {
      //       var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      //       // 결과값으로 받은 위치를 마커로 표시합니다
      //       var marker = new kakao.maps.Marker({
      //         map: map,
      //         position: coords,
      //       });

      //       // 인포윈도우로 장소에 대한 설명을 표시합니다
      //       var infowindow = new kakao.maps.InfoWindow({
      //         content:
      //           '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
      //       });
      //       infowindow.open(map, marker);

      //       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      //       map.setCenter(coords);
      //     }
      //   }
      // );

      var markerPositions = [];
      var addrs = [];
      houses.forEach((house) => {
        markerPositions.push([house.lat, house.lng]);
        addrs.push(house);
      });

      console.log("addrs");
      console.log(markerPositions);
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      console.log(houses[0].lat);

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        map.setBounds(bounds);
      }
    },
  },
};
</script>

<style></style>
