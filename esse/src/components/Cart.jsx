import { useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading w-full border-2 border-gray-950 mb-5 shadow-md"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Il tuo Carrello</span>
          <span className="cart-num-items text-primary font-semibold">
            (Prodotti: {totalQuantities})
          </span>
        </button>
        {cartItems > 1 && (
          <div className="empty-cart">
            <AiOutlineShopping className="m-auto mb-8" size={150} />
            <h3>Il carrello è vuoto</h3>
            <Link to="/">
              <button
                className="p-5 m-10 bg-primary text-2xl font-semibold rounded-full"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Torna a fare Shopping
              </button>
            </Link>
          </div>
        )}
        {cartItems &&
          cartItems
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((item) => (
              <div key={item._key}>
                <div className="shadow-xl flex justify-between align-middle border-bottom-2 border-secondary my-3 py-3">
                  <img
                    className="rounded-md shadow-md cursor-pointer m-auto w-28 h-24"
                    src={urlFor(item?.image[0].asset._ref)
                      .fit("clip")
                      .width(200)
                      .height(200)}
                    alt="immagineProdottoCarrello"
                  />
                  <div className="m-12">
                    <h2 className="text-xl">{item.name}</h2>
                    <p>€{item.price}</p>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <div className="wrap flex justify-between w-32 m-auto mt-4">
                        <button>
                          <IoIosRemoveCircleOutline
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "dec")
                            }
                            className="w-10 h-10 cursor-pointer"
                          />
                        </button>
                        <h2 className=" w-6 text-3xl">{item.quantity}</h2>
                        <button>
                          <IoIosAddCircleOutline
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "inc")
                            }
                            className="w-10 h-10 cursor-pointer"
                          />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="remove-item mt-3"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline size={40} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {console.log(cartItems)}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total ">
              <h2 className="mx-8">Totale:</h2>
              <h2 className="mx-8">€{totalPrice}</h2>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={checkout}>
                Paga Ora
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
