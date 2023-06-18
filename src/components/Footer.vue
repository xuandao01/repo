<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link :to="{ name: 'HomePage' }">
          <!-- <span class="logo-text">DHY BOOKING</span> -->
          <img src="@/assets/imgs/logo2.png" alt="" />
        </router-link>
      </div>
      <div class="info">
        <h2 class="company">DHY BOOKING</h2>
        <div>
          Văn phòng : 141 đường Chiến Thắng, xã Tân Triều, Huyện Thanh Trì, tp
          Hà Nội
        </div>
        <div>Địên thoại : 0357207250</div>
        <div>Email : dhybooking@gmail.com</div>
        <div>Website : www.dhybooking</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("@/css/footer.css");
</style>
