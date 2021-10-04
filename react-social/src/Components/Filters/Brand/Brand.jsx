/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Checkbox,
  Link,
  FormControlLabel,
} from "@material-ui/core";

const Brand = ({ brand, changeBrand }) => {
  const [brands, setBrands] = useState([]);
  const [showBrand, setShowBrand] = useState(5);

  useEffect(async () => {
    const { data } = await axios.post(`http://localhost:5000/products/brands`);
    if (data) setBrands(data);
  }, []);

  if (brands.length < 1) {
    return <h3>No Brands Available</h3>;
  }
  const handleChangeBrand = (event) => {
    if (event.target.checked) {
      changeBrand([...brand, event.target.value]);
    } else {
      changeBrand(
        brand.filter((item) => {
          return item !== event.target.value;
        }),
      );
    }
  };

  const showMoreBrands = () => {
    setShowBrand((prev) => prev + 3);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant='h6'>Brand</Typography>
      {brands.data.brand.slice(0, showBrand).map((item) => {
        return (
          <FormControlLabel
            label={item.brand_name}
            value={item.brand_name}
            onChange={handleChangeBrand}
            control={<Checkbox size='small' color='primary' />}
          />
        );
      })}
      <Link
        component='button'
        variant='h3'
        onClick={showMoreBrands}
        variant='contained'
        color='primary'>
        More
      </Link>
    </Box>
  );
};

export default Brand;
