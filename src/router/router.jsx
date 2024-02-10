import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashBoard from "../Pages/DashBoard/DashBoard";


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
        ],
      },
  ]);

  export default router