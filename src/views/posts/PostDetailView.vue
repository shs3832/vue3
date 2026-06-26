<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.data }}</p>
    <p class="text-muted">{{ post.contents }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format("YYYY. MM. DD HH:mm:ss") }}
    </p>
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="goDeleteItem">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { deletePost, getPostById } from "@/api/posts.js";
import { ref } from "vue";

const props = defineProps({
  id: Number,
});

// ref 선언시 반응형 데이터가 되지만 : 객체 할당이 가능, 대체로 ref로 처리하면 좋음
// reactive로 선언시 반응형 데이터가 될수없음 : 객체할당 불가능
const post = ref({});
const router = useRouter();

const fetchPost = async () => {
  const { data } = await getPostById(props.id);
  setPost(data);
};
const setPost = ({ title, contents, createdAt }) => {
  post.value.title = title;
  post.value.contents = contents;
  post.value.createdAt = createdAt;
};
fetchPost();

const goListPage = () => {
  router.push({ name: "postList" });
};
const goEditPage = () => {
  router.push({ name: "postEdit", params: { id: props.id } });
};
const goDeleteItem = async () => {
  try {
    if (!confirm("삭제하시겠습니까")) return;
    await deletePost(props.id);
    alert("삭제되었습니다.");
    router.push({ name: "postList" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
