/** @format */

import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const Sort = ({ changeSort, sort }) => {
  return (
    <Box sx={{ maxWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id='select-price' style={{ marginLeft: 20 }}>
          Sort By Price
        </InputLabel>
        <Select
          value={sort}
          onChange={(e) => changeSort(e.target.value)}
          labelId='select-price'
          id='sort-select-price'
          label='Price'
          variant='outlined'>
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>High To Low</MenuItem>
          <MenuItem value={2}>Low To High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
