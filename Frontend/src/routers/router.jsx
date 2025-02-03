import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Home/Homepage";
import CategoryPage from "../pages/Category/CategoryPage";
import Search from "../pages/Search/Search";
import ShopPage from "../pages/Shop/ShopPage";
import SingleProduct from "../pages/Shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/",element: <Homepage/>},
            {path:"/categories/:categoryName", element:<CategoryPage/>},
            {path:"/search", element:<Search/>},
            {path:"/shop", element:<ShopPage/>},
            {path:"/shop/:id" , element:<SingleProduct/>}
        ]
    },
    {
        path: "/login",
        element : <Login/>
    },
    {
        path: "/register",
        element : <Register/>
    }
]);

export default router;