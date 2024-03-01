import { getProducts, deleteProduct } from "../api/productsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProduct = () => {
  const query = useQuery({
    queryKey: ["products"], //Se utiliza para nombrar la peticion
    queryFn: getProducts, // Cuando carga el componente ejecuta la funcion
  });
  return query;
};
