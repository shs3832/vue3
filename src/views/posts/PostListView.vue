<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
    ></PostFilter>
    <hr class="my-4" />
    <AppLoading v-if="loading" />
    <AppError :message="error.message" v-else-if="error" />
    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">no result</p>
    </template>
    <template v-else>
      <div class="row g-3">
        <AppGridList :items="posts" colClass="col-12 col-md-6 col-lg-4">
          <template v-slot="{ item }">
            <PostItem
              :title="item.title"
              :contents="item.contents"
              :createdAt="item.createdAt"
              @click="goPage(item.id)"
              @modal="openModal(item)"
              @preview="selectPreview(item.id)"
          /></template>
        </AppGridList>

        <AppPagination
          :currentPage="params._page"
          :pageCount="pageCount"
          @page="pageMove"
        />
      </div>
    </template>
    <hr class="my-4" />
    <template v-if="previewId">
      <AppCard>
        <PostDetailView :id="previewId" />
      </AppCard>
    </template>
    <!-- <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button> -->
    <!-- Teleport : 컴포넌트를 특정위치로 이동시키는 기능 -->
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :show="show"
        :title="modalTitle"
        :contents="modalContents"
        :createdAt="modalCreatedAt"
      >
      </PostModal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";

import PostFilter from "@/components/posts/PostFilter.vue";

import { useRouter } from "vue-router";
import PostModal from "@/components/posts/PostModal.vue";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
import { useAxios } from "@/hooks/useAxios.js";
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: 3,
  _page: 1,
  title_like: "",
});
const {
  response,
  data: posts,
  error,
  loading,
} = useAxios(`/posts`, { method: "get", params });

const previewId = ref(null);
const selectPreview = (id) => (previewId.value = id);
console.log(previewId);
const totalCount = computed(() => {
  return response?.value?.headers["x-total-count"] ?? 0;
});
const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit);
});

const isExist = computed(() => {
  return posts.value && posts.value.length > 0;
});

const changeLimit = (value) => {
  params.value._limit = value;
  params.value._page = 1;
};

const router = useRouter();

const pageMove = (page) => {
  params.value._page = page;
};

const goPage = (id) => {
  router.push({
    name: "postDetail",
    params: {
      id,
    },
  });
};

const show = ref(false);
const modalTitle = ref("");
const modalContents = ref("");
const modalCreatedAt = ref("");
const openModal = ({ title, contents, createdAt }) => {
  // item을 구조분해 할당해 title, contents, createdAt을 가져와서 ref에 넣어 전달
  show.value = true;
  modalTitle.value = title;
  modalContents.value = contents;
  modalCreatedAt.value = createdAt;
};
const closeModal = () => {
  show.value = false;
};
// watchEffect(fetchPosts);
</script>

<style lang="scss" scoped></style>
