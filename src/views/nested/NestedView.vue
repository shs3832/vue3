<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <!-- replace route 방식 -->
        <RouterLink class="nav-link" active-class="active" :to="{ name: 'Nested1', replace: true }"
          >Nested 1</RouterLink
        >
      </li>
      <!-- push 라우트 방식 -->
      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active" to="/nested/nested2">Nested 2</RouterLink>
      </li>
    </ul>
    <hr />
    <RouterView />
  </div>
</template>

<style scoped></style>
