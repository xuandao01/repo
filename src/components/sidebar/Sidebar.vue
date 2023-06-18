<template>
  <div class="container-sidebar">
    <div class="list-sidebar">
      <div class="router-item">
        <router-link :to="{ name: 'BookingManager' }">
          <div class="item">Quản lý booking</div>
        </router-link>
      </div>

      <div class="router-item">
        <router-link :to="{ name: 'HomestayManager' }">
          <div class="item">Quản lý homestay</div>
        </router-link>

      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url("@/css/sidebar.css");
</style>
