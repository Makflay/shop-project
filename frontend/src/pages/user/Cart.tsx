import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCart,
  updateCartItemThunk,
  removeCartItemThunk,
} from "../../store/cart-slice";
import type { ICartItem } from "../../types/cart";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId: string) => {
    dispatch(removeCartItemThunk(productId));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    dispatch(updateCartItemThunk({ productId, quantity }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Cart</h2>

      {cart?.items.length === 0 && <p>Cart is empty</p>}

      {cart?.items.map((i: ICartItem) => (
        <div key={i.product._id}>
          <h3>{i.product.name}</h3>
          <p>Price {i.product.price}</p>
          <p>Quantity {i.quantity}</p>

          <button
            onClick={() => handleQuantityChange(i.product._id, i.quantity - 1)}
          >
            -
          </button>
          <button
            onClick={() => handleQuantityChange(i.product._id, i.quantity + 1)}
          >
            +
          </button>
          <button onClick={() => handleRemove(i.product._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: {cart?.totalPrice}</h3>
    </div>
  );
};

export default Cart;
