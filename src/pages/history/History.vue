<template>
  <div class="container">
    <Header></Header>
    <HistoryContainer></HistoryContainer>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import HistoryContainer from "./HistoryContainer.vue";
export default {
  components: { Header, Footer, HistoryContainer },
};
</script>

<style></style>
