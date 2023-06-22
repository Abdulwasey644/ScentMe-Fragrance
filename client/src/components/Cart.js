import React, { useState, useEffect } from "react";
import ListCart from "./ListCart";
import { Link } from "react-router-dom";
// import StripeCheckout form "react-stripe-checkout";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(swal);

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [sum, setSum] = useState(0);
  const publickKey = "pk_test_51NInTrLkD1laOpS1YmVbM2yDFTHrfPCV3nQwDQ0QwbzjPcgS7rHaEJ2tRhv019S3I4kXY1XCqRGH0DuQdoFBNVqp000U90Fiol";

  const handleTotal = (id, quantity) => {
    setProducts(
      products.map((item) => {
        if (item["_id"] === id) {
          item.total = quantity * item["new price"];
        }
        return item;
      })
    );
    // setUpdatedProducts(products);
    let x = 0;
    products.forEach((item) => {
      x = x + item.total;
    });
    setSum(x);
  };

  const handleRemoveItem = (id) => {
    setProducts(products.filter((item) => item.id !== id));
    setUpdatedProducts(products);

    fetch("http://localhost:3001/product/cart/delete", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
      if (response.status === 200) {
        alert("product removed from cart successfully");
      }
      console.log(response);
      return response.json();
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/product/cart/api")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        data = data.map((element) => {
          return { ...element, ...{ total: element["new price"] } };
        });
        setProducts(data);
        console.log(products);
      });
  }, [updatedProducts]);

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };

  const payNow = async (token) => {
    try {
      // if(updatedProducts !== []){
      //   setProducts(updatedProducts);
      // }
      console.log(products)
      const response = await fetch("http://localhost:3001/order/payment", {
        method: "POST",
        body: JSON.stringify({ amount: sum * 100, token, products: products }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
    }
  };

  return (
    <>
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
                QUANTITY
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                TOTAL
              </th>
              <th className="text-center" style={{ padding: "15px" }}>
                <i className="ti-trash remove-icon"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index}>
                  <ListCart
                    image={item.image}
                    name={item.name}
                    brand={item.brand}
                    gender={item.gender}
                    id={item._id}
                    price={item["new price"]}
                    priceUnit="Rs."
                    quantity={item.quantity}
                    handleTotal={handleTotal}
                    total={item.total}
                    handleRemoveItem={handleRemoveItem}
                    // totalPrice={total[index].price}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="row py-3">
          <div className="col-lg-8 col-md-5 col-12"></div>
          <div className="col-lg-4 col-md-7 col-12">
            <div className="text-right">
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <div>
                    <p>Cart Subtotal</p>
                  </div>
                  <div>
                    <p>Rs. {sum}</p>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                  <div>
                    <p>Shipping</p>
                  </div>
                  <div>
                    <p>Free</p>
                  </div>
                </div>
                <hr className="divider" />
                <div className="col-12 d-flex justify-content-between text-dark">
                  <div>
                    <p>Total Pay</p>
                  </div>
                  <div>
                    <p>Rs. {sum}</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 my-2">
                    <button
                      disabled={sum === 0 ? true : false}
                      className="btn w-100 p-0"
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      <StripeCheckout
                        stripeKey={publickKey}
                        label="Proceed to pay"
                        name="Pay with credit card"
                        billingAddress
                        shippingAddress
                        amount={sum * 100}
                        currency="PKR"
                        description={`your total is Rs. ${sum}`}
                        token={payNow}
                      >
                        <div className="m-0 py-2">Procceed to pay</div>
                      </StripeCheckout>
                    </button>
                  </div>
                  <div className="col-12">
                    <Link
                      to="/"
                      className="btn w-100 py-2"
                      style={{ background: "orange", color: "white" }}
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

