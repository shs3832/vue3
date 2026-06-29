<template>
  <AppLoading v-if="loading" />
  <AppError :message="error.message" v-else-if="error" />
  <div v-else>
    <AppError v-if="removeError" :message="removeError.message" />
    <div>
      <h2>{{ post?.title }}</h2>
      <p>{{ post?.data }}</p>
      <p class="text-muted">{{ post?.contents }}</p>
      <p class="text-muted">
        {{ $dayjs(post?.createdAt).format("YYYY. MM. DD HH:mm:ss") }}
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
          <button
            class="btn btn-outline-danger"
            :disabled="removeLoading"
            @click="goDeleteItem"
          >
            <template v-if="removeLoading">
              <span
                class="spinner-grow spinner-grow-sm"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden" role="status">Loading...</span>
            </template>
            <template v-else>삭제</template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
import { useAxios } from "@/hooks/useAxios";
import { computed } from "vue";
const props = defineProps({
  id: Number,
});

// ref 선언시 반응형 데이터가 되지만 : 객체 할당이 가능, 대체로 ref로 처리하면 좋음
// reactive로 선언시 반응형 데이터가 될수없음 : 객체할당 불가능

const router = useRouter();
const url = computed(() => {
  return `/posts/${props.id}`;
});
const { response, data: post, error, loading } = useAxios(url);

const goListPage = () => {
  router.push({ name: "postList" });
};
const goEditPage = () => {
  router.push({ name: "postEdit", params: { id: props.id } });
};

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  {
    method: "delete",
  },
  {
    immediate: false,

    onSuccess: () => {
      router.push({ name: "postList" });
      removeLoading.value = true;
    },
    onError: (err) => {
      removeError.value = err;
    },
  },
);

const goDeleteItem = async () => {
  if (!confirm("삭제하시겠습니까")) return;
  execute();
};
</script>
