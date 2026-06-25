<template>
  <div>
    <h2>게시글 수정</h2>
    <PostForm v-model:title="form.title" v-model:contents="form.contents" @submit.prevent="goEditPage">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goListPage">취소</button>
        <button type="submit" class="btn btn-outline-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getPostById, updatePost } from "@/api/posts.js";
import { ref } from "vue";
import PostForm from "@/components/posts/PostForm.vue";

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
