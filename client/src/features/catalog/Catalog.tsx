import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
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
    .finally(()=> setIsLoading(false));
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
