<template>
  <div>
    <h2>about</h2>
    {{ $route.path }}
    <button class="btn btn-primary" @click="goHomePage">home으로 이동</button>
    <div>
      {{ counter }}
      {{ doubleCounter }}
      <button @click="increment()">증가!</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCounterStore } from "@/store/counter";
import { storeToRefs } from "pinia";

const router = useRouter();
const goHomePage = () => {
  router.push("/");
};

const store = useCounterStore();
const { counter, doubleCounter } = storeToRefs(store);
const { increment } = useCounterStore();
</script>

<style lang="scss" scoped></style>
