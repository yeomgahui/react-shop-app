const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let tempProducts = [];
      if (brand === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let tempProducts = [];

      tempProducts = products.filter((product) => product.price <= price);
      state.filteredProducts = tempProducts;
    },
    FILTER_BY: (state, action) => {
      const { products, price, brand, category } = action.payload;
      let tempProducts = [];

      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      if (brand == "All") {
        tempProducts = tempProducts;
      } else {
        tempProducts = tempProducts.filter(
          (product) => product.brand === brand
        );
      }

      tempProducts = tempProducts.filter((product) => product.price <= price);

      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }
      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => a.price - b.price);
      }
      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => b.price - a.price);
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;

      let tempProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      });

      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY,
  SORT_PRODUCTS,
  FILTER_BY_SEARCH,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
