import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

// interface Props {
//   products: Product[];
//   addProduct: () => void;
// }

const Catalog = (props: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingComponent message="Loading products" />;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
