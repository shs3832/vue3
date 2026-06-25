import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PostListView from "../views/posts/PostListView.vue";
import PostCreateView from "../views/posts/PostCreateView.vue";
import PostEditView from "../views/posts/PostEditView.vue";
import PostDetailView from "../views/posts/PostDetailView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import NestedView from "../views/nested/NestedView.vue";
import Nested1 from "../views/nested/Nested1.vue";
import Nested2 from "../views/nested/Nested2.vue";
import NestedHome from "../views/nested/NestedHome.vue";
const routes = [
  {
    path: "/",
    component: HomeView,
    name: "home",
  },
  {
    path: "/about",
    component: AboutView,
    name: "about",
  },
  {
    path: "/post",
    component: PostListView,
    name: "postList",
  },
  {
    path: "/post/create",
    component: PostCreateView,
    name: "postCreate",
  },
  {
    path: "/post/:id", // 세미콜론은 다이나믹 라우팅
    component: PostDetailView,
    name: "postDetail",
    props: true,
    // props: (route) => {
    //   return {
    //     id: parseInt(route.params.id),
    //   };
    // },
  },
  {
    path: "/post/:id/edit",
    component: PostEditView,
    name: "postEdit",
  },
  {
    path: "/nested",
    component: NestedView,
    name: "nestedView",
    // 라우트 중첩시 children으로 쌓아준다 슬러시를 붙이면 절대경로가 되게되므로 사용금지
    children: [
      {
        // path를 사용하지않는경우 /nested 경로의 비워진 path의 컴포넌트가 보임
        path: "",
        component: NestedHome,
        name: "NestedHome",
      },
      {
        path: "nested1",
        component: Nested1,
        name: "Nested1",
      },
      {
        path: "nested2",
        component: Nested2,
        name: "Nested2",
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

export const router = createRouter({
  // 해시모드는 #이 붙고 히스토리모드는 그렇지않다
  history: createWebHistory("/"),
  // history: createWebHashHistory(),
  routes,
});
