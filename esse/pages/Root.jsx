import {
  Product,
  FooterBanner,
  HeroBanner,
  BannerSection,
} from "../src/components/import";
import "../src/App.css";
import { useEffect, useState } from "react";
import client, { urlFor } from "../lib/client";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [banner, setBanner] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  let prodSec = document.getElementById("products");
  let handleButton = () => {
    prodSec.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchProduct() {
      const query = '*[_type == "product"]';
      await client.fetch(query).then((data) => setProducts(data));
    }
    fetchProduct();
    async function fetchBanner() {
      const query = '*[_type == "banner"]';
      await client.fetch(query).then((bann) => setBanner(bann));
    }
    fetchBanner();
  }, []);

  useGSAP(() => {
    gsap.to(".products-heading", {
      y: 20,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".products-heading",
        start: "top 60%",
        end: "bottom bottom",
      },
    });
    gsap.to(".testo", {
      y: 20,
      opacity: 1,
      duration: 1.2,
      pin: true,
      ease: "power1.inOut",
      scrollTrigger: { trigger: ".testo" },
    });
  }, []);

  return (
    <>
      {banner && (
        <HeroBanner
          id="hero"
          smallText={banner[1].smallText}
          img={urlFor(banner[1].image)}
          h3={banner[1].midText}
          desc={banner[1].desc}
          largeText1={banner[1].largeText1}
          buttonText={banner[1].buttonText}
          handleButton={handleButton}
        />
      )}

      <div className="products-heading">
        <div className="flex justify-center">
          <span className="bg-slate-600 min-w-20 mt-14 mx-10 flex h-[1px]"></span>
          <div id="products">
            <h2>Dai un occhiata</h2>
            <p>alle nostre migliori candele </p>
          </div>
          <span className="bg-slate-600 min-w-20 mt-14 mx-10 flex h-[1px]"></span>
        </div>
        <div className="products-container">
          {products &&
            products.map((product) => (
              <div key={product._id}>
                <Link to={`/shop/${product.slug.current}`}>
                  <Product
                    image={urlFor(product.image[0] && product.image[0])
                      .width(300)
                      .height(300)}
                    price={product.price}
                    name={product.name}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
      {banner && (
        <div className="relative">
          <BannerSection />
        </div>
      )}
      <div className="testo opacity-0 mx-auto mt-20 z-[100000] max-h-[488px]">
        <TypeAnimation
          sequence={[
            "Produciamo candele di qualità",
            1500,
            "Produciamo candele colate a mano",
            1500,
            "Produciamo candele di soia naturale",
            1500,
            "Produciamo candele con amore",
            1500,
          ]}
          wrapper="span"
          speed={40}
          style={{
            fontSize: "20px",
            display: "inline-block",
            color: "gray-900",
            fontWeight: "300",
            width: "410px",
            textAlign: "left",
            letterSpacing: "1.2px",
          }}
          repeat={Infinity}
        />
      </div>
      {banner && (
        <Link to="/saldi">
          <FooterBanner
            className="footerBanner opacity-0"
            discount={banner[0].discount}
            largeText1={banner[0].largeText1}
            largeText2={banner[0].largeText2}
            saleTime={banner[0].saleTime}
            smallText={banner[0].smallText}
            midText={banner[0].midText}
            product={banner[0].product}
            buttonText={banner[0].buttonText}
            desc={banner[0].desc}
            image={urlFor(banner[0].image).fit("crop").width(200).height(230)}
            handleButton={handleButton}
          />
        </Link>
      )}
    </>
  );
}

export default App;
