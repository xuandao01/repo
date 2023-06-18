<template>
  <div class="booking-container">
    <h1 style="font-size: 35px; font-weight: 700; color: #3395ff">
      Danh sách phòng được đặt
    </h1>
    <div class="homestay-list-booking">
      <div class="item-booking" v-for="item in listBooking">
        <div class="homestay-name">
          {{ item.homeStayId.title }}
        </div>
        <div class="date-booking">
          <button class="btn">
            {{ new Date(item.bookingStartDate).toLocaleString() }}
          </button>
          <span
            ><arrow-right-outlined :style="{ fontSize: '16px', color: '#08c' }"
          /></span>
          <button class="btn">
            {{ new Date(item.bookingEndDate).toLocaleString() }}
          </button>
        </div>
        <div class="price-booking">
          <span>Thành tiền: </span>
          <span>
            {{
              enums.formatNumber(
                item.homeStayId.price,
                item.homeStayId.discount
              )
            }}
          </span>
        </div>
        <div class="status">
          <div
            :class="{
              ' confirmed': item.status === 'confirmed',
              ' booked': item.status === 'booked',
            }"
          >
            Trạng thái :
            <b>
              {{ resources.status[item.status] }}
            </b>
          </div>
          <button class="btn m-btn" @click="payment(item.status)">
            Thanh toán
          </button>
        </div>

        <div class="banking" v-if="isPayment">
          <div class="banking-container">
            <div class="close" @click="() => (isPayment = false)">
              <close-outlined :style="{ fontSize: '26px', color: '#08c' }" />
            </div>
            <div class="banking-heading">
              Vui lòng thanh toán để xác nhận đặt phòng
            </div>
            <div class="banking-body">
              <div class="qr">
                <img src="@/assets/imgs/qr.jpg" alt="" />
              </div>
              <div class="inf-general">
                <div class="row-inf">
                  Họ và tên:
                  <b> {{ userData.firstName }} {{ userData.lastName }} </b>
                </div>
                <div class="row-inf">
                  Tên homestay:
                  <b> {{ item.homeStayId.title }}</b>
                </div>
                <div class="row-inf">
                  Giá:
                  <b>{{
                    enums.formatNumber(
                      item.homeStayId.price,
                      item.homeStayId.discount
                    )
                  }}</b>
                </div>
                <div class="row-inf">
                  Thời gian:
                  <div class="date-booking">
                    <button class="btn">
                      {{ new Date(item.bookingEndDate).toLocaleString() }}
                    </button>
                    <span
                      ><arrow-right-outlined
                        :style="{ fontSize: '16px', color: '#08c' }"
                    /></span>
                    <button class="btn">
                      {{ new Date(item.bookingStartDate).toLocaleString() }}
                    </button>
                  </div>
                </div>
              </div>
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
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons-vue";
import BaseToastMessage from "@/components/toast_message/BaseToastMessage.vue";

import enums from "@/helper/enum";
import resources from "@/helper/resources";

const userData = ref({});
const listBooking = ref([]);
const status = ref("");
const isPayment = ref(false);
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
      userData.value = res.data.data;
      console.log(res.data.data);
      listBooking.value = res.data.data.homeStayBookingList;
      console.log(listBooking.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
const payment = (status) => {
  console.log(status);
  if (status === "booked") {
    isPayment.value = true;
  } else {
    isShowToastMessage.value = true;
    message.value = "Bạn đã thanh toán cho đơn hàng này rồi";
    state.value = "error";
    setTimeout(() => {
      isShowToastMessage.value = false;
    }, 2000);
  }
};
</script>

<style scoped>
@import url("./booking.css");
</style>
