export default function ListWish(props) {
  const removeWishProduct = (id) => {
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
  };

  const addCartProduct = (id) => {
    removeWishProduct(id);
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
        <p className="product-des text-muted">{props.brand} </p>
      </td>
      <td className="py-5">
        <span>
          {props.priceUnit} {props.price}
        </span>
      </td>
      <td className="qty py-5">
        <span>{props.gender}</span>
      </td>
      <td className="py-5">
        <button
          className="btn"
          onClick={() => addCartProduct(props.id)}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Add to cart"
        >
          <span>
            <i className="ti-shopping-cart"></i>
          </span>
        </button>
      </td>
      <td className="py-5" data-title="Remove">
        <button
          className="text-dark btn"
          onClick={() => removeWishProduct(props.id)}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Remove from wish list"
        >
          <i className="ti-trash remove-icon"></i>
        </button>
      </td>
    </>
  );
}
