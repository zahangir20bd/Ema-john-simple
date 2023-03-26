import React from "react";
import "./Product.css";

const Product = (props) => {
  console.log(props.product);
  const { img, name, price, seller, ratings, ratingsCount, shipping } =
    props.product;
  return (
    <div className="product">
      <img src={img ? img : ""} alt="" />
      <div className="product-info">
        <h6 className="product-name">{name}</h6>
        <p className="price">Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} Stars</p>
      </div>
      <button className="btn-add-cart">Add to Cart</button>
    </div>
  );
};

export default Product;
