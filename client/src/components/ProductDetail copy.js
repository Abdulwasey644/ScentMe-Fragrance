import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

export default function ProductDetail() {
  const requestParameter = useParams();

  const [product, setProduct] = useState({});
  const [wishProduct, setWishProduct] = useState(requestParameter.wish);

  useEffect(() => {
    fetch(`http://localhost:3001/product/api/${requestParameter.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data[0]);
      });
  }, [requestParameter]);

  const handleWishProduct = (id) => {
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
  };

  return (
    <div className="container">
      <div className="row text-start">
        <div className="image col-lg-6 col-md-6 col-sm-12">
          <img src={product.image} style={{ width: "100%" }} alt="..." />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="content container text-start">
            <div className="name">
              <h2>{product.name}</h2>
              <h4 className="text-muted ml-3 mr-5">By {product.brand} </h4>
            </div>
            <div className="overview mt-1 d-flex  align-items-center">
              <div className="stock">
                {product.quantity ? (
                  <h3>
                    <CheckCircle style={{ color: "green" }} />
                    <span className="mx-3">In stock</span>
                  </h3>
                ) : (
                  <h3>
                    <XCircle className="mr-2" style={{ color: "red" }} />
                    <span className="mx-3">Out of stock</span>
                  </h3>
                )}
              </div>
            </div>
            <div className="description my-4">
              <h3>Descripton </h3>
              <h5 className="mx-5">{product.description}</h5>
            </div>
            <div className="others my-3">
              <div className="catagory">
                <h5 className="mr-5">
                  Catagory :
                  <span className="mx-5 text-muted">{product.catagory}</span>
                </h5>
              </div>
              <div className="type">
                <h5 className="mr-5">
                  Type :
                  <span className="mx-5 text-muted">{product.type}</span>
                </h5>
              </div>
              <div className="price">
                <h5 className="mr-5">
                  Price :
                  <span className="mx-5 text-muted">$ {product["new price"]}</span>
                </h5>
              </div>
            </div>
            <div className="action mt-3">
              <div className="d-flex justify-content-center">
                <div className="mx-1">
                  <button  ></button>
                  <button className="px-5 py-2 btn btn-dark" style={{ backgroundColor: "#BD9362", border: "0px", color: "white" }} onClick={() => handleCartProduct(product.id)}><h5>Add to cart</h5></button>
                </div>
                <div className="mx-1">
                  <button className="px-5 py-2 btn btn-dark" style={{ backgroundColor: "#BD9362", border: "0px", color: "white" }} onClick={() => handleWishProduct(product.id)}>
                    <h5>Add to wish</h5>
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