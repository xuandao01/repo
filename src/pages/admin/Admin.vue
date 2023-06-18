<template>
  <div class="container">
    <Header></Header>
    <div class="container-admin" style="margin-left: 200px">
      <Sidebar></Sidebar>
      <AdminContainer></AdminContainer>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import AdminContainer from "@/pages/admin/AdminContainer.vue";
</script>

<style>
.container-admin {
  display: flex;
}
</style>
