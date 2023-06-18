import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/home_page/HomePage.vue";
import Admin from "../pages/admin/Admin.vue";
import Login from "../pages/login/Login.vue";
import Register from "../pages/register/Register.vue";
import Save from "../pages/saved/Save.vue";
import History from "../pages/history/History.vue";
import DetailHotel from "../pages/detail_hotel/DetailHotel.vue";
import Booking from "../pages/booking/Booking.vue";
import Payment from "../pages/booking/Payment.vue";
import BookingManager from "../pages/manager/BookingManager.vue";
import HomestayManager from "../pages/manager/HomestayManager.vue";

const routes = [
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    meta: {
      title: "Trang chủ",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Trang quản trị viên",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Đăng nhập",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Đăng ký",
    },
  },
  {
    path: "/save",
    name: "Save",
    component: Save,
    meta: {
      title: "Homestay yêu thích",
    },
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      title: "Đặt chỗ của tôi",
    },
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking,
    meta: {
      title: "Booking",
    },
  },
  {
    path: "/payment/:id",
    name: "Payment",
    component: Payment,
    meta: {
      title: "Payment",
    },
  },
  {
    path: "/home/:id",
    name: "DetailHotel",
    component: DetailHotel,
    meta: {
      title: "Chi tiết homestay",
    },
  },
  {
    path: "/admin/booking-manager",
    name: "BookingManager",
    component: BookingManager,
    meta: {
      title: "Quản lý đặt phòng",
    },
  },
  {
    path: "/admin/homestay-manager",
    name: "HomestayManager",
    component: HomestayManager,
    meta: {
      title: "Quản lý homestay",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
