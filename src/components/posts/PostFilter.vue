<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <!-- <input
          type="text"
          class="form-control"
          :value="title"
          @input="$emit('update:title', $event.target.value)"
          placeholder="제목으로 검색해주세요"
        /> -->
        <input
          type="text"
          class="form-control"
          :value="title"
          @input="changeTitle"
          placeholder="제목으로 검색해주세요"
        />
      </div>
      <div class="col-3">
        <select
          class="form-select"
          :value="limit"
          @input="$emit('update:limit', $event.target.value)"
        >
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  title: String,
  limit: Number,
});
const emit = defineEmits(["update:title", "update:limit"]);
const changeTitle = (event) => {
  setTimeout(() => {
    emit("update:title", event.target.value);
  }, 500);
};
</script>

<style lang="scss" scoped></style>
