<template>
  <div v-if="tokenAccess && roleUser === 'admin'">
    <!-- Code chức năng admin trong đây -->
    <h1>This is admin page</h1>
  </div>
  <div v-else>
    <h1>
      Đây là trang của quản trị viên, vui lòng đăng nhập với quyền quản trị viên
      để sử dụng tính năng này
    </h1>
    <router-link :to="{ name: 'HomePage' }">Quay lại trang chủ</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'Login' }"
      >Đăng nhập với quyền quản trị viên</router-link
    >
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const tokenAccess = ref("");
const roleUser = ref({});
onMounted(() => {
  tokenAccess.value = localStorage.getItem("user");
  getPermissions();
});

const getPermissions = async () => {
  await axios
    .post(
      "http://localhost:8000/api/v1/auth/permission",
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      }
    )
    .then((res) => {
      roleUser.value = res.data.data.role;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style></style>
