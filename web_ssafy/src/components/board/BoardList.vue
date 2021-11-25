<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <p
          style="
            font-weight: bold;
            font-size: 2em;
            color: #3b3838;
            margin: 80px 0px;
          "
        >
          게시판
        </p>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-form-select
          class="mr-2"
          v-model="key"
          size="ms"
          id="select"
          :options="options"
        ></b-form-select>
        <input
          type="text"
          id="word"
          @keyup.enter="searchArticles()"
          class="mr-2"
          v-model="word"
        />
        <b-button
          @click="searchArticles()"
          class="mr-2"
          style="border: 0px; background-color: #426289"
          >검색
        </b-button>
        <b-button
          @click="moveWrite()"
          style="border: 0px; background-color: #426289"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive id="items">
          <b-thead style="background-color: #f2f4f8">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <board-list-row
              v-for="(article, index) in slicedarticles"
              :key="index"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">게시글(QnA)이 없습니다.</b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col>
        <!-- Pagination 처리 -->
        <br /><br />
        <b-pagination
          v-model="currentPage"
          :total-rows="totalrows"
          :per-page="perPage"
          pills
          aria-controls="items"
          align="center"
          @page-click="pageClick"
        ></b-pagination>
        <br /><br />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import BoardListRow from "@/components/board/child/BoardListRow";
import { listArticle } from "@/api/board.js";
import http from "@/util/http-common";

export default {
  name: "BoardList",
  components: {
    BoardListRow,
  },
  data() {
    return {
      // 검색
      key: null,
      options: [
        { value: null, text: "선택" },
        { value: "subject", text: "제목" },
        { value: "content", text: "내용" },
      ],
      word: "",
      articles: [],
      slicedarticles: [],
      perPage: 5,
      currentPage: 1,
      totalrows: 0,
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
        this.totalrows = this.articles.length;
        this.slicedarticles = this.articles.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "BoardWrite" });
    },
    // 검색
    searchArticles() {
      http.get(`/board?key=${this.key}&word=${this.word}`).then(({ data }) => {
        console.log(data);
        let param = {
          pg: this.pg,
          spp: this.spp,
          // pg: 1,
          // spp: 10,
          key: this.key,
          word: this.word,
        };
        listArticle(
          param,
          (response) => {
            this.articles = response.data;
            this.totalrows = this.articles.length;
            this.currentPage = 1;
            this.slicedarticles = this.articles.slice(
              (this.currentPage - 1) * this.perPage,
              this.currentPage * this.perPage
            );
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    pageClick: function (button, page) {
      this.currentPage = page;
      this.slicedarticles = this.articles.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
