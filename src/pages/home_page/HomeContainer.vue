<template>
  <div class="top-place"></div>
  <div class="container-homepage">
    <h2 class="title-list">Danh sách Homestay</h2>
    <div class="box-action">
      <div class="search-container">
        <div class="search-input">
          <input
            type="text"
            class="input"
            placeholder="Tìm kiếm homestay"
            v-model="searchKeyword"
            @input="searchAction"
            style="padding-right: 50px"
          />
          <search-outlined
            :style="{ fontSize: '18px', color: 'gray' }"
            class="search-icon"
          />
        </div>
      </div>

      <div class="filter-by-price">
        <select
          name=""
          id=""
          class="select-by-price"
          v-model="selectOption"
          @change="handleChange"
        >
          <option value="" disabled selected>Sắp xếp theo</option>
          <option v-for="sort in resources.sortKey">{{ sort.name }}</option>
        </select>
      </div>
    </div>
    <div class="container-list">
      <router-link
        :to="{ name: 'DetailHotel', params: { id: homestay._id } }"
        v-for="homestay in arrayListHomestays"
        :key="homestay._id"
      >
        <div class="container-item">
          <div class="hotel-img">
            <img :src="homestay.thumbnail" alt="" />
          </div>
          <div class="hotel-description">
            <h3 class="hotel-name">{{ homestay.title }}</h3>
            <h4 class="hotel-description-detail">
              {{ homestay.description }}
            </h4>
            <div class="hotel-rate">
              <star-filled
                :style="{ fontSize: '18px', color: '#FF567D' }"
                v-for="start in new Array(homestay.type).fill(0)"
              />
            </div>
            <div class="hotel-price">
              {{ enums.formatNumber(homestay.price) }} / Ngày
            </div>
            <div class="hotel-address">
              <environment-outlined
                :style="{ fontSize: '18px', color: '#3395ff' }"
              />
              <p>{{ homestay.district }}, {{ homestay.province }}</p>
            </div>
          </div>
          <div class="discount">{{ homestay.discount }}% <span>Giảm</span></div>
        </div>
      </router-link>
    </div>

    <div class="paging" v-if="isHaveResults">
      <div
        @click="goStartPage"
        class="go-page-start"
        :class="{ ' disabled': isDisabledPreviousBtn }"
      >
        <double-left-outlined />
      </div>
      <div
        class="prev-btn"
        @click="previousPage"
        :class="{ ' disabled': isDisabledPreviousBtn }"
      >
        <left-outlined :style="{ fontSize: '18px', color: 'gray' }" />
      </div>
      <div class="page">{{ defaultPageIndex }}</div>
      <div
        class="next-btn"
        @click="nextPage"
        :class="{ ' disabled': isDisabledNextBtn }"
      >
        <right-outlined :style="{ fontSize: '18px', color: 'gray' }" />
      </div>
      <div
        class="go-page-end"
        :class="{ ' disabled': isDisabledNextBtn }"
        @click="goEndPage"
      >
        <double-right-outlined />
      </div>
    </div>
    <div class="dont-result" v-if="!isHaveResults">
      <h1 style="padding: 20px">
        Không tìm thấy homestay phù hợp vui lòng thử lại
      </h1>
      <!-- <img src="@/assets/imgs/dont_result.png" alt="" /> -->
    </div>
  </div>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import {
  EnvironmentOutlined,
  StarFilled,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons-vue";
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import enums from "@/helper/enum";
import resources from "@/helper/resources";

import BaseButton from "../../components/button/BaseButton.vue";
import BaseLoading from "../../components/loading/BaseLoading.vue";

const arrayListHomestays = ref([]);
const arrayProvinces = ref([]);
const defaultPageSize = ref(8);
const defaultPageIndex = ref(1);
const maxPageIndex = ref(null);
const isDisabledNextBtn = ref(false);
const isDisabledPreviousBtn = ref(false);
const isShowLoading = ref(false);
const searchKeyword = ref("");
const selectOption = ref("");
const timeout = ref(null);
const sortKey = ref("asc");
const isLogin = inject("isLogin");
const isHaveResults = ref(true);

onMounted(() => {
  isShowLoading.value = false;
  getListHotel(defaultPageIndex.value, defaultPageSize.value, sortKey.value);
});
const getListHotel = async (pageIndex, pageSize, sort, keywords = "") => {
  isShowLoading.value = true;
  await axios
    .get(
      `http://localhost:8000/api/v1/homeStays?page=${pageIndex}&limit=${pageSize}&sort=${sort}&search=${keywords}`
    )
    .then((response) => {
      if (response.status === 200) {
        isShowLoading.value = false;
        arrayListHomestays.value = response.data.data.homeStayList;
        if (arrayListHomestays.value.length > 0) {
          isHaveResults.value = true;

          if (!keywords) {
            maxPageIndex.value = Math.ceil(response.data.data.total / pageSize);
          } else {
            maxPageIndex.value = Math.ceil(
              response.data.data.searchCount / pageSize
            );
          }
        } else {
          isHaveResults.value = false;
        }
      }
    });
};

const previousPage = () => {
  isDisabledNextBtn.value = false;
  if (defaultPageIndex.value > 1) {
    --defaultPageIndex.value;
    getListHotel(
      defaultPageIndex.value,
      defaultPageSize.value,
      sortKey.value,
      searchKeyword.value
    );
  } else {
    isDisabledPreviousBtn.value = true;
    return;
  }
};

const nextPage = () => {
  isDisabledPreviousBtn.value = false;
  if (defaultPageIndex.value < maxPageIndex.value) {
    ++defaultPageIndex.value;
    getListHotel(
      defaultPageIndex.value,
      defaultPageSize.value,
      sortKey.value,
      searchKeyword.value
    );
  } else {
    isDisabledNextBtn.value = true;
    return;
  }
};
const goStartPage = () => {
  isDisabledNextBtn.value = false;
  if (defaultPageIndex.value > 1) {
    defaultPageIndex.value = 1;
    getListHotel(
      defaultPageIndex.value,
      defaultPageSize.value,
      sortKey.value,
      searchKeyword.value
    );
  } else {
    isDisabledPreviousBtn.value = true;
    return;
  }
};

const goEndPage = () => {
  isDisabledPreviousBtn.value = false;
  if (defaultPageIndex.value < maxPageIndex.value) {
    defaultPageIndex.value = maxPageIndex.value;
    getListHotel(
      defaultPageIndex.value,
      defaultPageSize.value,
      sortKey.value,
      searchKeyword.value
    );
  } else {
    isDisabledNextBtn.value = true;
    return;
  }
};
const searchAction = () => {
  isDisabledNextBtn.value = false;
  isDisabledPreviousBtn.value = false;
  if (timeout.value) {
    clearTimeout(timeout.value);
  }

  timeout.value = setTimeout(() => {
    defaultPageIndex.value = 1;
    getListHotel(
      defaultPageIndex.value,
      defaultPageSize.value,
      sortKey.value,
      searchKeyword.value
    );
  }, 1000);
};

const handleChange = () => {
  sortKey.value = resources.sortKey.filter(
    (sort) => sort.name === selectOption.value
  )[0].key;
  // console.log(sortKey.value);

  if (timeout.value) {
    clearTimeout(timeout.value);
  }

  timeout.value = setTimeout(() => {
    defaultPageIndex.value = 1;
    getListHotel(
      defaultPageIndex.value,
      defaultPageSize.value,
      sortKey.value,
      searchKeyword.value
    );
  }, 1000);
};
</script>

<style scoped>
@import url("./home-container.css");
</style>
