<template>
  <button :class="{ type, ' favorite': isFavorite }" class="btn">
    {{ title }}
  </button>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["title", "type", "isFavorite"],
};
</script>

<style scoped>
.btn {
  min-width: 80px;
  height: 36px;
  font-size: 16px;
  font-weight: 600;
  font-family: Roboto;
  border: none;
  cursor: pointer;
  padding: 0 14px;
  border-radius: 4px;
}
.btn.large {
  height: 40px;
}
.btn.small {
  height: 30px;
  font-size: 14px;
  padding: 0 10px;
}
.m-btn {
  background-color: #3395ff;
  color: #fff;
}
.m-btn:hover {
  background-color: #62a9f6;
  cursor: pointer;
}
.favorite {
  background-color: #51d7ba;
}
.sub-btn {
  background-color: transparent;
  color: #62a9f6;
  border: 2px solid #62a9f6;
}
</style>
