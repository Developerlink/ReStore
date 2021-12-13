import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import Header from "../../features/catalog/Header";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import ServerError from "../errors/ServerError";

function App() {
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
            </Routes>
          </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
