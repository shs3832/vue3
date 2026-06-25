<template>
  <div>
    <h2>home</h2>
    {{ $route.path }}
    <button class="btn btn-primary" @click="$router.push('/about')">
      about으로 이동
    </button>
    <div class="row g-3">
      <AppGridList :items="items" v-slot="{ item }" colClass="col-6">
        <AppCard>{{ item }}</AppCard>
      </AppGridList>
    </div>
  </div>
</template>

<script setup>
import AppGridList from "@/components/AppGridList.vue";
import AppCard from "@/components/AppCard.vue";
import { ref } from "vue";

const items = ref(["사과", "딸기", "포도", "바나나"]);
</script>

<style lang="scss" scoped></style>
