<template>
  <div class="text-center" style="padding: 0px 100px">
    <b-row class="mt-4 mb-4 text-center">
      <b-col cols="2" class="sm-3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col cols="2" class="sm-3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="searchApt"
        ></b-form-select>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="4" align="left" style="overflow: hidden">
        <house-list :key="listkey" />
      </b-col>
      <b-col cols="8">
        <div class="map_wrap">
          <div id="map"></div>
          <ul id="category">
            <li id="BK9" data-order="0">
              <span class="category_bg bank"></span>
              은행
            </li>
            <li id="MT1" data-order="1">
              <span class="category_bg mart"></span>
              마트
            </li>
            <li id="PM9" data-order="2">
              <span class="category_bg pharmacy"></span>
              약국
            </li>
            <li id="OL7" data-order="3">
              <span class="category_bg oil"></span>
              주유소
            </li>
            <li id="CE7" data-order="4">
              <span class="category_bg cafe"></span>
              카페
            </li>
            <li id="CS2" data-order="5">
              <span class="category_bg store"></span>
              편의점
            </li>
          </ul>
        </div>

        <div align="right" style="margin: 15px 3px">
          <b-button
            type="button"
            @click="showHospitalList"
            style="background-color: #8999ac; border: 0px"
            ><b-icon icon="geo-alt-fill"></b-icon> 코로나 선별 진료소
          </b-button>
        </div>
        <div>
          <b-row v-if="showHospital">
            <hospital-list
              v-bind:sidoName="sidoName"
              v-bind:gugunName="gugunName"
            ></hospital-list>
          </b-row>
        </div>

        <div><house-detail /></div>
      </b-col>
    </b-row>
    <br /><br />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import HospitalList from "@/components/hospital/HospitalList.vue";
