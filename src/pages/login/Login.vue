<template>
  <div class="form-login" @keydown.enter="login">
    <div class="form-header">
      <h3>Đăng nhập</h3>
      <p>
        Để đảm bảo thông tin an toàn, vui lòng đăng nhập để đảm bảo thông tin
      </p>
    </div>
    <div class="form-body-login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" placeholder="Email" v-model="dataLogin.email" />
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          v-model="dataLogin.password"
        />
        <span class="error-message"></span>
      </div>
      <div class="btn-login-block">
        <button class="btn login" style="padding: 0 20px" @click="login">
          Đăng nhập
        </button>
      </div>

      <div class="direction">
        <router-link :to="{ name: 'Register' }">
          <span class="create-account">Tạo tài khoản</span>
        </router-link>

        <router-link :to="{ name: 'HomePage' }">
          <span class="home">Về trang chủ</span>
        </router-link>
      </div>
    </div>

    <div class="form-footer">
      Khi đăng nhập tôi đồng ý với các
      <a href="">Điều khoản sử dụng</a> và <a href="">Chính sách bảo mật</a> của
      DHY
    </div>
  </div>
  <BaseDialog
    title="Dữ liệu không hợp lệ"
    mode="validate"
    :description="dialogMgs"
    :isShow="isShowDialog"
    @closeDialog="isShowDialog = false"
  ></BaseDialog>
  <BaseToastMessage
    :message="toastMessage"
    state="success"
    :isShow="isShowToastMessage"
    @closeToastMessage="isShowToastMessage = false"
  ></BaseToastMessage>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";

import BaseDialog from "@/components/dialog/BaseDialog.vue";
import BaseToastMessage from "@/components/toast_message/BaseToastMessage.vue";

const dataLogin = reactive({ email: "", password: "" });
const dialogMgs = ref("");
const toastMessage = ref("");
const isShowToastMessage = ref(false);
const isShowDialog = ref(false);
const router = useRouter();
const userData = ref({});
const isShowLoading = ref(false);
let isLogin = inject("isLogin");

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
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = async () => {
  console.log("enter");
  isShowLoading.value = true;
  await axios
    .post("http://localhost:8000/api/v1/auth/login", dataLogin, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        isShowLoading.value = false;
        console.log(response);
        getPermissions();
        isLogin = response.data.data.accessToken;
        console.log(isLogin);
        isShowDialog.value = false;
        isShowToastMessage.value = true;
        setTimeout(() => {
          isShowToastMessage.value = false;
        }, 1000);
        toastMessage.value = response.data.message;

        localStorage.setItem("user", isLogin);
        localStorage.setItem("role", response.data.data.user.role);

        //check role
        if (response.data.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/home");
        }
      }
    })
    .catch((err) => {
      if (err) {
        isShowDialog.value = true;
        dialogMgs.value = err.response.data.message;
      }
    });
};
const log = () => {
  console.log("enter");
};
</script>

<style scoped>
@import url("./login.css");
</style>
