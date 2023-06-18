<template>
  <div class="container-save">
    <h1>Danh sách homestay yêu thích</h1>
    <div class="favourite-homestay_list">
      <div class="homestay-item" v-for="homestay in arrayFavoritesHomestay">
        <div class="img">
          <img :src="homestay.thumbnail" alt="" />
        </div>
        <div class="information">
          <div class="name">
            <h3>{{ homestay.title }}</h3>
            <div class="type">
              <star-filled
                :style="{ fontSize: '18px', color: '#F6D738' }"
                v-for="start in new Array(homestay.type).fill(0)"
              />
            </div>
          </div>
          <!-- <div class="address">
            <environment-outlined
              :style="{ fontSize: '18px', color: '#679eea' }"
            />

            <p class="">
              {{ homestay.streetAddress }}, {{ homestay.wards }},
              {{ homestay.district }}, {{ homestay.province }}
            </p>
          </div>
          <p class="desc">{{ homestay.description }}</p> -->

          <div class="price">
            <div class="old-price small">
              <h2 class="" style="font-size: 16px">
                {{ enums.formatNumber(homestay.price) }}
              </h2>
              <span class="">-{{ homestay.discount }}%</span>
            </div>
            <div class="new-price" style="font-size: 18px">
              {{ enums.formatNumber(homestay.price, homestay.discount) }}
              / ngày
            </div>
          </div>
          <div class="button-block">
            <router-link
              :to="{ name: 'DetailHotel', params: { id: homestay._id } }"
            >
              <div class="button-booking">
                <BaseButton title="Đặt phòng" type="m-btn"></BaseButton>
              </div>
            </router-link>
            <router-link
              :to="{ name: 'DetailHotel', params: { id: homestay._id } }"
            >
              <div class="view-detail">
                <BaseButton title="Xem chi tiết" type="m-btn"></BaseButton>
              </div>
            </router-link>
            <div class="button-unsave">
              <BaseButton
                title=" Bỏ yêu thích"
                type="sub-btn"
                @click="removeFavorites(homestay._id)"
              ></BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseToastMessage
    :message="message"
    :state="state"
    :isShow="isShowToastMessage"
    @closeToastMessage="isShowToastMessage = false"
  ></BaseToastMessage>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import enums from "@/helper/enum";
import BaseButton from "../../components/button/BaseButton.vue";
import BaseToastMessage from "@/components/toast_message/BaseToastMessage.vue";

const arrayFavoritesHomestay = ref([]);
const message = ref("");
const state = ref("");
const isShowToastMessage = ref(false);
onMounted(() => {
  getPermissions();
});
const getPermissions = async () => {
  await axios
    .post(
      "http://localhost:8000/api/v1/auth/permission",
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      }
    )
    .then((res) => {
      arrayFavoritesHomestay.value = res.data.data.homeStaySavedIds;
      console.log(arrayFavoritesHomestay.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
const removeFavorites = async (id) => {
  let token = localStorage.getItem("user");
  // console.log(token);

  await axios
    .delete("http://localhost:8000/api/v1/user/favourites/homestay", {
      data: { homeStayId: id },
      headers: {
        Authorization: "Bearer " + token,
      },
    })

    .then((response) => {
      if (response.status === 200) {
        arrayFavoritesHomestay.value = arrayFavoritesHomestay.value.filter(
          (item) => item._id !== id
        );
        message.value = response.data.message;
        console.log(message.value);
        state.value = "success";
        isShowToastMessage.value = true;
        setTimeout(() => {
          isShowToastMessage.value = false;
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
@import url("./save-container.css");
</style>
