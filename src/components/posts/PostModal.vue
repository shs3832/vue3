<template>
  <AppModal v-model="show" :title="`게시글 모달`">
    <template #default>
      <p>제목 : {{ title }}</p>
      <p>내용 : {{ contents }}</p>
      <p>등록일 : {{ $dayjs(createdAt).format("YYYY. MM. DD HH:mm:ss") }}</p>
    </template>
    <template #actions>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeModal"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  title: String,
  contents: String,
  createdAt: [String, Number],
});
const emit = defineEmits(["update:modelValue"]);
const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const closeModal = () => (show.value = false);
</script>

<style lang="scss" scoped></style>
