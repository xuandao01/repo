<template>
  <div class="container-loading">
    <div class="loading">
      <!-- <embed src="../../assets/imgs/loading.svg" type="" /> -->
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.container-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
.loading {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-image: url("@/assets/imgs/loading.svg");
  background-repeat: no-repeat;
  animation: loading-spin infinite 2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
