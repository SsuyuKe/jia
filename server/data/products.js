import axios from "axios";

export const productsApi = async () => {
  const getProducts = async () => {
    const data = await axios.get("/api/products");
    return response.data;
  };
  return getProducts;
};




const products = [
  {
    id: 1,
    name: "鮪魚壽司",
    category: "壽司",
    price: 80,
    image:
      "https://plus.unsplash.com/premium_photo-1664472644125-f12aecccdd52?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "蛋壽司",
    category: "壽司",
    price: 50,
    image:
      "https://plus.unsplash.com/premium_photo-1664472644125-f12aecccdd52?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "炸天婦羅",
    category: "炸物",
    price: 120,
    image:
      "https://plus.unsplash.com/premium_photo-1664472644125-f12aecccdd52?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "日式炒麵",
    categoryId: "熟食",
    price: 150,
    image: "/src/assets/images/products/yakisoba.jpg"
  },
];

export default products;
