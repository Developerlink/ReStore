import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "../../features/about/AboutPage";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/basket/BasketPage";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Catalog from "../../features/catalog/Catalog";
import Header from "../../features/catalog/Header";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import OrdersPage from "../../features/orders/OrdersPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { useAppDispatch } from "../store/configureStore";
import LoadingComponent from "./LoadingComponent";
import RequireAuth from "./RequireAuth";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setIsLoading(false));
  }, [initApp]);

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
    return <LoadingComponent message="Initialising app..." />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar />
        <CssBaseline />
        <Header
          isDarkMode={isDarkMode}
          handleThemeChange={themeChangeHandler}
        />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:id" element={<ProductDetails />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/server-error" element={<ServerError />} />
              <Route path="/basket" element={<BasketPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/checkout" element={<CheckoutWrapper />} />
              <Route path="/orders" element={<OrdersPage />} /> 
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
