<template>
  <AppLoading v-if="loading" />
  <AppError :message="error.message" v-else-if="error" />
  <div v-else>
    <div>
      <h2>게시글 수정</h2>
      <AppError v-if="editError" :message="editError.message" />
      <PostForm
        v-if="form"
        v-model:title="form.title"
        v-model:contents="form.contents"
        @submit.prevent="goEditPage"
      >
        <template #actions>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="goListPage"
          >
            취소
          </button>
          <!-- <button type="submit" class="btn btn-outline-primary">수정</button> -->
          <button class="btn btn-primary" :disabled="editLoading">
            <template v-if="editLoading">
              <span
                class="spinner-grow spinner-grow-sm"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden" role="status">Loading...</span>
            </template>
            <template v-else>수정</template>
          </button>
        </template>
      </PostForm>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import PostForm from "@/components/posts/PostForm.vue";
import useAlert from "@/hooks/useAlert";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
import { useAxios } from "@/hooks/useAxios";

const { vSuccess } = useAlert();

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const { response, data: form, error, loading } = useAxios(`/posts/${id}`);
const goListPage = () => {
  router.push({ name: "postList" });
};

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `/posts/${id}`,
  {
    method: "patch",
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("수정이 완료 되었습니다.");
      router.push({ name: "postDetail", params: { id } });
    },
    onError: (err) => {
      error.value = err;
      editError.value = err;
    },
  },
);

const goEditPage = async () => {
  execute({
    ...form.value,
  });
};

// const goEditPage = async () => {
//   try {
//     editLoading.value = true;
//     await updatePost(id, { ...form.value });
//     vSuccess("수정이 완료 되었습니다.");
//     router.push({ name: "postDetail", params: { id } });
//   } catch (err) {
//     error.value = err;
//     editError.value = err;
//   } finally {
//     editLoading.value = false;
//   }
// };
</script>

<style lang="scss" scoped></style>
