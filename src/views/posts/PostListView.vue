<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input type="text" class="form-control" v-model="params.title_like" />
        </div>
        <div class="col-3">
          <select class="form-select" v-model="params._limit">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div class="col-4" v-for="post in posts" :key="post.id">
        <PostItem :title="post.title" :contents="post.contents" :createAt="post.createdAt" @click="goPage(post.id)" />
      </div>
      <nav aria-label="Page navigation example mt-5">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: params._page === 1 }">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="pageArrow('prev')">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: params._page === page }">
            <a class="page-link" href="#" @click.prevent="pageMove(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: !(params._page < pageCount) }">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="pageArrow('next')">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
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
const pageArrow = (dir) => {
  dir === "next" ? ++params.value._page : --params.value._page;
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
