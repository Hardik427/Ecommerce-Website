import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Home/Homepage";
import CategoryPage from "../pages/Category/CategoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/",element: <Homepage/>},
            {path:"/categories/:categoryName", element:<CategoryPage/>}
        ]
    },
]);

export default router;