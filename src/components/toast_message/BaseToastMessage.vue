<template>
  <div class="container_toast-message" :class="state" v-if="isShow">
    <div class="icon">
      <check-circle-outlined
        :style="{ fontSize: '20px' }"
        :class="state"
        v-if="state === 'success'"
      />
      <info-circle-outlined
        :style="{ fontSize: '20px' }"
        :class="state"
        v-if="state === 'error'"
      />
    </div>
    <div class="message">{{ message }}</div>
    <div class="icon" @click="closeToastMessage">
      <close-outlined :style="{ fontSize: '15px', color: '#000' }" />
    </div>
  </div>
</template>

<script>
import {
  CheckCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import { defineEmits } from "vue";
export default {
  props: ["message", "state", "isShow"],
  emits: ["closeToastMessage"],
  components: { CheckCircleOutlined, CloseOutlined, InfoCircleOutlined },
  setup(props, context) {
    const closeToastMessage = () => {
      context.emit("closeToastMessage", !props.isShow);
    };
    return {
      closeToastMessage,
    };
  },
};
</script>

<style scoped>
.container_toast-message {
  z-index: 100;
  position: fixed;
  top: 30px;
  right: 30px;
  width: 400px;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.container_toast-message.success {
  background-color: #ebf7ee;
  border: 1px solid #8df5a7;
}
.container_toast-message.error {
  background-color: #f7e8e8;
  border: 1px solid red;
}
.icon .error {
  color: red;
}
.icon .success {
  color: #38b158;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  cursor: pointer;
}
.message {
  font-size: 14px;
  color: gray;
}
</style>
