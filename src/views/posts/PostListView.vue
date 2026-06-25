<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div class="col-4" v-for="post in posts" :key="post.id">
        <PostItem :title="post.title" :contents="post.contents" :createAt="post.createAt" @click="goPage(post.id)" />
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="2" />
    </AppCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PostItem from "../../components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import AppCard from "../../components/AppCard.vue";
import { getPosts } from "../../api/posts.js";
import { useRouter } from "vue-router";
const posts = ref([]);
const router = useRouter();
const fetchPosts = () => {
  posts.value = getPosts();
};
fetchPosts();
const goPage = (id) => {
  router.push({
    name: "postDetail",
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
