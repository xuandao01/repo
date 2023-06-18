<template>
  <div class="header-container">
    <div class="header">
      <div class="logo">
        <router-link :to="{ name: 'HomePage' }">
          <img src="@/assets/imgs/logo2.png" alt="" />
        </router-link>
      </div>
      <div class="header-main">
        <router-link
          :to="{ name: 'Booking' }"
          v-if="isLogin && role === 'user'"
        >
          <div class="saved">
            <diff-outlined :style="{ fontSize: '20px', color: '#3395ff' }" />
            <span>Booking</span>
          </div>
        </router-link>

        <router-link :to="{ name: 'Save' }" v-if="isLogin && role === 'user'">
          <div class="history">
            <schedule-outlined
              :style="{ fontSize: '20px', color: '#3395ff' }"
            />
            <span>Homestay yêu thích</span>
          </div>
        </router-link>

        <div class="logged" v-if="!isLogin">
          <router-link :to="{ name: 'Login' }">
            <div class="login">
              <BaseButton title="Đăng nhập" type="m-btn"></BaseButton>
            </div>
          </router-link>
          <router-link :to="{ name: 'Register' }">
            <div class="register">
              <BaseButton title="Đăng ký" type="sub-btn"></BaseButton>
            </div>
          </router-link>
        </div>

        <div class="not-logged" v-else>
          <div class="user-name-block">
            <span>
              {{ userData.lastName }}
            </span>
          </div>
          <div class="logout">
            <BaseButton
              title="Đăng xuất"
              type="sub-btn"
              @click="signOut"
            ></BaseButton>
          </div>
        </div>
        <router-link :to="{ name: 'Admin' }" v-if="isLogin && role === 'admin'">
          <div class="admin">
            <BaseButton title="Quản lý" type="s-btn"></BaseButton>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseButton from "./button/BaseButton.vue";
import {
  SearchOutlined,
  DiffOutlined,
  ScheduleOutlined,
} from "@ant-design/icons-vue";
import { ref, inject, watch, onMounted, reactive } from "vue";
import axios from "axios";
const name = ref("");
const userData = ref({});
const router = useRouter();

const isLogin = ref();
const role = ref("");
onMounted(() => {
  isLogin.value = localStorage.getItem("user");
  // console.log(isLogin.value);
  if (isLogin.value) {
    getPermissions();
    role.value = localStorage.getItem("role");
  }
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
      userData.value = res.data.data;
      console.log(userData.value.role);
    })
    .catch((err) => {
      console.log(err);
    });
};

const signOut = async () => {
  await axios
    .post(
      "http://localhost:8000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    )
    .then(async (response) => {
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      await router.push("/home");
      window.location.reload();
    });
};
</script>

<style>
@import url("@/css/header.css");
</style>
