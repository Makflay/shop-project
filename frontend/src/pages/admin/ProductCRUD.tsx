import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import type { SelectChangeEvent } from "@mui/material/Select";

import {
  Container,
  FormBox,
  FilterBox,
  TableWrapper,
  ActionBox,
} from "./styles/product-crud-styles";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setForm({
      ...form,
      category: e.target.value,
    });
  };

  const handleCategoryFilter = (e: SelectChangeEvent<string>) => {
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      {/* FORM */}
      <FormBox onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          size="small"
        />

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          size="small"
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          size="small"
        />

        <FormControl size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={form.category}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          size="small"
        />

        <Button type="submit" variant="contained">
          {editingId ? "Update" : "Create"}
        </Button>
      </FormBox>

      {/* FILTER */}
      <FilterBox>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Filter by Category"
            onChange={handleCategoryFilter}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterBox>

      {loading && <Typography>Loading...</Typography>}

      {/* TABLE */}
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.price.toFixed(2)} $</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>{p.category}</TableCell>

                  <TableCell align="right">
                    <ActionBox>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </Button>
                    </ActionBox>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>There are no products</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </Container>
    // <div>
    //   <h2>Product Managment</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">Name</label>
    //     <input name="name" value={form.name} onChange={handleChange} />
    //     <label htmlFor="description">Description</label>
    //     <input
    //       name="description"
    //       value={form.description}
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="price">Price</label>
    //     <input
    //       name="price"
    //       type="number"
    //       value={form.price}
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="category">Category</label>
    //     <select name="category" value={form.category} onChange={handleChange}>
    //       {categories.map((i) => (
    //         <option key={i} value={i}>
    //           {i}
    //         </option>
    //       ))}
    //     </select>
    //     <label htmlFor="stock">Stock</label>
    //     <input
    //       name="stock"
    //       type="number"
    //       value={form.stock}
    //       onChange={handleChange}
    //     />
    //     <button type="submit">{editingId ? "Update" : "Create"}</button>
    //   </form>

    //   <hr />

    //   <label>Filter by Category:</label>
    //   <select value={selectedCategory} onChange={handleCategoryFilter}>
    //     <option value="">All</option>
    //     {categories.map((i) => (
    //       <option key={i} value={i}>
    //         {i}
    //       </option>
    //     ))}
    //   </select>

    //   {loading && <p>Loading...</p>}

    //   <hr />

    //   <table border={1} cellPadding={10}>
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Price</th>
    //         <th>Stock</th>
    //         <th>Category</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {products.length > 0 ? (
    //         filteredProducts.map((p) => (
    //           <tr key={p._id}>
    //             <td>{p.name}</td>
    //             <td>{p.price}</td>
    //             <td>{p.stock}</td>
    //             <td>{p.category}</td>
    //             <td>
    //               <button onClick={() => handleEdit(p)}>Edit</button>
    //               <button onClick={() => handleDelete(p._id)}>Delete</button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan={3}>There are no products</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ProductCRUD;
