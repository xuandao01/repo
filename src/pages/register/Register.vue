<template>
  <div class="form-register">
    <div class="form-header">
      <h3>Đăng ký</h3>
    </div>
    <div class="form-body">
      <div class="form-body-left">
        <div class="form-group">
          <label for="">Họ</label>
          <input type="text" placeholder="Họ" v-model="dataForm.lastName" />
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label for="">Tên</label>
          <input type="text" placeholder="Tên" v-model="dataForm.firstName" />
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="email" placeholder="Email" v-model="dataForm.email" />
          <span class="error-message"></span>
        </div>
      </div>
      <div class="form-body-right">
        <div class="form-group">
          <label for="">Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            v-model="dataForm.phone"
          />
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label for="">Mật khẩu</label>
          <input
            type="password"
            placeholder="Mật khẩu"
            v-model="dataForm.password"
          />
          <span class="error-message"></span>
        </div>

        <div class="code-register">
          <div class="form-group">
            <label for="">Mã xác nhận</label>
            <input
              type="text"
              placeholder="Nhập mã xác nhân"
              v-model="codeRegister"
            />
          </div>
          <button class="btn get-code" @click="getCode">Lấy mã</button>
        </div>
      </div>
    </div>
    <div class="block-button">
      <button class="btn register" style="min-width: 240px" @click="submitForm">
        Đăng ký
      </button>

      <router-link :to="{ name: 'Login' }">
        <button style="width: 100%" class="sub-btn login">
          Bạn đã có tài khoản? Đăng nhập
        </button>
      </router-link>
    </div>

    <div class="form-footer">
      Khi đăng nhập tôi đồng ý với các
      <a href="">Điều khoản sử dụng</a> và <a href="">Chính sách bảo mật</a> của
      DHY
    </div>
  </div>
  <BaseToastMessage
    message="Mã xác nhận đã được gửi về email!"
    state="success"
    :isShow="isShowToastMessage"
    @closeToastMessage="isShowToastMessage = false"
  ></BaseToastMessage>

  <BaseDialog
    :mode="modeDialog"
    :description="messageDialog"
    :isShow="isShowDialog"
    @closeDialog="isShowDialog = false"
  ></BaseDialog>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import BaseToastMessage from "@/components/toast_message/BaseToastMessage.vue";
import BaseDialog from "@/components/dialog/BaseDialog.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import axios from "axios";
import { reactive, ref } from "vue";

const dataForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
});
const codeRegister = ref("");
const messageNotification = ref("");
const messageDialog = ref("");
const modeDialog = ref("");

const isShowToastMessage = ref(false);
const isShowDialog = ref(false);
const isShowLoading = ref(false);

const getCode = async () => {
  isShowLoading.value = true;

  await axios
    .post("http://localhost:8000/api/v1/auth/register/verify", dataForm, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        isShowToastMessage.value = true;
        isShowLoading.value = false;
        setTimeout(() => (isShowToastMessage.value = false), 2000);
        messageNotification.value = response.data.message;
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
      isShowDialog.value = true;
      isShowLoading.value = false;
      modeDialog.value = "validate";
      messageDialog.value = error.response.data.message;
    });
};

const submitForm = async () => {
  const newData = {
    data: { ...dataForm },
    codeVerify: codeRegister.value,
  };
  console.log(newData);

  await axios
    .post("http://localhost:8000/api/v1/auth/register", newData, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        isShowDialog.value = true;
        modeDialog.value = "register";
        messageDialog.value = response.data.message;
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.data.message);
      isShowDialog.value = true;
      modeDialog.value = "validate";
      messageDialog.value = error.response.data.message;
    });
};
</script>

<style scoped>
@import url("./register.css");
</style>
