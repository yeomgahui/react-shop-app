import { selectFilteredProducts } from "@/redux/slice/filterSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SORT_PRODUCTS } from "@/redux/slice/filterSlice";

const ProductList = () => {
  const [sort, setSort] = useState("latest");

  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }));
  }, [dispatch, products, sort]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const isRadioSelected = (value) => sort === value;
  const handleRadioClick = (e) => setSort(e.target.value);

  return <div></div>;
};

export default ProductList;
