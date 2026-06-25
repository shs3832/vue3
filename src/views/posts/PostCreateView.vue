<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <form @submit.prevent="savePost">
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
          <button type="button" class="btn btn-outline-dark" @click="goListPage">목록</button>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary" :disabled="stateSave">저장</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts.js";
import { ref } from "vue";

const router = useRouter();
const goListPage = () => {
  router.push({ name: "postList" });
};

const form = ref({
  title: null,
  contents: null,
});

const stateSave = ref(false);

const savePost = async () => {
  try {
    if (!form.value.title || !form.value.contents) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const data = { ...form.value, createdAt: new Date().toISOString() };
    stateSave.value = true;
    await createPost(data);
    router.push({ name: "postList" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
