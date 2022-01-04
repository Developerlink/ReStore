import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import Header from "../../features/catalog/Header";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";

function App() {
   const {setBasket} = useStoreContext();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const buyerId = getCookie('buyerId');
     if (buyerId){
       agent.Basket.get()
       .then(basket => setBasket(basket))
       .catch(error => console.log(error))
       .finally(() => setIsLoading(false));
     } else {
       setIsLoading(false);
     }
   }, [setBasket])

  const [isDarkMode, setIsDarkMode] = useState(true);
  const paletteType = isDarkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const themeChangeHandler = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return <LoadingComponent message="Initialising app..." />
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar />
          <CssBaseline />
          <Header
            isDarkMode={isDarkMode}
            handleThemeChange={themeChangeHandler}
          />
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:id" element={<ProductDetails />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/server-error" element={<ServerError />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
