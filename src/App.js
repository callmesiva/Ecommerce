import React from "react";
import ReactDom from "react-dom/client";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "../src/components/Contact";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./RTK/store";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => (
  <Provider store={store}>
    <Outlet />
    <Footer />
  </Provider>
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/store",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/store/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={AppRouter} />);
