const resources = {
  sortKey: [
    {
      name: "Giá tăng dần",
      key: "asc",
    },
    {
      name: "Giá giảm dần",
      key: "desc",
    },
  ],
  filterStatus: [
    {
      name: "Tất cả",
      key: "all",
    },
    {
      name: "Đã thanh toán",
      key: "confirmed",
    },
    {
      name: "Đang chờ thanh toán",
      key: "booked",
    },
  ],
  status: {
    confirmed: "Đã thanh toán",
    booked: "Đang chờ thanh toán",
  },
};

export default resources;
