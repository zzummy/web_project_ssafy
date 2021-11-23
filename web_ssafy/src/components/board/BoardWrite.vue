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
          글 작성
        </p>
      </b-col>
    </b-row>
    <board-write-form type="register" />
  </b-container>
</template>

<script>
import BoardWriteForm from "./child/BoardWriteForm.vue";

export default {
  name: "BoardWrite",
  components: {
    BoardWriteForm,
  },
};
</script>

<style></style>
