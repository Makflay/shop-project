import { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {
  Container,
  ProductCard,
  InfoBox,
  LinksBox,
} from "./styles/product-details-styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/product-slice";
import { addToCartThunk } from "../../store/cart-slice";
import type { IProduct } from "../../types/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product: IProduct | undefined = products.find((i) => i._id === id);

  const handleAddToCard = (product: IProduct) => {
    console.log("Add to cart", product);
    dispatch(addToCartThunk({ productId: product._id, quantity: 1 }));
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography>Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <ProductCard>
        <Typography variant="h4">{product.name}</Typography>
        <InfoBox>
          <Typography variant="h6">Price: {product.price} $</Typography>
          <Typography variant="body1" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
        </InfoBox>

        {user?.role === "user" && (
          <Button variant="contained" onClick={() => handleAddToCard(product)}>
            Add to Cart
          </Button>
        )}
        <LinksBox>
          <Typography variant="body2">
            Back to the shop{" "}
            <Link component={RouterLink} to="/products">
              Shop
            </Link>
          </Typography>
        </LinksBox>
      </ProductCard>
    </Container>
  );
};

export default ProductDetails;
