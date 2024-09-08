import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../lib/client";
import { urlFor } from "../lib/client";
import { useStateContext } from "../src/context/StateContext";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

const ProductDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState();
  const [images, setImages] = useState();
  const { decQty, incQty, setQty, qty, onAdd } = useStateContext();

  const checkout = async () => {
    await fetch("http://localhost:4000/buynow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [details] }),
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

  useEffect(() => {
    setQty(1);
  }, []);

  useEffect(() => {
    async function fetchDetails() {
      const query = `*[_type == "product" && slug.current == "${params.slug}"]`;
      await client.fetch(query).then((data) => setDetails(data[0]));
    }
    fetchDetails();
    async function fetchProduct() {
      const query = `*[_type == "product" && slug.current == "${params.slug}"]{image}`;
      await client.fetch(query).then((data) => setImages(data[0].image));
    }
    fetchProduct();
  }, [params]);
  let primaryImage = document.getElementById("primaryImage");
  function swapImage(e) {
    primaryImage.src = e.target.src;
  }

  return (
    <>
      {details && (
        <>
          <div
            className="flex flex-col sm:flex-row justify-around"
            key={details.slug}
          >
            <div className="img-container flex flex-col justify-center mx-8">
              <img
                id="primaryImage"
                src={urlFor(details && details.image[0])
                  .width(400)
                  .height(400)}
                className="min-w-36 max-h-80 max-w-80 my-10 mx-auto rounded-lg flex"
              />
              <div className="flex mx-auto gap-5 max-w-80">
                {images &&
                  images.map((item) => (
                    <img
                      onClick={swapImage}
                      className="rounded-md shadow-md cursor-pointer w-16 h-16"
                      key={item._key}
                      src={urlFor(item).width(400).height(400)}
                      alt="candle-image"
                    />
                  ))}
              </div>
            </div>
            <div className="mx-10">
              <p className="text-4xl font-bold mt-10">{details.name}</p>
              div.stelle
              <p className="text-3xl font-bold text-primary m-6 tracking-wide">
                € {details.price}
              </p>
              <h2 className="text-xl font-semibold">Descrizione</h2>
              <p className="text-lg mx-auto my-5 text-center max-w-80">
                {details.details}
              </p>
              <div className="wrap flex justify-between w-40 m-auto mt-10">
                <button>
                  <IoIosRemoveCircleOutline
                    onClick={decQty}
                    className="w-10 h-10 cursor-pointer"
                  />
                </button>
                <h2 className=" w-6 text-3xl">{qty}</h2>
                <button>
                  <IoIosAddCircleOutline
                    onClick={incQty}
                    className="w-10 h-10 cursor-pointer"
                  />
                </button>
              </div>
              <div className="mt-9 ">
                <button
                  onClick={() => onAdd(details, qty)}
                  className="rounded-sm mx-4 p-2 border-2 font-semibold text-primary border-primary min-w-[160px]"
                >
                  Aggiungi al Carrello
                </button>
                <button
                  onClick={checkout}
                  className="rounded-sm m-4 p-2 border-2 text-slate-100 font-semibold bg-primary border-primary"
                >
                  Acquista Ora
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="text-4xl text-center m-10">
        <h1>RECENSIONI</h1>
      </div>
    </>
  );
};

export default ProductDetails;
