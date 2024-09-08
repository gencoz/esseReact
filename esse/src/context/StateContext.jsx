import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { auth } from "../config/firebase";

const Context = createContext();

export const StateContext = ({ children }) => {
  const cartItemsLocalStorage = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const totalQuantitiesLocalStorage = JSON.parse(
    localStorage.getItem("totalQuantities" || 0)
  );
  const totalPriceLocalStorage = JSON.parse(
    localStorage.getItem("totalPrice" || 0)
  );

  const [isLogged, setIsLogged] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(cartItemsLocalStorage);
  const [totalPrice, setTotalPrice] = useState(totalPriceLocalStorage);
  const [totalQuantities, setTotalQuantities] = useState(
    totalQuantitiesLocalStorage || 0
  );
  const [qty, setQty] = useState(1);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems]);

  setTimeout(() => {
    if (auth.currentUser !== null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, 1000);

  let foundProduct;
  let newCartItems;

  const onAdd = (details, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === details._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + details.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === details._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        else return { ...cartProduct };
      });
      setCartItems(updatedCartItems);
      console.log(cartItems);
    } else {
      details.quantity = quantity;
      setCartItems([...cartItems, { ...details }]);
    }
    toast.success(`${qty} ${details.name} aggiunto al carrello`);
  };

  const onRemove = (details) => {
    foundProduct = cartItems.find((item) => item._id === details._id);
    newCartItems = cartItems.filter((item) => item._id !== details._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems(
        [
          ...newCartItems,
          {
            ...foundProduct,
            quantity: foundProduct.quantity + 1,
          },
        ].sort()
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems(
          [
            ...newCartItems,
            {
              ...foundProduct,
              quantity: foundProduct.quantity - 1,
            },
          ].sort()
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
