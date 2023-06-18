<template>
  <div class="container">
    <Header></Header>
    <div class="booking-manager" style="margin-left: 200px">
      <Sidebar></Sidebar>
      <div class="homestay-manager_container" style="flex: 1">
        <div class="hm-header">
          <div class="hm-header-line">
            <div class="hm-header__title">Homestays</div>
            <div class="hm-header__action" @click="showHomestayDetail(0)">Create new</div>
          </div>
        </div>
        <div class="hm-dashboard">
          <div class="hm-dashboard__item">
            <div class="hm-dashboard__item--content">
              <div class="item-title">
                Homestays
              </div>
              <div class="item-value">
                {{ this.homestayData['total'] }}
              </div>
              <div class="item-detail">
                {{ this.homestayData['total'] }} activated
              </div>
              <div class="item-icon">
                <div class="homestay-icon"></div>
              </div>
            </div>
          </div>
          <div class="hm-dashboard__item">
            <div class="hm-dashboard__item--content">
              <div class="item-title">
                Hiển thị
              </div>
              <div class="item-value">
                {{ this.homestayData['homeStayList'].length }}
              </div>
              <div class="item-detail">
                {{ this.homestayData['homeStayList'].length }} showing
              </div>
              <div class="item-icon">
                <div class="eye-icon"></div>
              </div>
            </div>
          </div>
          <div class="hm-dashboard__item">
            <div class="hm-dashboard__item--content">
              <div class="item-title">
                Homestays
              </div>
              <div class="item-value">
                {{ this.homestayData['total'] }}
              </div>
              <div class="item-detail">
                {{ this.homestayData['total'] }} showing
              </div>
              <div class="item-icon">
                <div class="homestay-icon"></div>
              </div>
            </div>
          </div>
          <div class="hm-dashboard__item">
            <div class="hm-dashboard__item--content">
              <div class="item-title">
                Homestays
              </div>
              <div class="item-value">
                {{ this.homestayData['total'] }}
              </div>
              <div class="item-detail">
                {{ this.homestayData['total'] }} activated
              </div>
              <div class="item-icon">
                <div class="homestay-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="hm-content">
          <div class="hm-content__title">
            Homestays
          </div>
          <div class="hm-content__main">
            <table>
              <thead>
                <tr>
                  <th :style="[{width: item['colWidth']}, {padding: '0 20px'}, {textAlign: item['alignment']}]" v-for="(item, index) in columnsConfig" :key="index">{{ item['colName'] }}</th>
                  <th class="grid-function">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in homestayData['homeStayList']" :key="index">
                  <td :title="item[value['dataRow']]" :style="[{maxWidth: value['colWidth'], fontFamily: value['fontFamily'] + '!important'}, {padding: '0px 20px'}, {textAlign: value['alignment']}]" v-for="(value, inx) in columnsConfig" :key="inx">
                    <div v-if="inx == 0">
                      <img class='thumbnail-img' :src="item[value['dataRow']]">
                    </div>
                    <div v-else-if="value['dataRow'] == 'price'">
                      <div class="actual-price">{{ item[value['dataRow']].toLocaleString('en-US') }}</div>
                      <div class="discount-price">{{ ((item[value['dataRow']]*(100 - item['discount']))/100).toLocaleString('en-US') }}</div>
                    </div>
                    <div v-else-if="value['dataRow'] == 'discount'">
                      {{ item[value['dataRow']]+'%' }}
                    </div>
                    <div v-else>
                      {{ item[value['dataRow']] }}
                    </div>
                  </td>
                  <td class="grid-function">
                    <div class="function fn1" title="Nhân bản"></div>
                    <div class="function fn2" @click="showHomestayDetail(2, item)" title="Sửa"></div>
                    <div class="function fn3" title="Xóa"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="hm-footer" style="background-color: #fff; height: 50px; padding: 0 10px; width: 100%; line-height: 50px; display: flex; justify-content: space-between;">
            <div class="total-rc" style="font-family: Roboto-bold; ">Tổng số: {{ this.homestayData['total']  }} bản ghi</div>
            <div class="pagination" style="display: flex; column-gap: 8px">
              <div @click="() => {if (currentPage > 1) currentPage--;}" style="cursor: pointer;" :class="{'disable': currentPage == 1}">Trước</div>
              <div class="curent-page"><input style="padding: 0 8px; height: 30px; width: 35px;" :value="currentPage"></div>
              <div> / {{ Math.ceil(this.homestayData['total']/this.pageSize)  }}</div>
              <div @click="() => {if (currentPage < Math.ceil(this.homestayData['total']/this.pageSize)) currentPage++;}" :class="{'disable': currentPage == Math.ceil(this.homestayData['total']/this.pageSize)}">Sau</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
  <HomestayDetail :homestay="currentHomestay" :actionMode="detailActionMode" @closeDetail="showDetail=false" v-if="showDetail"></HomestayDetail>
  </div>
