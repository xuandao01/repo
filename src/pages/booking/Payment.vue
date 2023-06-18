<template>
  <div class="container">
    <Header></Header>
    <PaymentDetails></PaymentDetails>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import PaymentDetails from "./PaymentDetails.vue";
export default {
  components: { Header, Footer, PaymentDetails },
};
</script>

<style></style>
