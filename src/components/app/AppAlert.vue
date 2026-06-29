<template>
  <!-- <Transition name="slide">
    <div class="alert app-alert" :class="styleClass" role="alert" v-if="show">
      {{ message }}
    </div>
  </Transition> -->

  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        class="alert"
        v-for="({ message, type }, index) in alerts"
        :class="styleClass(type)"
        role="alert"
        :key="index"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import useAlert from "@/hooks/useAlert";
const { alerts } = useAlert();
const styleClass = (type) => {
  return type === "error" ? "alert-danger" : "alert-success";
};
// const props = defineProps({
//   show: {
//     type: Boolean,
//     default: false,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     default: "error",
//     validator: (value) => ["success", "error"].includes(value),
//   },
// });
// const styleClass = computed(() => {
//   return props.type === "error" ? "alert-danger" : "alert-success";
// });
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
.slide-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.slide-leave-from {
  transform: translateY(0px);
  opacity: 1;
}

.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
