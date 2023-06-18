<template>
  <div class="container">
    <Header></Header>
    <BookingContainer />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import BookingContainer from "./BookingContainer.vue";
export default {
  components: { Header, Footer, BookingContainer },
};
</script>

<style></style>
