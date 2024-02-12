import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import ActiveNavProvider from './Provider/ActiveNavProvider';
import GlobalVariableProvider from './Provider/GlobalVariableProvider';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActiveNavProvider>
    <GlobalVariableProvider>
    <RouterProvider router={router} />
    </GlobalVariableProvider>
    </ActiveNavProvider>
  </React.StrictMode>,
)
