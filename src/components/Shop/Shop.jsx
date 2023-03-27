import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const saveCart = [];
    // Step: 1 Get Id
    for (const id in storedCart) {
      // console.log(id);
      // step 2 get the product from products state by using id
      const addedProduct = products.find((product) => product.id === id);
      // console.log(addedProduct);
      if (addedProduct) {
        // step 3 get quantity of a product from the storedCart
        const quantity = storedCart[id];
        // console.log(id, quantity);
        // step 4 set product quantity of addedProduct
        addedProduct.quantity = quantity;

        // step 5 add the addedProduct to the saveCart array
        saveCart.push(addedProduct);
      }
    }
    // step 6 set the cart
    setCart(saveCart);
  }, [products]);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
