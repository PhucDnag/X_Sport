// App.jsx (cập nhật)
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout mới
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import Terms from './pages/Terms';
import Privacy from "./pages/Privacy";
import Shipping from "./pages/Shipping";
import NotFound from "./pages/NotFound"; // Import NotFound
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/chatBot";

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Routes>
      {/* Nested routes với Layout cho các trang chính */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} /> 
        <Route path="/shipping" element={<Shipping />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <ChatBot/>
    </div>
  );
};

export default App;
