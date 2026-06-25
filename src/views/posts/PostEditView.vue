<template>
  <div>
    <h2>게시글 수정</h2>
    <form @submit.prevent>
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" />
      </div>
      <div class="mb-3">
        <label for="contents" class="form-label">내용</label>
        <textarea class="form-control" id="contents" rows="3"></textarea>
      </div>
      <div class="row g-2">
        <div class="col-auto">
          <button class="btn btn-outline-danger" @click="goListPage">취소</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const goListPage = () => {
  router.push({ name: "postList" });
};
const goEditPage = () => {
  router.push({ name: "postEdit", params: { id } });
};
</script>

<style lang="scss" scoped></style>
