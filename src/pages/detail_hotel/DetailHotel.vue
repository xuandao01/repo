<template>
  <div class="container">
    <Header></Header>
    <DetailHotelContainer />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import DetailHotelContainer from "./DetailHotelContainer.vue";
export default {
  components: { Header, Footer, DetailHotelContainer },
};
</script>

<style></style>