</template>
<script>
  import BaseLoading from '@/components/loading/BaseLoading.vue';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/sidebar/Sidebar.vue';
  import HomestayDetail, { ActionMode } from './HomestayDetail.vue';
  export default {
    components: {BaseLoading, Header, Sidebar, HomestayDetail},
    created(){
      this.homestayData = {
        homeStayList: [],
        total: 0,
        searchCount: 0,
      }
    },

    watch:{
      currentPage: function(){
        this.getHomeStayInfo(this.currentPage, this.pageSize);
      }
    },

    mounted(){
      this.getHomeStayInfo(this.currentPage, this.pageSize);
    },

    methods:{

      showHomestayDetail(action, data){
        this.detailActionMode = action;
        if (action == ActionMode.create) {
          this.currentHomestay = {
            title: '',
            description: '',
            discount: 0,
            district: '',
            maxSize: 0,
            price: 0,
            province: '',
            streetAddress: '',
            thumbnail: '',
            type: '',
            wards: '',
            utilities: [],
            imgs: [],
          }
        } else {
          this.currentHomestay = data;
        }
        this.showDetail = true;
      },

      async getHomeStayInfo(pageIndex, pageSize, sort, keywords = "") {
        let res = await fetch(`http://localhost:8000/api/v1/homeStays?page=${pageIndex}&limit=${pageSize}&sort=${sort}&search=${keywords}`);
        let data = await res.json();
        if (data['data'])
          this.homestayData = data['data'];
          console.log(this.homestayData);
        // await axios
        // .get(
        //   `http://localhost:8000/api/v1/homeStays?page=${pageIndex}&limit=${pageSize}&sort=${sort}&search=${keywords}`
        // )
        // .then((response) => {
        //   if (response.status === 200) {
        //     this.homestayData = response;
        //   }
        // });
      }
    },

    data() {
      return {
        homestayData: null,
        currentPage: 1,
        pageSize: 20,
        showDetail: false,
        currentHomestay: null,
        detailActionMode: 0,
        columnsConfig: [
          {
            colName: "Ảnh mẫu",
            alignment: "left",
            dataRow: "thumbnail",
            colWidth: "220px",
            color: "#111111",
            fontFamily: "Roboto",
            clickable: true,
            doubleClickabe: true,
          },
          {
            colName: "Tiêu đề",
            alignment: "left",
            dataRow: "title",
            fontFamily: "Roboto-bold",
            colWidth: "200px",
            color: "#111111",
            clickable: true,
            doubleClickabe: true,
          },
          {
            colName: "Tỉnh/Thành phố",
            alignment: "left",
            dataRow: "province",
            colWidth: "150px",
            fontFamily: "Roboto",
            color: "#111111",
            clickable: true,
            doubleClickabe: true,
          },
          {
            colName: "Quận/Huyện",
            alignment: "left",
            dataRow: "district",
            colWidth: "150px",
            fontFamily: "Roboto",
            color: "#111111",
            clickable: true,
            doubleClickabe: true,
          },
          {
            colName: "Địa chỉ",
            alignment: "left",
            dataRow: "streetAddress",
            colWidth: "200px",
            fontFamily: "Roboto",
            color: "#111111",
            clickable: true,
            doubleClickabe: true,
          },
          {
            colName: "Mức giá",
            alignment: "right",
            dataRow: "price",
            colWidth: "100px",
            fontFamily: "Roboto",
            color: "#111111",
            clickable: true,
            doubleClickabe: true,
          },
          {
            colName: "Giảm giá",
            alignment: "center",
            dataRow: "discount",
            colWidth: "100px",
            fontFamily: "Roboto",
            color: "#111111",
            clickable: true,
            doubleClickabe: true,
          }
        ],
      }
    },
  }
</script>


<!-- <script setup>

const isShowLoading = ref(true);
const homestayData = ref(null);

