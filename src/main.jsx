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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AuthProvider from './Provider/AuthProvider';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
     <AuthProvider>
     <ActiveNavProvider>
    <GlobalVariableProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>

    </GlobalVariableProvider>
    </ActiveNavProvider>
     </AuthProvider>
     </HelmetProvider>
  </React.StrictMode>,
)
