import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ProductSearchPage from '../pages/ProductSearchPage.jsx';
import Cart from '../pages/Cart.jsx';
import Profile from '../components/Profile.jsx';
import Dashboard from '../layouts/Dashboard.jsx';
import Men from '../pages/Men.jsx';
import Women from '../pages/Women.jsx';
import Kids from '../pages/Kids.jsx';
import { CartProvider } from '../Context/CartContext.jsx';
import TopWear from '../pages/Men/TopWear.jsx';
import BottomWear from '../pages/Men/BottomWear.jsx';
import Accessories from '../pages/Men/Accessories.jsx';
import All from '../pages/Men/All.jsx';
import WomenTopWear from '../pages/Women/WomenTopWear.jsx';
import WomenBottomWear from '../pages/Women/WomenBottomWear.jsx';
import WomenAccessories from '../pages/Women/WomenAccessories.jsx';
import WomenAll from '../pages/Women/WomenAll.jsx';
import Checkout from '../components/Checkout.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/search', element: <ProductSearchPage /> },
      { path: '/cart', element: <Cart /> },
      {path:'/checkout',element:<Checkout/>},
      
      // Men's section with nested routes
      {
        path: '/Men',
        element: <Men />,  // This component needs <Outlet/> for children
        children: [
          {
            path: 'All',  
            element: <All />
          },
          {
            path: 'TopWear',  
            element: <TopWear />
          },
          {
            path: 'BottomWear',  
            element: <BottomWear />
          },
          {
            path: 'Accessories',  
            element: <Accessories />
          },
          
        ]
      },
     {
      path: '/Women',
      element: <Women />,  // This component needs <Outlet/> for children
      children: [
        {
          path: 'All',  
          element: <WomenAll />
        },
        {
          path: 'TopWear',  
          element: <WomenTopWear />
        },
        {
          path: 'BottomWear',  
          element: <WomenBottomWear />
        },
        {
          path: 'Accessories',  
          element: <WomenAccessories />
        },
        
      ]
     },
      
      
      {
        path: '/Dashboard',
        element: <Dashboard />,
        children: [
          { path: 'profile', element: <Profile /> },
        ]
      }
    ],
  },
]);

export default router;