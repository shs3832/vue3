<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm
      :title="form.title"
      :contents="form.contents"
      @submit.prevent="savePost"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button type="submit" class="btn btn-primary" :disabled="stateSave">
          저장
        </button>
      </template>
    </PostForm>
    <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts.js";
import PostForm from "@/components/posts/PostForm.vue";
import AppAlert from "@/components/AppAlert.vue";
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
      vAlert("내용을 입력하세요.", "error");
      return;
    }
    const data = { ...form.value, createdAt: new Date().toISOString() };
    stateSave.value = true;
    await createPost(data);
    vAlert("수정이 완료 되었습니다.", "success");
    // router.push({ name: "postList" });
  } catch (error) {
    vAlert("네트워크 오류", "error");
    console.log(error);
  }
};

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("");
const vAlert = (message, type = "error") => {
  showAlert.value = true;
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
