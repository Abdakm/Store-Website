import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Page404 from './components/page404/404'
import Products from './components/Products'
import Subcategories from './components/Subcategories'
import AllProducts from './components/AllProducts'
import './index.css'
// React-router-dom
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
// Redux
import { store, persistor } from './app/store'
import { Provider } from 'react-redux'

import { StoreProvider } from './hooks/storeContext'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
  {
   path: '/',
   element: <App />,
   errorElement: <Page404 /> 
  },
  {
    path: '/subcategories/:id',
    element: <Subcategories />
  },
  {
    path: '/products/:id',
    element: <Products />
  },
  {
    path: '/products',
    element: <AllProducts />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <StoreProvider>
        <PersistGate loading={'...Loading'} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </StoreProvider>  
    </Provider>
  </StrictMode>,
)