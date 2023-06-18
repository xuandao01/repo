<template>
  <div class="container">
    <Header></Header>
    <div class="booking-manager">
      <Sidebar></Sidebar>
      <div class="booking-manager_container" style="flex: 1">
        <div class="title-manager-booking">Quản lý booking</div>
        <div class="action">
          <div class="filter-by-price">
            <select
              name=""
              id=""
              class="select-by-price"
              v-model="selectOption"
              @change="handleChange"
            >
              <option value="" disabled selected>Trạng thái booking</option>
              <option v-for="sort in resources.filterStatus">
                {{ sort.name }}
              </option>
            </select>
          </div>
          <div class="reload" @click="syncBooking">
            <span style="font-size: 16px">Đồng bộ</span>
            <reload-outlined :style="{ fontSize: '20px', color: '#fff' }" />
          </div>
        </div>
        <div class="list-booking admin">
          <div class="item-booking" v-for="item in dataBooking">
            <div class="name-homestay" style="font-size: 18px">
              Tên homestay:
              <b>
                {{ item.homeStayId.title }}
              </b>
            </div>

            <div class="name-user" style="font-size: 16px">
              Người đặt:
              <b>{{ item.userId.firstName }} {{ item.userId.lastName }}</b>
            </div>
            <div class="phone-number">
              Số liên hệ: <b>{{ item.userId.phone }}</b>
            </div>
            <span class="admin-price" style="font-size: 16px; color: orange">
              Tổng tiền: <b>{{ enums.formatNumber(item.homeStayId.price) }}</b>
            </span>
            <div
              class="admin-status"
              :class="{
                ' confirmed': item.status === 'confirmed',
                ' booked': item.status === 'booked',
              }"
            >
              Trạng thái: <b>{{ resources.status[item.status] }}</b>
            </div>
            <div class="timeline">
              <div class="span">Thời gian:</div>
              <button class="btn">
                {{ new Date(item.bookingStartDate).toLocaleString() }}
              </button>
              <span
                ><arrow-right-outlined
                  :style="{ fontSize: '16px', color: '#08c' }"
              /></span>
              <button class="btn">
                {{ new Date(item.bookingEndDate).toLocaleString() }}
              </button>
            </div>

            <div class="admin-button-block">
              <BaseButton
                title="Xác nhận"
                type="m-btn"
                @click="confirmBooking(item._id, item.status)"
              ></BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
  <BaseToastMessage
    :message="message"
    :state="state"
    :isShow="isShowToastMessage"
    @closeToastMessage="isShowToastMessage = false"
  ></BaseToastMessage>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import BaseButton from "../../components/button/BaseButton.vue";
import BaseLoading from "../../components/loading/BaseLoading.vue";
import BaseToastMessage from "@/components/toast_message/BaseToastMessage.vue";

import resources from "@/helper/resources";
import enums from "@/helper/enum";

import axios from "axios";
import {
  ArrowRightOutlined,
  StarFilled,
  ReloadOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";

const dataBooking = ref([]);
const selectOption = ref("");
const isShowLoading = ref(false);
const message = ref("");
const state = ref("");
const isShowToastMessage = ref(false);
onMounted(() => {
  if (
    localStorage.getItem("user") &&
    localStorage.getItem("role") === "admin"
  ) {
    getInfoBooking();
  }
});

const getInfoBooking = async (status = "all") => {
  isShowLoading.value = true;
  await axios
    .get(`http://localhost:8000/api/v1/admin/booking?status=${status}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("user"),
      },
    })
    .then((response) => {
      isShowLoading.value = false;

      dataBooking.value = response.data.data;
      // console.log(dataBooking.value);
    })
    .catch((error) => {
      console.error(error);
    });
};

const confirmBooking = async (idBooking, status) => {
  console.log(status);
  if (status === "booked") {
    await axios
      .patch(
        "http://localhost:8000/api/v1/admin/booking",
        {
          status: "confirmed",
          idBooking: idBooking,
        },
        {
          headers: {
            withCredentials: true,
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        isShowToastMessage.value = true;

        message.value = "Xác nhận thành công";
        state.value = "success";
        setTimeout(() => {
          isShowToastMessage.value = false;
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // nếu đã thanh toán
    isShowToastMessage.value = true;

    message.value = "Đơn hàng đã được xác nhận";
    state.value = "error";
    setTimeout(() => {
      isShowToastMessage.value = false;
    }, 2000);
    return;
  }
};
const sortKey = ref("");
const timeout = ref(null);

const handleChange = () => {
  sortKey.value = resources.filterStatus.filter(
    (sort) => sort.name === selectOption.value
  )[0].key;
  console.log(sortKey.value);

  if (timeout.value) {
    clearTimeout(timeout.value);
  }

  timeout.value = setTimeout(() => {
    getInfoBooking(sortKey.value);
  }, 1000);
};

const syncBooking = async () => {
  isShowLoading.value = true;
  await axios
    .post(
      "http://localhost:8000/api/v1/admin/sync/booking",
      {
        status: "confirmed",
        idBooking: "",
      },
      {
        headers: {
          withCredentials: true,
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      }
    )
    .then((response) => {
      isShowLoading.value = false;

      console.log(response);
      isShowToastMessage.value = true;
      message.value = response.data.message;
      state.value = "success";
      setTimeout(() => {
        isShowToastMessage.value = false;
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style>
@import url("./booking-manager.css");
</style>
