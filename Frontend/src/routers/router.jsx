import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Home/Homepage";
import CategoryPage from "../pages/Category/CategoryPage";
import Search from "../pages/Search/Search";
import ShopPage from "../pages/Shop/ShopPage";
import SingleProduct from "../pages/Shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import Contact from "../pages/Contact/Contact";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import PlaceOrder from "../pages/Orders/PlaceOrder";
import ManageProducts from "../pages/Products/ManageProducts";
import AddProducts from './../pages/Products/AddProducts';
import EditProduct from "../pages/Products/EditProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Homepage /> },
            { path: "/categories/:categoryName", element: <CategoryPage /> },
            { path: "/search", element: <Search /> },
            { path: "/shop", element: <ShopPage /> },
            { path: "/shop/:id", element: <SingleProduct /> },
            { path: "/contact", element: <Contact/> },
            { path: "/admin/dashboard", element:<AdminDashboard/>},
            { path: "/place-order", element: <PlaceOrder /> },
            { path: "/admin/manage-products", element: <ManageProducts />},
            { path: "/admin/add-product", element: <AddProducts />},
            { path: "/admin/edit-product/:id", element: <EditProduct />}
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    
]);

export default router;