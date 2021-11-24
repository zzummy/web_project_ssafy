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
    map: null, // map 객체
    //markers: [], // markers 마커 담을 객체
    // geocoder: null, // 주소로 장소 표시하기 위한  https://apis.map.kakao.com/web/sample/addr2coord/
    // ps: null, // 장소 검색 객체
    // infowindow: null, // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우
    // customOverlay: [], // 커스텀 오버레이,
  },

  getters: {},

  mutations: {
    SET_HOUSE_LIST: (state, houses) => {
      console.log("SET_HOUSE_LIST");
      state.houses = houses;
    },
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
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_MARKER: (state) => {
      var houses = state.houses;
      console.log("SET_MARKER");
      console.log(houses);
    },
    CLEAR_HOUSE_LIST: (state) => {
      state.houses = [];
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
      // ADD
      // state.houses = [];
      // state.house = null;
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
      // add
      // state.houses = [];
      // state.house = null;
    },

    // add
    CLEAR_DETAIL_HOUSE: (state) => {
      state.house = null;
    },

    CLEAR_MAP: (state) => {
      console.log("CLEAR_MAP");
      state.map = null;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("CLEAR_HOUSE_LIST");
          commit("CLEAR_SIDO_LIST");
          commit("CLEAR_GUGUN_LIST");
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
          commit("CLEAR_GUGUN_LIST");
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
        pageNo: encodeURIComponent("1"),
        numOfRows: encodeURIComponent("100"),
      };
      houseList(
        params,
        (response) => {
          // console.log(response.data.response.body.items.item);
          commit("CLEAR_HOUSE_LIST");
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
          commit("SET_MARKER");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    setMarker: ({ commit }) => {
      commit("SET_MARKER");
      return 0;
    },
    detailHouse: ({ commit }, house) => {
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
