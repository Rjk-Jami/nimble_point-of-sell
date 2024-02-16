import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Products from "../Pages/Products/Products";
import CreateProduct from "../Pages/Products/CreateProduct";
import Login from "../Pages/Login/Login";


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
          {
            path: "/login",
            element: <Login></Login>
          },
        ],
      },
  ]);

  export default router