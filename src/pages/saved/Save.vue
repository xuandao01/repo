<template>
    <div class="container">
        <Header></Header>
        <SaveContainer></SaveContainer>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import SaveContainer from "./SaveContainer.vue";
export default {
    components: { Header, Footer, SaveContainer },
};
</script>

<style></style>
