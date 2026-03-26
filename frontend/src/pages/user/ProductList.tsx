import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Container,
  FilterBox,
  ProductGrid,
  ProductCard,
  ActionBox,
} from "./styles/product-list-styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/product-slice";
import { addToCartThunk } from "../../store/cart-slice";
import type { IProduct } from "../../types/product";

const categories = ["Electronics", "Clothes", "Books", "Home", "Sports"];

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryFilter = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product: IProduct) => {
    console.log("Add to card", product);
    dispatch(addToCartThunk({ productId: product._id, quantity: 1 }));
  };

  const filteredProducts = selectedCategory
    ? products.filter((i) => i.category === selectedCategory)
    : products;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <FilterBox>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Filter by Category"
            onChange={handleCategoryFilter}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterBox>

      {loading && <Typography>Loading...</Typography>}

      <ProductGrid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={prod._id}>
              <ProductCard>
                <Typography variant="h6">{prod.name}</Typography>
                <Typography variant="body1">{prod.price} $</Typography>
                <Typography variant="body2" color="text.secondary">
                  {prod.category}
                </Typography>

                <ActionBox>
                  <Button
                    component={RouterLink}
                    to={`/product/${prod._id}`}
                    size="small"
                    variant="outlined"
                  >
                    View Details
                  </Button>
                  {user?.role === "user" && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleAddToCart(prod)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </ActionBox>
              </ProductCard>
            </Grid>
          ))
        ) : (
          <Typography>No products available</Typography>
        )}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;
