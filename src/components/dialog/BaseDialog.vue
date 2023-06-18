<template>
  <div v-if="isShow">
    <div class="overlay">
      <div class="container-dialog">
        <div class="dialog-description">
          <warning-outlined
            :style="{ fontSize: '30px', color: '#F79E00' }"
            v-if="mode === 'validate'"
          />
          <check-circle-outlined
            :style="{ fontSize: '30px', color: '#50B83C' }"
            v-else="mode === 'register'"
          />
          <p>{{ description }}</p>
        </div>

        <div class="button-block">
          <button class="btn" @click="closeDialog" v-if="mode === 'validate'">
            Nhập lại
          </button>
          <router-link :to="{ name: 'Login' }" v-else="mode === 'register'">
            <button class="btn">Đăng nhập</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WarningOutlined, CheckCircleOutlined } from "@ant-design/icons-vue";
const props = defineProps(["description", "isShow", "mode"]);
const emit = defineEmits(["closeDialog"]);
const closeDialog = () => {
  emit("closeDialog");
};
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
}
.container-dialog {
  width: 400px;
  border-radius: 4px;
  background-color: #fff;
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.dialog-description {
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
}
.dialog-description p {
  color: #6e6e6e;
  font-size: 18px;
}
.button-block {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
