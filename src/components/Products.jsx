import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productsApi";
import { useProduct } from "../hooks/useProduct";

const Products = () => {
  const query = useProduct();
  {
    query.isLoading ? <div>....Loading</div> : <div>Error: {query.error}</div>;
  }
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  return query.data?.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <button
        onClick={() => {
          deleteProductMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <input type="checkbox" name="" id="" />
      <label htmlFor="">inStock</label>
    </div>
  ));
};

export default Products;
