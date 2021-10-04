/** @format */

import React from "react";
import { Slider, Box, Typography } from "@material-ui/core";

const Price = ({ changePrice, price }) => {
  const valueText = (value) => {
    changePrice(value);
    return `${value}`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant='h6'>Price</Typography>

      <Slider
        size='small'
        defaultValue={0}
        aria-label='Price'
        getAriaValueText={valueText}
        step={50}
        min={0}
        max={10000}
        valueLabelDisplay='auto'
      />
    </Box>
  );
};

export default Price;
