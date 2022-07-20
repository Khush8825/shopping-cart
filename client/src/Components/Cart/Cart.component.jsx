import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../Store/Actions/CartActions";
import "./Cart.style.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@mui/material';

const Cart = ({setShowCart}) => {
  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const dispatch = useDispatch();
  return (
    <div className="Cart">
      <Grid className="cartheading" container spacing={2}>
        <Grid  item xs={11}>
          My Cart
          </Grid>
          <Grid item xs={1}>
          <div onClick={() => setShowCart(false)}>
             <FontAwesomeIcon icon="window-close" /></div></Grid> 
          </Grid>

      <Card sx={{ minWidth: 275 }} className="card-content">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div className="cartItem">
                    <img src={item.imageURL} className="productImage" />
                    <div className="cartcontainer">
                      <p className="productname">{item.name}</p>
                      <button className="cartaction" onClick={() => dispatch(addItem(item))}>+</button>
                      {item.quantity}
                      <button className="cartaction" onClick={() => dispatch(removeItem(item))}>-</button> X {item.price}
                    </div>
                    <div className="productprice">{`Rs.${item.quantity * item.price}`}</div>
                  </div>
                ))}
              </>
            ) : (
              <div align="center" style={{ fontSize: '15px', margin: '60px' }}><b>No Items in your cart</b><br />
                <p style={{ fontSize: '12px' }}>Your favourite items are just a click away</p></div>
            )}
          </Typography>
        </CardContent>

        <div style={{ backgroundColor: '#f5efef' }}>
          <p style={{ padding: '10px' }}>Promo code can be applied on payment page</p>
          {cartItems.length > 0 ? <Button onClick={() => setShowCart(false)} className="cart-button" >
            Proceed to Checkout
          </Button> :
            <Button onClick={() => setShowCart(false)} className="cart-button">Start Shopping</Button>}</div>
      </Card>
 
    </div>
  );
};

export default Cart;
