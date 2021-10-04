/** @format */

import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";

const Cards = ({ products }) => {
  if (products.length < 1) {
    return <h3>No Products</h3>;
  }

  if (products.count < 1) {
    return <h3>No Products</h3>;
  }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      {products.data.map((item) => {
        return (
          <Paper
            key={`${item.product_id}`}
            style={{
              margin: 40,
              width: "20vw",
              borderColor: "darkblue",
              borderRadius: "15px",
              marginTop: -25,
            }}>
            <Grid container direction='row'>
              <Grid direction='column'>
                <Typography gutterBottom variant='subtitle1'>
                  {`${item.brand_name}`}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {`${item.product_name} : ${item.category_name}`}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {`${item.product_number}`}
                </Typography>
                <Typography variant='body2'>
                  {`$${item.product_price}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Grid>
  );
};

export default Cards;
