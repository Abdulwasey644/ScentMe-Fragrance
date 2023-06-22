import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Star, StarFill, CheckCircle, XCircle } from "react-bootstrap-icons";

export default function ProductDetail() {
  const requestParameter = useParams();

  const [product, setProduct] = useState({});
  const [wishProduct, setWishProduct] = useState(requestParameter.wish === "true" ? true : false);

  useEffect(() => {
    fetch(`http://localhost:3001/product/api/${requestParameter.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data[0]);
      });
  }, [requestParameter]);

  const handleWishProduct = (id) => {
    console.log(typeof wishProduct)
    if (!wishProduct) {
      fetch("http://localhost:3001/product/cart/delete", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        console.log(response);
        return response.json();
      });
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
      if (response.status === 200) {
        alert("product added to cart successfully");
      }
      console.log(response);
      return response.json();
    });
    setWishProduct(!wishProduct);
  };

  return (
    <div className="container">
      <div className="row text-start">
        <div className="image col-lg-6 col-md-6 col-sm-12">
          <img src={product.image} style={{ width: "100%"}} alt="..." />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="content container text-start">
            <div className="name">
              <h2>{product.name}</h2>
            </div>
            <div className="overview mt-1 d-flex  align-items-center">
              <div className="rating mr-4">
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    <StarFill className="mr-1" style={{ color: "orange" }} />
                    <StarFill className="mr-1" style={{ color: "orange" }} />
                    <StarFill className="mr-1" style={{ color: "orange" }} />
                    <StarFill className="mr-1" style={{ color: "orange" }} />
                    <Star className="mr-1" style={{ color: "orange" }} />
                  </div>
                  <div className="customer-count">(1 customer review)</div>
                </div>
              </div>
              <div className="stock mx-4">
                {product.quantity ? (
                  <>
                    <CheckCircle className="mr-2" style={{ color: "green" }} />
                    <span>in stock</span>
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2" style={{ color: "red" }} />
                    <span>out of stock</span>
                  </>
                )}
              </div>
            </div>
            <div className="price mt-2">
              <div className="d-flex">
                <h4>By </h4>
                <h4 className="text-muted ml-3 mr-5">{product.brand} </h4>
                <h4>in</h4>
                <h4 className="mx-3">Rs.{product["new price"]}</h4>
              </div>
            </div>
            <div className="description my-4">
              <h5>Descripton </h5>
              <p>{product.description}</p>
            </div>
            <div className="others my-3">
              <div className="gender">
                <h5 className="mr-5">
                  Catagory :
                  <span className="mx-5 text-muted">{product.gender}</span>
                </h5>
              </div>
              <div className="size">
                <h5 className="mr-5">
                  Size :
                  <span className="mx-5 text-muted">
                    {product.size} {product["size unit"]}
                  </span>
                </h5>
              </div>
              <div className="size">
                <h5 className="mr-5">
                  Type :
                  <span className="mx-5 text-muted">{product.type}</span>
                </h5>
              </div>
            </div>
            <div className="action mt-3">
              <div className="d-flex justify-content-center">
                <div className="mx-1">
                  <button className="px-5 py-2 btn btn-dark" style={{backgroundColor : "orange", border : "0px"}} onClick={() => handleCartProduct(product._id)}>Add to cart</button>
                </div>
                <div className="mx-1">
                  <button className="px-5 py-2 btn btn-dark" style={{backgroundColor : "orange", border : "0px"}} onClick={() => handleWishProduct(product._id)}>
                    Add to favourite
                  </button>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
