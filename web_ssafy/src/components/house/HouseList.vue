<template>
  <b-row>
    <b-col align="left">
      <b-container
        v-if="houses && houses.length != 0"
        class="bv-example-row mt-3"
      >
        <p style="color: #3b3838">검색결과 : {{ houses.length }}</p>
        <b-table
          :items="houses"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked
          id="housedetail"
        >
          <template #cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template>
          <template #cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              상세정보 {{ row.detailsShowing ? "숨기기" : "보기" }}
            </b-button>
          </template>
          <template #row-details="row">
            <b-card class="text-left">
              <li>평일 운영시간 : {{ row.item.optimeWeekday }}</li>
              <li>토요일 운영시간 : {{ row.item.optimeSat }}</li>
              <li>일요일/공휴일 운영시간 : {{ row.item.optimeSun }}</li>
              <li>기타사항 : {{ row.item.etc }}</li>
            </b-card>
          </template>
          <house-list-row
            :house="row"
            style="border-bottom: 1px solid #c0c4ca"
          />
        </b-table>
        <!-- pagination -->
        <b-row>
          <b-col></b-col>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
              aria-controls="housedetail"
            ></b-pagination>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
      <b-container v-else class="bv-example-row mt-3">
        <b-row>
          <b-col><p class="underline">검색된 주택 목록이 없습니다.</p> </b-col>
        </b-row>
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapActions, mapState, mapMutations } from "vuex";
//import HouseMap from "@/components/house/HouseMap.vue";

const houseStore = "houseStore";
//var map;

export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {
      fields: [
        {
          key: "일련번호",
          label: "일련번호",
        },
        {
          key: "아파트",
          label: "아파트",
        },
        {
          key: "거래금액",
          label: "거래금액",
        },
        { key: "actions", label: "상세정보" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "sidos", "guguns"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  updated() {
    this.totalRows = this.houses.length;
    console.log(this.totalRows);
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),

    // initMap() {
    //   const mapContainer = document.getElementById("map");
    //   const mapOption = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 5,
    //   };

    //   map = new kakao.maps.Map(mapContainer, mapOption);
    // },
    // changeSize(size) {
    //   const container = document.getElementById("map");
    //   container.style.width = `${size}px`;
    //   container.style.height = `${size}px`;
    //   map.relayout();
    // },
    // displayMarker(houses) {
    //   if (this.markers.length > 0) {
    //     this.markers.forEach((marker) => marker.setMap(null));
    //   }

    //   // var markerPositions = [];
    //   // houses.forEach((house) => {
    //   //   markerPositions.push([house.아파트명, house.lng]);
    //   //   addrs.push(house);
    //   // });
    //   var geocoder = new kakao.maps.services.Geocoder();

    //   geocoder.addressSearch(
    //     "제주특별자치도 제주시 첨단로 242",
    //     function (result, status) {
    //       // 정상적으로 검색이 완료됐으면
    //       if (status === kakao.maps.services.Status.OK) {
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //         // 결과값으로 받은 위치를 마커로 표시합니다
    //         var marker = new kakao.maps.Marker({
    //           map: map,
    //           position: coords,
    //         });

    //         // 인포윈도우로 장소에 대한 설명을 표시합니다
    //         var infowindow = new kakao.maps.InfoWindow({
    //           content:
    //             '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
    //         });
    //         infowindow.open(map, marker);

    //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //         map.setCenter(coords);
    //       }
    //     }
    //   );
    // var markerPositions = [];
    // var addrs = [];
    // houses.forEach((house) => {
    //   markerPositions.push([house.lat, house.lng]);
    //   addrs.push(house);
    // });

    // const positions = markerPositions.map(
    //   (position) => new kakao.maps.LatLng(...position)
    // );

    // console.log(houses[0].lat);

    // if (positions.length > 0) {
    //   this.markers = positions.map(
    //     (position) =>
    //       new kakao.maps.Marker({
    //         map: this.map,
    //         position,
    //       })
    //   );

    //   const bounds = positions.reduce(
    //     (bounds, latlng) => bounds.extend(latlng),
    //     new kakao.maps.LatLngBounds()
    //   );

    //   map.setBounds(bounds);
    // }
    //},
  },
};
</script>

<style>
.underline {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(45, 72, 121, 0.3) 30%
  );
}
#map {
  width: 100%;
  height: 450px;
}
</style>
