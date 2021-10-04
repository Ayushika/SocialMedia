/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Price from "../Components/Filters/Price/Price";
import Brand from "../Components/Filters/Brand/Brand";
import Category from "../Components/Filters/Category/Category";
import Card from "../Components/Cards/Card";
import Sort from "../Components/Sort/Sort";
import { Grid } from "@material-ui/core";
import Divider from "@mui/material/Divider";
// import Search from "../Components/Search/Search";
import Dropdown from "../Components/Dropdown/Dropdown";
import Paginate from "../Components/Pagination/Pagination";

const HomeScreen = () => {
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(["none"]);
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState(["none"]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleLimit = (value) => {
    setLimit(value);
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleBrand = (value) => {
    setBrand(value);
  };

  const handlePage = (value) => {
    setPage(value);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(async () => {
    const { data } = await axios.post(
      `http://localhost:5000/products`,
      { sort, price, category, brand, page, limit },
      config,
    );

    if (data) {
      setProducts(data);
    }
  }, [sort, price, category, brand, page, limit]);

  return (
    <Grid container direction='column'>
      {/* <Grid item>
        <Search sort={sort} price={price} brand={brand} category={category}/>
      </Grid> */}
      <Grid item justifyContent='right'>
        <Sort changeSort={handleSort} sort={sort} />
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={2}>
          <Price changePrice={handlePrice} price={price} />
          <Divider />
          <Brand brand={brand} changeBrand={handleBrand} />
          <Divider />
          <Category changeCategory={handleCategory} category={category} />
          <Divider />
        </Grid>
        <Grid item xs={10}>
          <Dropdown limit={limit} changeLimit={handleLimit} />
          <Card products={products} />
          <Paginate
            currentPage={page}
            changePage={handlePage}
            totalPage={products}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
