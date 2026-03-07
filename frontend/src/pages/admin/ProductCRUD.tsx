import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchProducts,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../store/product-slice";
import type { IProduct } from "../../types/product";

const initialForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
};
const categories = ["Electronics", "Clothes", "Books", "Home", "Sports"];

const ProductCRUD = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      dispatch(updateProductThunk({ id: editingId, product: form }));
      setEditingId(null);
    } else {
      dispatch(createProductThunk(form));
    }

    setForm(initialForm);
  };

  const handleEdit = (product: IProduct) => {
    console.log("product handle edit", product);
    setEditingId(product._id);
    setForm(product);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProductThunk(id));
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div>
      <h2>Product Managment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <label htmlFor="stock">Stock</label>
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      <hr />

      <label>Filter by Category:</label>
      <select value={selectedCategory} onChange={handleCategoryFilter}>
        <option value="">All</option>
        {categories.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}

      <hr />

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            filteredProducts.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>There are no products</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCRUD;
