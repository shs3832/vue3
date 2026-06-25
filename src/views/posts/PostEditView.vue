<template>
  <div>
    <h2>게시글 수정</h2>
    <form @submit.prevent>
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" v-model="form.title" />
      </div>
      <div class="mb-3">
        <label for="contents" class="form-label">내용</label>
        <textarea class="form-control" id="contents" rows="3" v-model="form.contents"></textarea>
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
import { getPostById, updatePost } from "@/api/posts.js";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const form = ref({
  title: null,
  contents: null,
});
const goListPage = () => {
  router.push({ name: "postList" });
};
const fetchPost = async () => {
  const { data } = await getPostById(id);
  setForm(data);
};
const setForm = ({ title, contents }) => {
  form.value.title = title;
  form.value.contents = contents;
};
fetchPost();
const goEditPage = async () => {
  await updatePost(id, { ...form.value });
  router.push({ name: "postDetail", params: { id } });
};
</script>

<style lang="scss" scoped></style>
