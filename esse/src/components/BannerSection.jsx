import video from "../assets/video.mp4";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BannerSection = () => {
  useGSAP(() => {
    gsap.to("video", {
      y: 20,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video",
        start: "top 60%",
        end: "bottom bottom",
      },
    });
  }, []);

  return (
    <div id="video">
      <video
        className="w-[800px] h-[37vw] max-h-80 object-cover m-auto opacity-0"
        type="video/mp4"
        src={video}
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
};

export default BannerSection;
