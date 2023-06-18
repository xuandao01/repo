const enums = {
  formatNumber(num, discount = 0) {
    if (!num) num = 0;
    num = num * (1 - discount / 100);
    return num.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  },
  replaceText(text, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (text.includes(arr[i])) {
        text = text.replace(arr[i], "");
      }
    }
    return text;
  },
};

export default enums;
