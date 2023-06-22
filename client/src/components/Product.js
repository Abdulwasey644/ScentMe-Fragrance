import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

export default function Product(props) {
  // useEffect(()=>{
  //   props.setFilter({
  //     type : "",
  //     value : ""
  //   })
  // },[props])

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:3001/product/api${
        props.filter.type ? "/type/" + props.filter.type : ""
      }${props.filter.value ? "/value/" + props.filter.value : ""}`
    )
      .then((response) => response.json())
      // .catch((err) => console.log(err))
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
