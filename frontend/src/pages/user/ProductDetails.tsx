import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/product-slice";
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
    //dispatch action cart
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Description: ${product.description}</p>
      {user?.role === "user" && (
        <button onClick={() => handleAddToCard(product)}>Add to Cart</button>
      )}
    </div>
  );
};

export default ProductDetails;
