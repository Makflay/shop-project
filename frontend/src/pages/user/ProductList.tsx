import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div>
      <h2>Product List</h2>
      <label>Filter by Category</label>
      <select value={selectedCategory} onChange={handleCategoryFilter}>
        <option value="">All</option>
        {categories.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}

      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((i) => (
            <div key={i._id}>
              <h3>{i.name}</h3>
              <p>{i.price}</p>
              <p>{i.category}</p>
              <Link to={`/product/${i._id}`}>View Details</Link>
              {user?.role === "user" && (
                <button onClick={() => handleAddToCart(i)}>Add to Card</button>
              )}
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
