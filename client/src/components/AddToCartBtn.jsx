import React from 'react';

export default function AddToCartBtn(props) {
  const {
    cart, setCart, disabled, productId,
  } = props;

  function addToCart() {
    const updatedCart = cart;

    if (cart.length !== 0) {
      let productExistsInCart = false;

      cart.map((cartProduct, index) => {
        if (cartProduct.id === productId) {
          productExistsInCart = true;
          updatedCart[index].quantity += 1;
          setCart([...updatedCart]);
          return null;
        }
        return null;
      });
      if (!productExistsInCart) {
        updatedCart.push({ id: productId, quantity: 1 });
        setCart([...updatedCart]);
      }
    } else setCart([{ id: productId, quantity: 1 }]);
  }

  return (
    <button
      onClick={addToCart}
      disabled={disabled}
      type="button"
    >
      Add to cart
    </button>
  );
}
