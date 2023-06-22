import React, { useEffect, useState } from "react";

export default function ListCart(props) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (op) => {
    if (op === "-" && quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    } else {
      setQuantity((quantity) => quantity + 1);
    }
  };

  useEffect(() => {
    props.handleTotal(props.id, quantity);
    if (!quantity) {
      props.handleRemoveItem(props.id);
    }
  }, [quantity]);

  return (
    <>
      <td className="image">
        <img
          src={props.image}
          style={{ width: "120px", height: "100px" }}
          alt="#"
        />
      </td>
      <td className="py-3 text-left">
        <h4>{props.name}</h4>
        <p className="text-muted">{props.brand} </p>
      </td>
      <td className="py-5">
        <span>
          {props.priceUnit} {props.price}
        </span>
      </td>
      <td className="py-4 ">
        <div className="py-3 d-flex justify-content-center">
          <div className="">
            <button
              className="btn"
              style={{ background: "orange", color: "white" }}
              // disabled={quantity === 1 ? true : false}
              onClick={() => handleQuantity("-")}
              >
              <i className="ti-minus"></i>
            </button>
          </div>
          <div className="py-1">
            <input
              type="number"
              id={props.name}
              className="btn"
              style={{
                background: "white",
                color: "black",
                width: "100px",
              }}
              readOnly={true}
              value={quantity}
            />
          </div>
          <div className="">
            <button
              className="btn"
              style={{ background: "orange", color: "white" }}
              // disabled={quantity < props.quantity ? true : false}
              onClick={() => handleQuantity("+")}
            >
              <i className="ti-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td className="py-5">
        <span>{props.total}</span>
      </td>
      <td className="py-5">
        <button className="btn" onClick={() => setQuantity(0)}>
          <i className="ti-trash remove-icon"></i>
        </button>
      </td>
    </>
  );
}
