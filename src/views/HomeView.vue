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
    <h2>{{ position }}</h2>
    {{ x }}
    {{ y }}
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  },
};
</script>

<script setup>
import { inject, reactive, ref, toRef, toRefs } from "vue";

const items = ref(["사과", "딸기", "포도", "바나나"]);
const person = inject("person");
console.log(person);
const functionPerson = inject("functionPerson");
console.log(functionPerson);

const position = reactive({
  x: 100,
  y: 1000,
});

// const x = toRef(position, "x");
const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
