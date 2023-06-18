<template>
  <div class="container-detail-homestay" v-if="!isBooking">
    <div class="title-homestay">
      Thông tin chi tiết:
      <b>
        {{ dataHomeStay.title }}
      </b>
    </div>
    <div class="block-images">
      <div
        :class="`block-${index}`"
        v-for="(img, index) in arrayImages"
        :key="index"
        v-show="index < 4"
      >
        <div class="overlay" v-if="index === 3" @click="viewAllPictures">
          Xem tất cả ảnh
        </div>
        <img :src="img" alt="" />
      </div>
    </div>

    <div class="block-description">
      <div class="description">
        <div class="type-and-rate">
          <span>Homestays</span>
          <div class="rate">
            <star-filled
              :style="{ fontSize: '18px', color: '#F6D738' }"
              v-for="start in new Array(dataHomeStay.type).fill(0)"
            />
          </div>
        </div>
        <h2 class="homestay-name">
          {{ dataHomeStay.title }} (<b>{{ dataHomeStay.maxSize }} người)</b>
        </h2>
        <div class="homestay-address">
          <environment-outlined
            :style="{ fontSize: '18px', color: '#679eea' }"
          />

          <p class="">
            {{ dataHomeStay.streetAddress }}, {{ dataHomeStay.wards }},
            {{ dataHomeStay.district }}, {{ dataHomeStay.province }}
          </p>
        </div>
        <p class="homestay-description">
          {{ dataHomeStay.description }}
        </p>
      </div>
      <div class="price">
        <h2 class="price-title">Giá phòng từ</h2>
        <div class="old-price">
          <h2 class="">{{ enums.formatNumber(dataHomeStay.price) }}</h2>
          <span class="btn-discount">-{{ dataHomeStay.discount }}%</span>
        </div>
        <div class="new-price">
          {{ enums.formatNumber(dataHomeStay.price, dataHomeStay.discount) }} /
          ngày
        </div>
        <div class="block-button">
          <div class="button-booking">
            <BaseButton
              title="Đặt phòng"
              type="m-btn"
              @click="booking(dataHomeStay._id)"
            ></BaseButton>
          </div>

          <div class="button-save">
            <BaseButton
              :title="titleBtnFavorites"
              type="sub-btn"
              :isFavorite="isFavorite"
              @click="addFavourites(dataHomeStay._id)"
            ></BaseButton>
          </div>
        </div>
      </div>
    </div>
    <!-- Tiện ích -->
    <div class="utility">
      <h3>Tiện nghi homestay</h3>
      <div class="block-utility">
        <span class="" v-for="item in utilities" :key="item">{{
          item.name
        }}</span>
      </div>
    </div>
    <!-- Homestay gần đó -->
    <div class="near-homestay">
      <h2 class="near-homestay_title">Homestay gần đây</h2>
      <router-link
        :to="{ name: 'DetailHotel', params: { id: homestay._id } }"
        v-for="homestay in dataHomeStayNear"
        :key="homestay._id"
        target="_blank"
      >
        <div class="near-homestay_item">
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
            <div class="address">
              <environment-outlined
                :style="{ fontSize: '18px', color: '#679eea' }"
              />

              <p class="">
                {{ homestay.streetAddress }}, {{ homestay.wards }},
                {{ homestay.district }}, {{ homestay.province }}
              </p>
            </div>
            <p class="desc">{{ homestay.description }}</p>

            <div class="price">
              <div class="old-price small">
                <h2 class="" style="font-size: 16px">
                  {{ enums.formatNumber(dataHomeStay.price) }}
                </h2>
                <span class="">-{{ dataHomeStay.discount }}%</span>
              </div>
              <div class="new-price" style="font-size: 18px">
                {{
                  enums.formatNumber(dataHomeStay.price, dataHomeStay.discount)
                }}
                / ngày
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <div class="no-data" v-show="dataHomeStayNear.length === 0">
        <p>Dữ liệu chưa được cập nhật</p>
      </div>
    </div>
  </div>
  <div class="booking-page" v-else>
    <div class="booking-container">
      <div class="main-title">
        Đặt homestay: <b>{{ dataHomeStay.title }}</b>
      </div>
      <h1 class="title">Thông tin đặt Homestay</h1>
      <div class="booking-body">
        <div class="booked-time">
          <h3>Thời gian homestay đã được đặt</h3>

          <div class="time-list-container">
            <div class="time-item" v-for="item in bookingTimeList" :key="item">
              <button class="btn">
                {{ new Date(item[0]).toLocaleString() }}
              </button>
              <span
                ><arrow-right-outlined
                  :style="{ fontSize: '16px', color: '#08c' }"
              /></span>
              <button class="btn">
                {{ new Date(item[1]).toLocaleString() }}
              </button>
            </div>
          </div>
        </div>
        <div class="form-booking">
          <div class="col">
            <h3 style="font-size: 18px">Thông tin đặt</h3>

            <div class="form-group">
              <label for="">Ngày bắt đầu đặt</label>
              <input
                style="width: 90%"
                type="datetime-local"
                placeholder=""
                v-model="infBooking.bookingStartDate"
              />
            </div>
            <div class="form-group">
              <label for="">Ngày kết thúc</label>
              <input
                style="width: 90%"
                type="datetime-local"
                placeholder=""
                v-model="infBooking.bookingEndDate"
                @change="changeEndDate"
              />
            </div>
            <div class="form-group">
              <label for="">Số người</label>
              <input
                style="width: 90%"
                type="number"
                placeholder="Chọn số người"
                v-model="infBooking.size"
                :min="1"
                :max="dataHomeStay.maxSize"
              />
            </div>

            <div class="caculator">
              <div class="date-and-money">
                <span>Giá: </span>
                {{
                  enums.formatNumber(dataHomeStay.price, dataHomeStay.discount)
                }}/ ngày x <span>{{ countDate || 0 }}</span> ngày
              </div>
              <div class="final-money">
                <span>Thành tiền: </span
                >{{ enums.formatNumber(finalCost, dataHomeStay.discount) }}
              </div>
            </div>
            <div class="payment">
              <button class="btn" @click="paymentBooking" style="width: 120px">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseLoading v-if="isShowLoading"></BaseLoading>
  <SlidePicture
    v-if="isShowSlide"
    :isShow="isShowSlide"
    :arrayImgs="arrayImages"
    @close="isShowSlide = false"
  ></SlidePicture>
  <BaseToastMessage
    :message="message"
    :state="state"
    :isShow="isShowToastMessage"
    @closeToastMessage="isShowToastMessage = false"
  ></BaseToastMessage>

  <BasePopup
    :isShow="isShowPopup"
    @closePopup="isShowPopup = false"
  ></BasePopup>
