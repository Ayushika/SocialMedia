/** @format */

import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const Dropdown = ({ changeLimit, limit }) => {
  return (
    <Box sx={{ maxWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id='select-limit' style={{ marginLeft: 20 }}>
          Show Records
        </InputLabel>
        <Select
          value={limit}
          onChange={(e) => changeLimit(e.target.value)}
          labelId='select-limit'
          id='sort-select-limit'
          label='Records'
          variant='outlined'>
          <MenuItem value={10}>Up to 10</MenuItem>
          <MenuItem value={20}>Up to 20</MenuItem>
          <MenuItem value={30}>Up to 30</MenuItem>
          <MenuItem value={40}>Up to 40</MenuItem>
          <MenuItem value={50}>Up to 50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
