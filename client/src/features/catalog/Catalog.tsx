import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

// interface Props {
//   products: Product[];
//   addProduct: () => void;
// }

const Catalog = (props: any) => {
  const products = useAppSelecter(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelecter((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending")) {
    return <LoadingComponent message="Loading products" />;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
