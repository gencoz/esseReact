import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroBanner = ({
  smallText,
  img,
  desc,
  h3,
  largeText1,
  buttonText,
  handleButton,
}) => {
  useGSAP(() => {
    gsap.from(".hero-banner-container", {
      y: -500,
      ease: "power1.out",
      duration: 0.6,
      opacity: 0,
    });
  });
  return (
    <div className="hero-banner-container shadow-md">
      <div>
        <p className="beats-solo">{desc}</p>
        <h3>{h3}</h3>
        <h1>{largeText1}</h1>
        <img src={img} alt="TIN" className="hero-banner-image rounded-md" />
      </div>

      <div>
        <button
          id="banner-button"
          onClick={handleButton}
          type="button"
          className="button"
        >
          {buttonText}
        </button>

        <div className="desc">
          <h5></h5> <p>{smallText}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
