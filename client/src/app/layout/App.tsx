import { Container, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "../../features/catalog/Header";
import { Product } from "../../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        description: "some desctiption",
        price: prevState.length * 100 + 100,
        pictureUrl: "http://picsum.photos/200",
        brand: "some brand",
      },
    ]);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </>
  );
}

export default App;
