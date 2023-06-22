import React, { useState } from "react";
import { Cart, Star, StarFill ,Eye} from "react-bootstrap-icons";
import {Link ,useNavigate} from "react-router-dom"

export default function Card(props) {
  const [wishProduct, setWishProduct] = useState(props.wish);

  const handleWishProduct = (id) => {
    if (!wishProduct) {
      fetch("http://localhost:3001/product/wishlist/add", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        if (response.status === 200) {
          alert("product added to wish list successfully");
        }
        console.log(response);
        return response.json();
      });
    } else {
      fetch("http://localhost:3001/product/wishlist/delete", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        if (response.status === 200) {
          alert("product removed from wish list successfully");
        }
        console.log(response);
        return response.json();
      });
    }
    setWishProduct(!wishProduct);
  };

  const handleCartProduct = (id) => {
    fetch("http://localhost:3001/product/wishlist/delete", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
    fetch("http://localhost:3001/product/cart/add", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
  };

  const navigate = useNavigate();

  const ProductDetails = (id) =>{
    navigate(`/product/detail/${id}/wish/${wishProduct}`)
  }

  return (
    <div className="card p-3" style={{position : "relative"}}>
      <div style={{position : "absolute", right:"0px"}}><button className="btn" onClick={()=> ProductDetails(props.id)}><Eye className="h5"/></button></div>
      <h5 className="card-title">{props.name}</h5>
      <h6 className="card-subtitle text-dark">by {props.brand}</h6>
      <div>
        <img
          className="my-4"
          style={{ width: "100%" , height : "250px"}}
          src={props.image}
          alt={`${props.name === undefined ? "Item's" : props.name}`}
        />
      </div>
      <h6>
        {props.oldPrice !== props.price ? (
          <span
            className="old mx-2"
            style={{ textDecoration: "line-through", opacity: "0.75" }}
          >
            <i>
              <span>{props.priceUnit}</span> {props.oldPrice}
            </i>
          </span>
        ) : (
          ""
        )}
        <span>
          <span>{props.priceUnit}</span>
          {props.price}
        </span>
      </h6>
      <div className="row mt-3">
        <div className="col-12 p-1">
          <button
            className="btn px-1 w-100"
            style={{ border: "2px solid orange", margin: "auto" }}
            onClick={() => handleWishProduct(props.id)}
            data-toggle="tooltip"
            data-placement="bottom"
            title={wishProduct ? "Remove from wish list" : "Add to wish list"}
          >
            <div className="d-flex justify-content-between align-items-center"></div>
            <span className="h6 mx-1">
              {wishProduct ? (
                <StarFill color="orange" />
              ) : (
                <Star color="orange" />
              )}
            </span>
            <span className="h6 mx-1">Add to wish</span>
          </button>
        </div>
        <div className="col-12 p-1">
          <Link
            to="/cart"
            type="submit"
            className="btn px-1 w-100 " 
            style={{ border: "2px solid orange ", margin: "auto"}}
            onClick={() => handleCartProduct(props.id)}
            data-toggle="tooltip"
            data-placement="bottom"
            title={"Add to cart"}
          >
            <div className="d-flex justify-content-between "></div>
            <span className="h6 mx-1">
              <Cart color="orange" />
            </span>
            <span className="h6 mx-1">Add to cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
