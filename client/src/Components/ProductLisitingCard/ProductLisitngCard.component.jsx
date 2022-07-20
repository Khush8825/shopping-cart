import React,{useState} from "react";
import { useDispatch } from "react-redux";
import "./ProductListingCard.style.css";
import Alert from '@mui/material/Alert';
import { addItem } from "../../Store/Actions/CartActions";
import { IconButton } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const Card = ({ category }) => {
  const dispatch = useDispatch();
  const [ItemAddedToCart, setItemAddedToCart] = useState("");
  const [isItemAdded,setItemAdd] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleCartButton = async () => {
    setItemAdd(false);
    dispatch(addItem(category));
    const requestOptions = {
      method: 'POST',
      body: {}
    };
    const response = await fetch("http://localhost:3001/addToCart", requestOptions);
    const getJsonResponse = await response.json();
    setItemAddedToCart(getJsonResponse.responseMessage);
    setItemAdd(true);
  };
  return (
    <div key={category.key} className="productcategory">
      <div className="productcontent">
        <div className="productheading">{category.name}</div>
        <div className="productimageClass">
          <img src={category.imageURL} alt="category" />
        </div>
        <div className="productdescription">{category.description}</div>
        <div className="productpriceCard">
          <p>{`MRP Rs.${category.price}`}</p>
          <button className="productexploreButton" onClick={handleCartButton}>
            Buy Now
          </button>
        </div>
       {isItemAdded &&  
       <Collapse in={open}>
        <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton> 
        }
        severity="success">{ItemAddedToCart}</Alert>
        </Collapse>}
      </div>
      
    </div>
  );
};

export default Card;
