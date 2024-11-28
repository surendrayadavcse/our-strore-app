import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../components/reduxtoolkit/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice, status, error } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
  //   dispatch(getCart(userId));
  // }, [dispatch]);
  useEffect(() => {
    // Fetch the cart when the component loads
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(getCart(userId));
    } else {
      console.error("User ID is not available in localStorage");
    }
  }, [dispatch]);
  
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (status === 'loading') return <div>Loading cart...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id}>
              <p>{item.productId.title} - Quantity: {item.quantity}</p>
              <p>Price: ${item.productId.price.toFixed(2)}</p>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          ))}
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button>Check Out</button>
        </>
      )}
    </div>
  );
};

export default Cart;
