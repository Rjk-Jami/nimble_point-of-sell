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
import UpdateProduct from "../Pages/Products/UpdateProduct";
import ProductDetails from "../Pages/Products/productDetails";
import POS from "../Pages/POS/POS";
import Expenses from "../Pages/Expenses/Expenses";
import Sales from "../Pages/Sales/Sales";
import SalesDetails from "../Pages/Sales/salesDetails";
import People from "../Pages/People/People";
import Settings from "../Pages/Settings/Settings";
import Reports from "../Pages/Reports/Reports";


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
            path: "/updateProduct/:id",
            element:<UpdateProduct></UpdateProduct>
          },
          {
            path: "/productDetails/:id",
            element:<ProductDetails></ProductDetails>
          },
          {
            path: "/POS",
            element:<POS></POS>
          },
          {
            path: "/expenses",
            element:<Expenses></Expenses>
          },
          {
            path: "/sales",
            element:<Sales></Sales>
          },
          {
            path: "/salesDetails/:id",
            element: <SalesDetails></SalesDetails>
          },
          {
            path: "/people",
            element: <People></People>
          },
          {
            path: "/settings",
            element: <Settings></Settings>
          },
          {
            path: "/reports",
            element: <Reports></Reports>
          },
        ],
        
      },
      {
        path: "/login",
        element: <Login></Login>
      },
  ]);

  export default router