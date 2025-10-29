import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './Components/Signup.tsx'
import Login from './Components/Login.tsx'
import ProductDetails from './Components/ProductDetails.tsx'
import Home from './Components/Home.tsx'
import SearchProducts from './Components/SearchProducts.tsx'
import Cart from './Components/Cart.tsx'

const appRouter = createBrowserRouter([
   {
    path: "/",
    element: <App />,
    children: [
      {
         path: "/",
         element: <Home/>,
      },
      {
      path: "product/:id",
      element: <ProductDetails/>
      },
      {
         path: '/search-products',
         element: <SearchProducts/>
      },
      {
         path: '/cart',
         element: <Cart/>
      }
    ]
   },
   {
    path: "sign-up",
    element: <Signup/>
   },
   {
    path: "log-in",
    element: <Login/>
   },
    // errorElement: <NotFound />
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={appRouter} />
  </StrictMode>,
)
