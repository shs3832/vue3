<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    ></PostFilter>
    <hr class="my-4" />
    <div class="row g-3">
      <AppGridList :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :contents="item.contents"
            :createAt="item.createdAt"
            @click="goPage(item.id)"
        /></template>
      </AppGridList>

      <AppPagination
        :currentPage="params._page"
        :pageCount="pageCount"
        @page="pageMove"
      />
    </div>

    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="2" />
    </AppCard>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import AppCard from "@/components/AppCard.vue";
import AppPagination from "@/components/AppPagination.vue";
import AppGridList from "@/components/AppGridList.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
import { getPosts } from "@/api/posts.js";
import { useRouter } from "vue-router";
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: 3,
  _page: 1,
  title_like: "",
});
const totalCount = ref(0);
const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit);
});
const posts = ref([]);
const router = useRouter();
const pageMove = (page) => {
  params.value._page = page;
};

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"];
  } catch (error) {
    console.log(error);
  }
};

const goPage = (id) => {
  router.push({
    name: "postDetail",
    params: {
      id,
    },
  });
};

watchEffect(fetchPosts);
</script>

<style lang="scss" scoped></style>
