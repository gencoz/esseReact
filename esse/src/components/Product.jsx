import "../App.css";

const Product = ({ image, name, slug, price }) => {
  return (
    <div>
      <div key={slug} className="product-card m-5">
        <div className="box shadow-sm">
          <img src={image} className="product-image" />
        </div>
        <h1 className="product-name">{name}</h1>
        <h3 className="font-bold text-2xl text-slate-500">€{price}</h3>
      </div>
    </div>
  );
};

export default Product;
