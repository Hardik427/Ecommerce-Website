import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/Shop/CartModal";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import { toggleCart } from "../redux/features/cart/uiSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);

  const handleCartToggle = () => {
    dispatch(toggleCart())
  };

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const adminDropDownMenu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Items", path: "/admin/manage-products" },
    { label: "All Orders", path: "/admin/manage-orders" },
    { label: "Add New Post", path: "/admin/add-new-post" },
  ];

  const userDropDownMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/user/orders" },
  ];

  const dropDownMenus = user?.role === "admin" ? adminDropDownMenu : userDropDownMenu;

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        {/* Left Links */}
        <ul className="nav__links flex space-x-6">
          <li className="link"><Link to="/">Home</Link></li>
          <li className="link"><Link to="/shop">Shop</Link></li>
          <li className="link"><Link to="/">Pages</Link></li>
          <li className="link"><Link to={user ? "/contact" : "/"}>Contact</Link></li>
        </ul>

        {/* Logo */}
        <div className="nav__logo text-xl font-bold">
          <Link to="/">Fashion<span className="text-primary">.</span></Link>
        </div>

        {/* Right Icons */}
        <div className="nav__icons relative flex items-center space-x-4">
          {/* Search */}
          <span>
            <Link to="/search" aria-label="Search">
              <i className="ri-search-2-line"></i>
            </Link>
          </span>

          {/* Cart */}
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary relative" aria-label="Cart">
              <i className="ri-shopping-bag-3-line"></i>
              <sup className="text-sm px-1.5 text-white rounded-full bg-primary absolute -top-2 -right-2">
                {products.length}
              </sup>
            </button>
          </span>

          {/* User */}
          <span className="relative">
            {user ? (
              <>
                <img
                  src={user?.profileImage || avatarImg}
                  alt={`${user.name || "User"} profile`}
                  onClick={handleDropDownToggle}
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div
                    ref={dropDownRef}
                    className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <ul className="font-medium space-y-4 p-2">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} className="dropdown-items w-full text-left">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login">
                <i className="ri-user-fill"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
      )}
    </header>
  );
};

export default Navbar;
