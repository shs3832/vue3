<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error?.message" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:contents="form.contents"
      @submit.prevent="savePost"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button type="submit" class="btn btn-primary" :disabled="stateSave">
          저장
        </button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
    <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
    <!-- <AppAlert
      :items="alerts"
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    /> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import PostForm from "@/components/posts/PostForm.vue";
import useAlert from "@/hooks/useAlert";
import { ref } from "vue";
import AppError from "@/components/app/AppError.vue";
import { useAxios } from "@/hooks/useAxios";
const { alerts, vAlert, vSuccess } = useAlert();

const router = useRouter();
const goListPage = () => {
  router.push({ name: "postList" });
};

const form = ref({
  title: "",
  contents: "",
});

const stateSave = ref(false);
const { error, loading, execute } = useAxios(
  `/posts`,
  {
    method: "post",
    data: { ...form.value },
    createdAt: Date.now(),
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("등록이 완료 되었습니다.");
      router.push({ name: "postList" });
    },
    onError: (err) => {
      error.value = err;
    },
  },
);

const savePost = async () => {
  execute({ ...form.value, createdAt: Date.now() });
};

// const savePost = async () => {
//   ({ error: error.value, loading: loading.value } = useAxios(
//     `/posts`,
//     {
//       method: "post",
//       data: { ...form.value },
//       createdAt: Date.now(),
//     },
//     {
//       onSuccess: () => {
//         vSuccess("등록이 완료 되었습니다.");
//         router.push({ name: "postList" });
//       },
//       onError: (err) => {
//         error.value = err;
//       },
//     },
//   ));
// };
// const savePost = async () => {
//   try {
//     if (!form.value.title || !form.value.contents) {
//       vAlert("내용을 입력하세요.", "error");
//       return;
//     }
//     loading.value = true;
//     const data = { ...form.value, createdAt: new Date().toISOString() };
//     stateSave.value = true;
//     await createPost(data);
//     vSuccess("등록이 완료 되었습니다.");
//     // router.push({ name: "postList" });
//   } catch (err) {
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// };
const showAlert = ref(false);

const visibleForm = ref(true);
</script>

<style lang="scss" scoped></style>
