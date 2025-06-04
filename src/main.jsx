import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import { CurrencyProvider } from "./Context/currencyContext.jsx";
import { CartProvider } from "./Context/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  </StrictMode>
);
