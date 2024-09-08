import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { auth } from "./config/firebase";
import "./index.css";
import Root from "../pages/Root";
import Shop from "../pages/Shop";
import ChiSiamo from "../pages/ChiSiamo";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Layout from "./components/Layout";
import { StateContext } from "./context/StateContext";
import { Toaster } from "react-hot-toast";
import Registrati from "../pages/Registrati";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Root />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/chiSiamo" element={<ChiSiamo />} />
      <Route path="/shop/:slug" element={<ProductDetails />} />
      <Route
        path="/registrati"
        element={
          auth.currentUser == null ? (
            <Registrati />
          ) : (
            <Navigate replace to="/dashboard" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StateContext>
        <Toaster />
        <RouterProvider router={router} />
      </StateContext>
    </AuthProvider>
  </React.StrictMode>
);
