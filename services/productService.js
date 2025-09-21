import API from "../config/api";

export const ProductService = {
  getAll: async () => {
    const res = await API.get("/products");
    return res.data;
  },
  getById: async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
  },
};
