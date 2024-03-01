import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsApi";

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      console.log("Product added!");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
    queryClient.invalidateQueries("products");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <button>Add Product</button>
    </form>
  );
};

export default ProductForm;
