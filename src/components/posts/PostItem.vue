<template>
  <div>
    <AppCard @click="emit('click')"
      ><h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ contents }}
      </p>
      <p class="text-muted">
        {{ createdAt || "날짜 없음" }}
      </p>
      <template #footer>
        <button
          class="btn p-0 d-flex flex-row-reverse"
          @click.stop="$emit('modal')"
        >
          <i class="bi bi-box-arrow-up-right"></i>
        </button>
      </template>
    </AppCard>
  </div>
</template>

<script setup>
// 부모 컴포넌트가 <PostItem />에 내려주는 props를 선언한다.
// 여기서 선언한 값은 위 template에서 title, contents처럼 바로 사용할 수 있다.
defineProps({
  title: {
    type: String,
    // 게시글 카드에서 반드시 필요한 값이면 required로 지정한다.
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  createdAt: {
    // 날짜 값은 API나 화면 구현에 따라 문자열, Date, 숫자 timestamp로 올 수 있다.
    type: [String, Date, Number],
    required: true,
  },
});

const emit = defineEmits(["click", "modal"]);
import AppCard from "../AppCard.vue";
</script>

<style lang="scss" scoped></style>
