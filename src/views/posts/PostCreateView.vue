<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
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
import { createPost } from "@/api/posts.js";
import PostForm from "@/components/posts/PostForm.vue";
// import useAlert from "@/hooks/useAlert";
import { ref } from "vue";

// const { alerts, vAlert, vSuccess } = useAlert();

const router = useRouter();
const goListPage = () => {
  router.push({ name: "postList" });
};

const form = ref({
  title: "",
  contents: "",
});

const stateSave = ref(false);
const savePost = async () => {
  console.log(form.value);
  try {
    if (!form.value.title || !form.value.contents) {
      vAlert("내용을 입력하세요.", "error");
      return;
    }
    const data = { ...form.value, createdAt: new Date().toISOString() };
    stateSave.value = true;
    await createPost(data);
    vSuccess("등록이 완료 되었습니다.");
    // router.push({ name: "postList" });
  } catch (error) {
    vAlert("네트워크 오류", "error");
    console.log(error);
  }
};
const showAlert = ref(false);

const visibleForm = ref(true);
</script>

<style lang="scss" scoped></style>
