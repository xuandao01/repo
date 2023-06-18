<template>
  <div class="container-popup" v-if="isShow">
    <div class="popup">
      <div class="close" @click="closePopup">
        <close-outlined :style="{ fontSize: '20px', color: '#000' }" />
      </div>

      <h2>Có lỗi xảy ra</h2>
      <div class="description-block">
        <exclamation-circle-outlined
          :style="{ fontSize: '30px', color: 'red' }"
        />
        <p>Bạn chưa đăng nhập, vui lòng đăng nhập</p>
      </div>
      <div class="button">
        <button class="btn sub-btn" @click="closePopup">Huỷ</button>
        <router-link :to="{ name: 'Login' }">
          <button class="btn m-btn">Đăng nhập</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/button/BaseButton.vue";
import {
  ExclamationCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

const props = defineProps(["isShow"]);
const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
};
</script>
<style scoped>
.container-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  position: relative;
  width: 400px;
  height: 200px;
  background-color: #fff;
  padding: 20px;
}
.popup h2 {
  padding-bottom: 10px;
  font-weight: 600;
}
.button {
  justify-content: space-around;
  display: flex;
}
.button .btn {
  min-width: 80px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 4px;
}
.m-btn {
  background-color: #3395ff;
  color: white;
}
.sub-btn {
  background-color: transparent;
  border: 1px solid #3395ff !important;
  color: #3395ff;
}
.close {
  padding: 4px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}
.description-block {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}
.description-block p {
  font-size: 16px;
  font-weight: 500;
}
</style>