// import HouseMap from "@/components/house/HouseMap.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import { houseList } from "@/api/house.js";
/*
  namespaced: true를 사용했기 0때문에 선언해줍니다.
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
var markers = [];
// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
//var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
// 커스텀 오버레이를 생성합니다
var customOverlay;
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
      //markers: [],
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
    this.CLEAR_DETAIL_HOUSE();
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
          this.CLEAR_DETAIL_HOUSE();
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

    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 6,
      };

      map = new kakao.maps.Map(mapContainer, mapOption);
      // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
      var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
        contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
        markers = [], // 마커를 담을 배열입니다
        currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places(map);

      // 지도에 idle 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "idle", searchPlaces);

      // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
      contentNode.className = "placeinfo_wrap";

      // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
      // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
      addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
      addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

      // 커스텀 오버레이 컨텐츠를 설정합니다
      placeOverlay.setContent(contentNode);

      // 각 카테고리에 클릭 이벤트를 등록합니다
      addCategoryClickEvent();

      // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
      function addEventHandle(target, type, callback) {
        if (target.addEventListener) {
          target.addEventListener(type, callback);
        } else {
          target.attachEvent("on" + type, callback);
        }
      }

      // 카테고리 검색을 요청하는 함수입니다
      function searchPlaces() {
        if (!currCategory) {
          return;
        }

        // 커스텀 오버레이를 숨깁니다
        placeOverlay.setMap(null);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
          displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        } else if (status === kakao.maps.services.Status.ERROR) {
          // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        }
      }

      // 지도에 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
        // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
        var order = document
          .getElementById(currCategory)
          .getAttribute("data-order");

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = addMarker(
            new kakao.maps.LatLng(places[i].y, places[i].x),
            order
          );

          // 마커와 검색결과 항목을 클릭 했을 때
          // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
          (function (marker, place) {
            kakao.maps.event.addListener(marker, "click", function () {
              displayPlaceInfo(place);
            });
          })(marker, places[i]);
        }
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, order) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
      function displayPlaceInfo(place) {
        var content =
          '<div class="placeinfo">' +
          '   <a class="title" href="' +
          place.place_url +
          '" target="_blank" title="' +
          place.place_name +
          '">' +
          place.place_name +
          "</a>";

        if (place.road_address_name) {
          content +=
            '    <span title="' +
            place.road_address_name +
            '">' +
            place.road_address_name +
            "</span>" +
            '  <span class="jibun" title="' +
            place.address_name +
            '">(지번 : ' +
            place.address_name +
            ")</span>";
        } else {
          content +=
            '    <span title="' +
            place.address_name +
            '">' +
            place.address_name +
            "</span>";
        }

        content +=
          '    <span class="tel">' +
          place.phone +
          "</span>" +
          "</div>" +
          '<div class="after"></div>';

        contentNode.innerHTML = content;
        placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
        placeOverlay.setMap(map);
      }

      // 각 카테고리에 클릭 이벤트를 등록합니다
      function addCategoryClickEvent() {
        var category = document.getElementById("category"),
          children = category.children;

        for (var i = 0; i < children.length; i++) {
          children[i].onclick = onClickCategory;
        }
      }

      // 카테고리를 클릭했을 때 호출되는 함수입니다
      function onClickCategory() {
        var id = this.id,
          className = this.className;

        placeOverlay.setMap(null);

        if (className === "on") {
          currCategory = "";
          changeCategoryClass();
          removeMarker();
        } else {
          currCategory = id;
          changeCategoryClass(this);
          searchPlaces();
        }
      }

      // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
      function changeCategoryClass(el) {
        var category = document.getElementById("category"),
          children = category.children,
          i;

        for (i = 0; i < children.length; i++) {
          children[i].className = "";
        }

        if (el) {
          el.className = "on";
        }
      }
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      map.relayout();
    },

    //검색 결과 목록과 마커를 표출하는 함수입니다
    displayMarker(houses) {
      // 지도에 표시되고 있는 마커를 제거합니다
      // var fragment = document.createDocumentFragment();
      var bounds = new kakao.maps.LatLngBounds();

      this.removeMarker();

      var positions = [];
      var houseArr = [];

      houses.forEach((house) => {
        //console.log("forEach->house");
        //console.log(house);
        const sido = this.sidoName2;
        // const sido = this.sidoName;
        console.log(sido);
        //const gugun = this.gugunName;
        //const dong = house.법정동;
        const street = house.도로명;
        // 00055 잘라보기
        const code = house.도로명건물본번호코드;
        const jibun = code.substring(code.lastIndexOf(0) + 1);

        // const jibun = house.도로명건물본번호코드;
        const addr = sido + " " + street + " " + jibun;
        // const addr = sido + " " + gugun + dong + " " + jibun;
        //console.log(addr);
        positions.push(addr);
        houseArr.push([house, addr]);
      });

      //console.log(positions);
      console.log("houseArr");
      console.log(houseArr);

      // 주소 -> 좌표 변환 라이브러리
      var geocoder = new kakao.maps.services.Geocoder();
      if (houseArr[0].length > 0) {
        houseArr.forEach(function (arr) {
          geocoder.addressSearch(arr[1], function (result, status) {
            console.log(status);

            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              console.log("lat, lng");
              console.log(result[0].y + " ," + result[0].x);

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

              bounds.extend(coords);
              markers.push(marker);
              marker.setMap(map);

              // 마커와 검색결과 항목에 mouseover 했을때
              // 해당 장소에 인포윈도우에 장소명을 표시합니다
              // mouseout 했을 때는 인포윈도우를 닫습니다
              (function (marker, arr) {
                kakao.maps.event.addListener(marker, "click", function () {
                  // 동코드도 0빼주기
                  // 법정동 0254
                  console.log(arr[0].법정동본번코드);
                  var str = arr[0].법정동본번코드.toString();
                  var a = str.substring(0, 1);
                  //console.log(a);

                  var dongCode;
                  if (a == 0) dongCode = str.substring(str.lastIndexOf(0) + 1);
                  else dongCode = str;

                  // 길찾기로 넘어가기
                  var url =
                    "https://map.kakao.com/link/roadview/" +
                    result[0].y +
                    "," +
                    result[0].x;

                  var content =
                    '<div class="wrap">' +
                    '    <div class="info">' +
                    '        <div class="title">' +
                    arr[0].아파트 +
                    "        </div>" +
                    '        <div class="body">' +
                    '            <div class="img">' +
                    '                <img src="https://lh3.googleusercontent.com/proxy/eHB2-lZ0Lnm-5MC_9VFB9kOU3kbiSoLjM0nnCSWFoHt4JYCCVCNpenTRiKD1yBYiKmFPaGxq92Yx2VDESWa1kE075j89eInDL8vbLfRPx4rg8-HEH9wY5kWMierT7d0nCA" width="73" height="70" >' +
                    "           </div>" +
                    '            <div class="desc">' +
                    '                <div class="ellipsis">' +
                    arr[1] +
                    "</div>" +
                    '                <div class="jibun ellipsis"><span>(지번) ' +
                    arr[0].법정동 +
                    " " +
                    dongCode +
                    "</span></div>" +
                    '                <div><a href="' +
                    url +
                    '" target="_blank" class="link">로드뷰</a></div>' +
                    "            </div>" +
                    "        </div>" +
                    "    </div>" +
                    "</div>";
                  var position = new kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                  );
                  if (customOverlay !== undefined) customOverlay.setMap(null);
                  customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    xAnchor: 0.3,
                    yAnchor: 0.91,
                  });
                  customOverlay.setMap(map);
                });
              })(marker, arr);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        });
      }
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      // console.log("removeMarker");
      // console.log(markers.length);
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    },
  },
};
</script>

<style>
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 450px;
}
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
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
  padding: 7px 0 0 10px;
  height: 40px;
  background: #8999ac;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
  color: #3b3838;
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
  /* border: 1px solid #ddd; */
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
