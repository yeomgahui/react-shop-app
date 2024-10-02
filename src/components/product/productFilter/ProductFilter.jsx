import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY,
} from "@/redux/slice/filterSlice";
import {
  selectProducts,
  selectMinPrice,
  selectMaxPrice,
} from "@/redux/slice/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("10000");

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterCategories = (category) => {
    setCategory(category);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY({ products, price, category, brand }));
  }, [dispatch, products, price, category, brand]);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className="product-filter">
      <h2>Product Filter</h2>
      {/* Add your filter controls here */}
    </div>
  );
};

export default ProductFilter;
