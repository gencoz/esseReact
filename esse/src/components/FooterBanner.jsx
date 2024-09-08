import { urlFor } from "../../lib/client";
import { Link } from "react-router-dom";

const FooterBanner = ({
  discount,
  largeText1,
  largeText2,
  saleTime,
  smallText,
  midText,
  product,
  buttonText,
  image,
  desc,
  handleButton,
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <div className="hidden right lg:block">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`product/${product}`}>
            <button onClick={handleButton} type="button">
              {buttonText}
            </button>
          </Link>
        </div>
        <img src={image} alt="footer-banner" />
      </div>
    </div>
  );
};

export default FooterBanner;
