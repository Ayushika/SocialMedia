/** @format */

import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate = ({ currentPage, changePage, totalPage }) => {
  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPage.totalPage}
      page={currentPage}
      variant='outlined'
      color='primary'
      onChange={(e, v) => changePage(v)}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          //   component={Link}

          // to={`/products?page=${item.page}&sort=${value}&category=${category}&price=${price}&brand=${brand}&partname=${partname}&partnumber=${partnumber}`}
        />
      )}
    />
  );
};

export default Paginate;
