import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Container,
  CartItemCard,
  ItemInfo,
  QuantityBox,
  TotalBox,
} from "./styles/cart-styles";
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

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart?.items.length === 0 && <Typography>Cart is empty</Typography>}

      {cart?.items.map((item: ICartItem) => (
        <CartItemCard key={item.product._id}>
          <ItemInfo>
            <Typography variant="h6">{item.product.name}</Typography>
            <Typography variant="body2">
              Price: {item.product.price} $
            </Typography>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
          </ItemInfo>

          <QuantityBox>
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                handleQuantityChange(item.product._id, item.quantity - 1)
              }
            >
              -
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                handleQuantityChange(item.product._id, item.quantity + 1)
              }
            >
              +
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleRemove(item.product._id)}
            >
              Remove
            </Button>
          </QuantityBox>
        </CartItemCard>
      ))}

      {cart && (
        <TotalBox>
          <Typography variant="h6">
            Total: {cart.totalAmount.toFixed(2)} $
          </Typography>
        </TotalBox>
      )}
    </Container>
  );
};

export default Cart;
