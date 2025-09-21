import API from "../config/api";

export const CartService = {
  getCart: async () => {
    const res = await API.get("/cart");
    return res.data;
  },
  addToCart: async (productId, quantity = 1) => {
    const res = await API.post("/cart", { productId, quantity });
    return res.data;
  },
  removeFromCart: async (productId) => {
    const res = await API.delete(`/cart/${productId}`);
    return res.data;
  },
  clearCart: async () => {
    const res = await API.delete("/cart");
    return res.data;
  },
};
