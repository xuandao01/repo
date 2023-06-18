<template>
  <div class="container" v-if="isShow">
    <close-outlined
      class="close-btn"
      :style="{ fontSize: '30px', color: '#fff' }"
      @click="close"
    />
    <swiper id="slider-details" :navigation="true" :modules="modules" class="my-swiper">
      <swiper-slide v-for="img in arrayImgs" :key="img" class="block-img">
        <img :src="img" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { CloseOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CloseOutlined,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  props: ["arrayImgs", "isShow"],
  setup(context) {
    // const isShow = ref(true);

    return {
      modules: [Navigation],
    };
  },
};
</script>
<style>
#slider-details .swiper-button-next::after, 
#slider-details .swiper-button-prev::after {
  color: #fff;
  font-size: 36px;
  z-index: 9999999999;
}

#slider-details .swiper-button-next::before, 
#slider-details .swiper-button-prev::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0 ,0, .5);
}
</style>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
}

.my-swiper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 850px;
  height: 550px;
  /* z-index: 2; */
}
.block-img {
  width: 850px;
  height: 550px;
}
.block-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 10px;
  cursor: pointer;
}

.close-btn:active {
  opacity: .5;
  transition: all .2s linear;
}
</style>
