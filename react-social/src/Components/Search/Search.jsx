/** @format */

import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, TextField, AppBar, Button } from "@material-ui/core";
import axios from "axios";
import useStyles from "./styles";

const Search = ({ sort, price, category, brand }) => {
  const classes = useStyles();
  const [productData, setProductData] = useState([]);

  useEffect(async () => {
    const { data } = await axios.post(`http://localhost:5000/products/brands`);
    if (data) {
      setProductData(data);
    }
  }, []);

  console.log("Product Data : ", productData);
  if (productData.length < 1) {
    return <h1>No Product</h1>;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   const doSearch = () => {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/products`,
  //       { sort, price, category, brand },
  //       config,
  //     );
  //   };
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-evenly'
      className={classes.grid}>
      <Autocomplete
        options={productData.data.productName}
        getOptionLabel={(productdata) => productdata.product_name}
        style={{ width: 300 }}
        className={classes.auto}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search By Part Name'
            variant='outlined'
            className={classes.txtfield}
          />
        )}
      />
      <Autocomplete
        className={classes.auto}
        options={productData.data.productNumber}
        getOptionLabel={(productdata) => productdata.product_number}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search By Part ID'
            variant='outlined'
            className={classes.txtfield}
          />
        )}
      />
      <Button
        //   onClick={search}
        variant='contained'>
        Search
      </Button>
    </Grid>
  );
};

export default Search;
