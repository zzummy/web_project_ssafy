import { sidoList, gugunList, houseList } from "@/api/house.js";
// import { sidoList, gugunList, houseList, dongList } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    //dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    positions: [],
    // map: null, // map 객체
    // markers: [], // markers 마커 담을 객체
    // geocoder: null, // 주소로 장소 표시하기 위한  https://apis.map.kakao.com/web/sample/addr2coord/
    // ps: null, // 장소 검색 객체
    // infowindow: null, // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우
    // customOverlay: [], // 커스텀 오버레이
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({
          value: sido.sidoCode,
          text: sido.sidoName,
        });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({
          value: gugun.gugunCode,
          text: gugun.gugunName,
        });
      });
    },

    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
      // ADD
      state.houses = [];
      state.house = null;
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
      // add
      state.houses = [];
      state.house = null;
    },

    SET_HOUSE_LIST: (state, houses) => {
      //   console.log(houses);
      state.houses = houses;
      //console.log("houses : " + state.houses);
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    // add
    CLEAR_DETAIL_HOUSE: (state) => {
      state.house = null;
    },

    // 맞나
    SET_POSI_LIST: (state, houses) => {
      state.positions = houses;
      //console.log(state.positions);
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getHouseList: ({ commit }, gugunCode) => {
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
      };
      houseList(
        params,
        (response) => {
          console.log(response.data.response.body.items.item);
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
          commit("SET_POSI_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
    //검색 결과 목록과 마커를 표출하는 함수입니다
    displayMarkers: (places) => {
      var fragment = document.createDocumentFragment();
      var bounds = new kakao.maps.LatLngBounds();
      //var listStr = "";

      // 지도에 표시되고 있는 마커를 제거합니다
      //this.removeMarker();
      for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
        var marker = this.addMarker(placePosition, i);
        var itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title, code, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            this.displayInfowindow(marker, title, place);
            console.log(title + " " + code);
          });

          kakao.maps.event.addListener(this.map, "click", function () {
            console.log(this.customOverlay);
            this.customOverlay.setMap(null);
          });

          itemEl.onmouseover = function () {
            this.displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            this.customOverlay.setMap(null);
          };
        })(marker, places[i].aptName, places[i].aptCode, places[i]);

        fragment.appendChild(itemEl);
      }
      this.map.setBounds(bounds);
    },
    //마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker: (position, idx) => {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
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

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    // removeMarker: () => {
    //   for (var i = 0; i < this.markers.length; i++) {
    //     this.markers[i].setMap(null);
    //   }
    //   this.markers = [];
    // },
    //검색결과 항목을 Element로 반환하는 함수입니다
    getListItem: (index, place) => {
      let el = document.createElement("li");
      let itemStr = `
          <span class="markerbg marker_${index + 1}></span>
          <div class="info"><h5>${place.aptName}</h5> <button>관심등록</button>
          <span>${place.sidoName} ${place.gugunName} ${place.dongName} ${
        place.jibun
      }</span>
          `;
      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    },
    //검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    //인포윈도우에 장소명을 표시합니다
    displayInfowindow: (marker, title, place) => {
      console.log(title);
      var content = `
          <div class="overlaybox">
              <div class="boxtitle">${title}</div>
              <div class="first"><img src="@/assets/apt.png" style="width:247px; height:136px;" alt=""></div>
              <ul>
                  <li class="up">
                      <span class="title">건축년도</span>
                      <span class="count">${place.buildYear}</span>
                  </li>
                  <li>
                      <span class="title">주소</span>
                      <span class="count">${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
                  </li>
                  <li>
                      <span class="title">최신거래금액</span>
                      <span class="count">${place.recentPrice}</span>
                  </li>
                  <li>
                      <span class="last" id="recenthistor" data-toggle="modal" data-target="#myModal">아파트정보 update</span>
                  </li>
              </ul>
          </div>
      `;
      var position = new kakao.maps.LatLng(
        marker.getPosition().getLat() + 0.00033,
        marker.getPosition().getLng() - 0.00003
      );
      if (this.customOverlay !== undefined) this.customOverlay.setMap(null);
      this.customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      this.customOverlay.setMap(this.map);
    },
    //검색결과 목록의 자식 Element를 제거하는 함수입니다
    removeAllChildNods: (el) => {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
  },
};

export default houseStore;
