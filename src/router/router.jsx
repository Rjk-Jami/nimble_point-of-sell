import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Products from "../Pages/Products/Products";
import CreateProduct from "../Pages/Products/CreateProduct";


  const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <DashBoard></DashBoard>,
          },
          {
            path: "/products",
            element: <Products></Products> ,
          },
          {
            path: "/createProduct",
            element: <CreateProduct></CreateProduct> ,
          },
        ],
      },
  ]);

  export default router