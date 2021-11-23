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
          공지 작성
        </p>
      </b-col>
    </b-row>
    <notice-write-form type="register" />
  </b-container>
</template>

<script>
import NoticeWriteForm from "./child/NoticeWriteForm.vue";

export default {
  name: "NoticeWrite",
  components: {
    NoticeWriteForm,
  },
};
</script>

<style></style>
