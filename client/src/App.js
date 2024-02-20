import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './user/Login';
import Register from './user/Register';
import Home from './pages/Home';
import UserRoutes from './user/UserRoutes';
import AdminRoutes from './admin/AdminRoutes';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import Profile from './user/Profile';
import CreateProducts from './admin/CreateProducts';
import Products from './admin/Products';
import Orders from './admin/Orders';
import AllUsers from './admin/AllUsers';
import ProductDetails from './pages/ProductDetails';
import SearchPage from './pages/SearchPage';
import UpdateProduct from './pages/UpdateProduct';
import SimiliarProducts from './components/SimiliarProducts';
import About from './pages/About';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/PageNotFound';
import OrderPage from './pages/OrderPage';
import Contact from './pages/Contact';
import CategoryProducts from './pages/CategoryProducts';
import SuccessPage from './pages/Success';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/more" element={<SimiliarProducts />} />
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="category-products/:catID" element={<CategoryProducts />} />
        <Route path="/product/details/:productID" element={<ProductDetails />} />
        
        <Route path="/dashboard" element={<UserRoutes />}>
          <Route path='user' element={<UserDashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/order' element={<OrderPage />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProducts />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/orders' element={<Orders />} />
          <Route path='admin/all-users' element={<AllUsers />} />
          <Route path="product/update/:prodID" element={<UpdateProduct />} />
          <Route path='order' element={<OrderPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
