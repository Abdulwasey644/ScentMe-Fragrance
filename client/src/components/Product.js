import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

export default function Product(props) {

  const [products, setProducts] = useState([]);
  const  baseurl = "https://scent-me-fragrance-05.onrender.com/"
  useEffect(() => {
    fetch(
      `${baseurl}product/api${
        props.filter.type ? "/type/" + props.filter.type : ""
      }${props.filter.value ? "/value/" + props.filter.value : ""}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [props.filter]);

  return (
    <div className="container">
      <Filter setFilter={props.setFilter} filter={props.filter} />
      <div className="row g-5">
        {products !== [] ? (
          products.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <ProductCard
                style={{
                  background: "#fff",
                  height: "450px",
                  fontSize: "28px",
                }}
                image={item.image}
                name={item.name}
                brand={item.brand}
                id={item._id}
                oldPrice={item["old price"]}
                price={item["new price"]}
                priceUnit="Rs."
                wish={item.wish}
              />
            </div>
          ))
        ) : (
          <div className="text-danger m-auto"> No result found</div>
        )}
      </div>
    </div>
  );
}
