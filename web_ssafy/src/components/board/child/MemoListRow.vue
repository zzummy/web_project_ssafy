<template>
  <b-row class="mb-1">
    <b-col>
      <b-card
        :header-html="`<div><h6>${userid} (${memotime})</h6></div>`"
        class="mb-2 text-left"
        border-variant="dark"
        no-body
      >
        <b-card-body class="text-left">
          <div v-text="comment"></div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
// import moment from "moment";

export default {
  name: "MemoListRow",
  props: {
    memono: Number,
    userid: String,
    comment: String,
    memotime: String,
    articleno: Number,
  },
  computed: {
    // changeDateFormat() {
    //   return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    // },
  },
};
</script>

<style></style>