import Header from "@/components/Header.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import axios from "axios";
import { inject, onMounted, ref, onBeforeMount } from "vue";
import BaseLoading from "../../components/loading/BaseLoading.vue";

onBeforeMount(() => {
  homestayData.value.homeStayList = [];
  homestayData.value.searchCount = 0;
  homestayData.value.totalCount = 0;
});

onMounted(() => {
  getHomeStayInfo(1, 20);
});

const getHomeStayInfo = async (pageIndex, pageSize, sort, keywords = "") => {
  await axios
    .get(
      `http://localhost:8000/api/v1/homeStays?page=${pageIndex}&limit=${pageSize}&sort=${sort}&search=${keywords}`
    )
    .then((response) => {
      if (response.status === 200) {
        isShowLoading.value = false;
        debugger
        return response;
      }
    });
};
</script> -->

<style scoped>

.disable{
  cursor: not-allowed !important;
  pointer-events: none;
  color: #a0a0a0;
}

.function{
  height: 20px;
  width: 20px;
  background-color: red;
  position: absolute;
  top: 85px;
  right: 50px;
  cursor: pointer;
}

.fn1{
  margin-right: 80px;
  background: url('@/assets/icons/icons8-duplicate-30.png');
  background-size: 20px 20px;
}

.fn2{
  margin-right: 40px;
  background: url('@/assets/icons/icons8-modify-30.png');
  background-size: 20px 20px;
}

.fn3{
  background: url('@/assets/icons/icons8-delete-30.png');
  background-size: 20px 20px;
}

tbody .grid-function{
  display: flex;
  column-gap: 8px;
  position: relative;
}

.grid-function{
  width: 200px;
}

.actual-price{
  text-decoration: line-through;
  font-size: 12px;
}

.discount-price{
  font-family: Roboto-bold !important;
  color: #ff0000;
}

table{
  background-color: #fff;
}

.thumbnail-img{
  max-height: 190px;
  max-width: 180px;
  border-radius: 4px;
}

tr th{
  font-family: Roboto-bold;
}

thead tr{
  height: 50px;
  border-bottom: solid 1px #a0a0a0;
  background-color: #f0f0f0;
}

tbody tr{
  height: 200px;
  border-bottom: solid #a0a0a0 1px;
}

tr td div {
  white-space: wrap;
  line-height: 26px;
}
.hm-header-line{
  height: 30px;
  width: calc(100% - 40px) !important;
  margin: 0px 20px;
  position: absolute;
  top: 40px;
  width: 100px;
  display: flex;
  justify-content: space-between;
}

.hm-header__title{
  font-size: 26px;
  font-family: Roboto-bold;
  line-height: 30px;
  color: #fff;
  width: 100px; 
}

.hm-content{
  width: calc(100% - 40px);
  margin: 30px 20px 5px 20px;
}

.hm-content__title{
  font-size: 16px;
  font-family: Roboto-bold;
  line-height: 40px;
  background-color: #fff;
  border-radius: 4px 4px 0px 0px;
  border-bottom: solid 1px #a0a0a0;
  padding-left: 10px;
}

.hm-header__action{
  font-size: 16px;
  background-color: #fff;
  height: 30px;
  /* width: 180px; */
  line-height: 30px;
  padding: 0px 10px;
  border-radius: 6px;
}

.hm-header__action:hover{
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.item-icon{
  height: 40px;
  width: 40px;
  position: absolute;
  right: 15px;
  top: 15px;
  background-color: #634bff58;
  border-radius: 2px;
}

.container{
  background-color: #e9ecef;
}
.hm-header {
  height: 200px;
  background-color: #624bff;
  position: relative;
}

.hm-dashboard__item {
  background-color: #fff;
  height: 180px;
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
}
.hm-dashboard{
  display: flex;
  justify-content: space-around;
  margin-top: -90px;
}

.hm-dashboard__item--content{
  height: 80%;
  width: 80%;
  position: absolute;
  top: 10%;
  left: 10%;
}

.item-title{
  font-size: 20px;
  line-height: 66px;
  font-family: Roboto-bold;
}

.item-value{
  font-size: 26px;
  line-height: 26px;
  font-family: Roboto-bold;
}

.homestay-icon{
  background-image: url("@/assets/icons/icons8-home-30.png");
  height: 30px;
  width: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
}
.eye-icon{
  background-image: url("@/assets/icons/icons8-eye-30.png");
  height: 30px;
  width: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
}

.item-detail{
  font-size: 12px;
  line-height: 66px;
}
</style>
