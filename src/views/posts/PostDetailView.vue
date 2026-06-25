<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.data }}</p>
    <p class="text-muted">{{ form.contents }}</p>
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
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getPostById } from "../../api/posts";
import { ref } from "vue";

const props = defineProps({
  id: Number,
});

// ref 선언시 반응형 데이터가 되지만 : 객체 할당이 가능, 대체로 ref로 처리하면 좋음
// reactive로 선언시 반응형 데이터가 될수없음 : 객체할당 불가능
const form = ref({});
const router = useRouter();

const fetchPost = () => {
  const result = getPostById(props.id);
  form.value = { ...result };
};
fetchPost();

const goListPage = () => {
  router.push({ name: "postList" });
};
const goEditPage = () => {
  router.push({ name: "postEdit", params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
