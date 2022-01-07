import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import { useAppSelecter } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

const ProductList = (props: Props) => {
  const { productsLoaded } = useAppSelecter((state) => state.catalog);
  return (
    <Grid container spacing={3}>
      {props.products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard key={product.id} product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
