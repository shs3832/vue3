<template>
  <div>
    <h2>home</h2>
    {{ $route.path }}
    <button class="btn btn-primary" @click="$router.push('/about')">about으로 이동</button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
