import React, { useState, useEffect } from "react";
import ListWish from "./ListWish";

export default function Wish() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // setInterval(() => {
    fetch("http://localhost:3001/product/wishlist/api")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
    // }, 1000);
  }, []);

  return (
    <div className="shopping-cart section">
      <div className="container">
        <table className="table">
          <thead>
            <tr style={{ background: "orange", color: "white" }}>
              <th className="text-center" style={{ padding: "15px" }}>
                PRODUCT
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                NAME
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                UNIT PRICE
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                GENDER
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                <i className="ti-shopping-cart"></i>
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                <i className="ti-trash remove-icon"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
                return <tr key={index}>
                  <ListWish
                    image={item.image}
                    name={item.name}
                    brand={item.brand}
                    gender={item.gender}
                    id={item._id}
                    price={item["new price"]}
                    priceUnit="Rs."
                    quantity={item.quantity}
                  />
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
