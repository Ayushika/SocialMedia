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

const Category = ({ changeCategory, category }) => {
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(5);

  useEffect(async () => {
    const { data } = await axios.post(
      `http://localhost:5000/products/categories`,
    );
    if (data) setCategories(data);
  }, []);

  if (categories.length < 1) {
    return <h3>No Categories Available</h3>;
  }

  const showMoreCategories = () => {
    setShowCategory((prev) => prev + 3);
  };

  const handleChangeCategory = (event) => {
    if (event.target.checked) {
      changeCategory([...category, event.target.value]);
    } else {
      changeCategory(
        category.filter((item) => {
          return item !== event.target.value;
        }),
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant='h6'>Category</Typography>

      {categories.data.slice(0, showCategory).map((item) => {
        return (
          <FormControlLabel
            label={item.category_name}
            value={item.category_name}
            onChange={handleChangeCategory}
            control={<Checkbox size='small' color='primary' />}
          />
        );
      })}

      <Link
        component='button'
        variant='h3'
        alignItems='left'
        underline='none'
        onClick={showMoreCategories}
        variant='contained'
        color='primary'>
        More
      </Link>
    </Box>
  );
};

export default Category;