</template>

<script setup>
import axios from "axios";
import { inject, onMounted, reactive, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import {
  ArrowRightOutlined,
  StarFilled,
  CloseOutlined,
} from "@ant-design/icons-vue";
import BaseButton from "../../components/button/BaseButton.vue";
import BaseLoading from "../../components/loading/BaseLoading.vue";
import SlidePicture from "@/components/slide/SlidePicture.vue";
import enums from "@/helper/enum";
import HomeContainerVue from "../home_page/HomeContainer.vue";
import BaseToastMessage from "@/components/toast_message/BaseToastMessage.vue";
import BasePopup from "@/components/dialog/BasePopup.vue";

const route = useRoute();
const router = useRouter();

const idHomeStay = route.params.id;
var dataHomeStay = reactive([]);
var dataHomeStayNear = ref([]);
const arrayImages = ref([]);
const utilities = ref([]);
const isShowSlide = ref(false);
const isShowLoading = ref(false);
const isShowPopup = ref(false);
const isShowToastMessage = ref(false);
const userData = ref([]);
const state = ref("");
const message = ref("");
const isShowDialog = ref(false);
const isFavorite = ref(false);
const titleBtnFavorites = ref("Yêu thích");
const isBooking = ref(false);
const bookingTimeList = ref([]);
const infBooking = ref({ size: dataHomeStay.maxSize });
const countDate = ref(0);
const finalCost = ref(0);
const isPayment = ref(false);

const changeEndDate = () => {
  countDate.value = calculatorDate();

  finalCost.value = calculatorCost(countDate.value);
  console.log(finalCost.value);
  console.log(enums.formatNumber(finalCost.value));
};

const calculatorDate = () => {
  let endDate = new Date(infBooking.value.bookingEndDate);
  let startDate = new Date(infBooking.value.bookingStartDate);
  let dayGap = Math.ceil(
    Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );
  return dayGap;
};
const calculatorCost = (count) => {
  console.log(count);
  return dataHomeStay.price * count;
};
onMounted(() => {
  getDataDetailHomeStay();
  getPermissions();
});

const viewAllPictures = () => {
  isShowSlide.value = !isShowSlide.value;
};
const getDataDetailHomeStay = async () => {
  isShowLoading.value = true;
  await axios
    .get(`http://localhost:8000/api/v1/homeStays/${idHomeStay}`)
    .then((response) => {
      if (response.status === 200) {
        bookingTimeList.value = response.data.data.bookingTimeList;
        isShowLoading.value = false;
        dataHomeStay = response.data.data;
        arrayImages.value = dataHomeStay.imgs;
        utilities.value = dataHomeStay.utilityIds;
        getDataHomestayNear(dataHomeStay.province);
      }
    });
};
const getDataHomestayNear = async (
  province,
  search = "",
  pageIndex = 1,
  pageSize = 8,
  sort = "asc"
) => {
  await axios
    .get(
      `http://localhost:8000/api/v1/homeStays?page=${pageIndex}&limit=${pageSize}&sort=${sort}&search=${search}&province=${province}`
    )
    .then((response) => {
      dataHomeStayNear.value = response.data.data.homeStayList;
      // console.log(dataHomeStayNear.value);

      dataHomeStayNear.value = dataHomeStayNear.value.filter(
        (item) => item._id !== idHomeStay
      );
    });
};
const addFavourites = async (id) => {
  let token = localStorage.getItem("user");

  if (!token) {
    isShowPopup.value = true;
  } else {
    await axios
      .post(
        "http://localhost:8000/api/v1/user/favourites/homestay",
        { homeStayId: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          isFavorite.value = true;
          titleBtnFavorites.value = "Đã yêu thích";
          isShowToastMessage.value = true;
          state.value = "success";
          message.value = response.data.message;
          setTimeout(() => {
            isShowToastMessage.value = false;
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        isShowToastMessage.value = true;
        state.value = "error";
        message.value = err.response.data.message;
        setTimeout(() => {
          isShowToastMessage.value = false;
        }, 2000);
      });
  }
};
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

      isFavorite.value = userData.value.homeStaySavedIds
        .map((item) => item._id)
        .includes(idHomeStay);
      if (isFavorite.value) {
        titleBtnFavorites.value = "Đã yêu thích";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const booking = () => {
  if (!localStorage.getItem("user")) {
    isShowToastMessage.value = true;
    state.value = "error";
    message.value = "Vui lòng đăng nhập để đặt homestay";
    isShowLoading.value = false;
    setTimeout(() => {
      isShowToastMessage.value = false;
    }, 2000);
  } else {
    isBooking.value = true;
  }
};
const idHomestayBooking = ref("");

const paymentBooking = () => {
  console.log("payment");
  isShowLoading.value = true;
  let bookingStartDate = new Date(infBooking.value.bookingStartDate).getTime();
  console.log(infBooking.value.bookingStartDate);
  let bookingEndDate = new Date(infBooking.value.bookingEndDate).getTime();

  axios
    .post(
      "http://localhost:8000/api/v1/user/homestay/booking",
      {
        homeStayId: dataHomeStay._id,
        bookingStartDate: bookingStartDate,
        bookingEndDate: bookingEndDate,
        size: infBooking.value.size,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      }
    )
    .then((response) => {
      isShowToastMessage.value = true;
      isShowLoading.value = false;
      console.log(response);
      state.value = "success";
      message.value = response.data.message;
      setTimeout(() => {
        isShowToastMessage.value = false;
      }, 3000);

      // Hiển thị trang thanh toán
      // isPayment.value = true;
      router.push("/booking");
    })
    .catch((error) => {
      console.log(error);
      isShowToastMessage.value = true;
      state.value = "error";
      message.value = error.response.data.message;
      isShowLoading.value = false;
      setTimeout(() => {
        isShowToastMessage.value = false;
      }, 2000);
      // finalCost.value = 0;
    });
};
</script>

<style>
@import url("./detail-hotel-container.css");
</style>
