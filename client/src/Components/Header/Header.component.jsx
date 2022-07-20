import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Header.styles.css";
import Cart from '../Cart/Cart.component'
import { userSignOut } from "../../Store/Actions/UserAction";

const Header = () => {
  const [showCart, setShowCart] = useState(false)
  const handleCart = () => {
      setShowCart(!showCart);
  }
  const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const cartlength = useSelector(item=>item.CartReducer.cartItems.length);
  return ( 
    <div>
      {showCart && <Cart setShowCart={setShowCart} />}
    <div className="header">
      
      <div className="navbar">
        <div className="logo">
          <img src="static\images\logo.png" />
        </div>
        <div className="menu">
          <a href='/' className="leftmenu">Home</a>
          <a href='/products' className="leftmenu">Products</a>
        </div>
        <div className="cart">
          {isLoggedIn ? <>
          <div className="right-menu-login">
            <span className='right-menu first-name'>
              <FontAwesomeIcon icon='user-circle' style={{fontSize:'25px',color:'black'}} />
            {"  "} 
            <b>{userCredentials && userCredentials.firstName }</b>
                </span> &nbsp;&nbsp;
                <button
                  className='right-menu right-menu-button'
                  onClick={() => dispatch(userSignOut())}
                >
                  Sign Out
                </button>
                </div>
          </>:
          <div className="register">
            <a href='/login' className="righttmenu">Signin</a>
            <a href='/register' className="righttmenu">Register</a>
          </div>}
          <div className="cartimage">
           <button onClick={handleCart}><img src="static\images\cart.svg" height={50} width={50} />
            <p>{`${cartlength} items`}</p>
            </button> 
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
