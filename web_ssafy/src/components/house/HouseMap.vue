<template>
  <div>
    <div id="map"></div>
    <div>houses : {{ house.아파트명 }}</div>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseMap",
  data() {
    return {
      map: "",
      ps: "",
      geocoder: "",
      infowindow: "",
      customOverlay: [],
      markers: [],
      addrs: [],
    };
  },
  props: {
    house: Object,
  },
  computed: {
    ...mapState(houseStore, [
      //"houses",
      //"positions",
      // "map",
      // "ps",
      // "geocoder",
      // "infowindow",
      // "customOverlay",
      // "markers",
    ]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
      // script.src =
      // "//dapi.kakao.com/v2/maps/sdk.js?appkey=7daa1b2d5ecfca50e68fb4372634829d&libraries=services";

      document.head.appendChild(script);
    }
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun"]),
    //   "CLEAR_SIDO_LIST",
    //   "CLEAR_GUGUN_LIST",
    //   "CLEAR_DETAIL_HOUSE",
    // ]),
    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 장소 검색 객체를 생성합니다
      //var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 커스텀 오버레이를 생성합니다
      //var customOverlay;

      //주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      console.log(this.positions.length);
      for (let index = 0; index < this.positions.length; index++) {
        this.addrs[index] =
          "서울특별시 " +
          this.positions[index].법정동 +
          " " +
          this.positions[index].지번;
        console.log(this.addrs[index]);
      }
      console.log("addrs");
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(
        "제주특별자치도 제주시 첨단로 242",
        function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        }
      );
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 450px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
