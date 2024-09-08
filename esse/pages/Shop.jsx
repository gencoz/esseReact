import { Product } from "../src/components/import";
import "../src/App.css";
import { useEffect, useState } from "react";
import client, { urlFor } from "../lib/client";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    async function fetchProduct() {
      const query = '*[_type == "product"]';
      await client.fetch(query).then((data) => setProducts(data));
    }
    fetchProduct();
  }, []);

  return (
    <>
      <div className="products-heading">
        <div className="flex justify-center">
          <span className="bg-slate-600 min-w-20 mt-14 mx-10 flex h-[1px]"></span>
          <div>
            <h2>SHOP</h2>
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
    </>
  );
}

export default Shop;
