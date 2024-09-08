import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { IoFlameSharp } from "react-icons/io5";
import "../App.css";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";
import { auth } from "../config/firebase";
import { useEffect } from "react";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, isLogged, setIsLogged } =
    useStateContext();

  useEffect(() => {
    if (auth.currentUser !== null) {
      setIsLogged(true);
    }
  }, [isLogged]);

  return (
    <div>
      <nav className="navbar-container shadow-lg z-[100000]">
        <NavLink to={isLogged == true ? "/dashboard" : "/login"}>
          <div className="flex ml-5">
            {isLogged ? (
              <IoFlameSharp className="fill-red-50" size={25} />
            ) : (
              <FontAwesomeIcon icon={faUser} size={"xl"} />
            )}
            {isLogged && (
              <p className="hidden text-xs justify-base absolute left-14 max-w-20 sm:flex">
                {auth?.currentUser?.email}
              </p>
            )}
          </div>
        </NavLink>

        <NavLink to="/">
          <img src={logo} className="w-24 p-2 mb-1 " alt="" />
        </NavLink>

        <button
          onClick={() => setShowCart(true)}
          className="cart-icon items-center mt-5 mr-6 w-18 h-18"
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </nav>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
