import React from "react";
import Slider from "react-slick";
import { mergeStyles } from "@fluentui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({
  showNavigation = true,
  infiniteLoop = true,
  toggleInfoAutoPlay = true,
  slideDuration = 3000,
}) => {
  const settings = {
    dots: showNavigation,
    infinite: infiniteLoop,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: toggleInfoAutoPlay,
    autoplaySpeed: slideDuration,
    arrows: false,
    fade: true,
    centerMode: false,
    cssEase: "linear",
    swipeToSlide: true,
  };

  const slideImages = [
    "https://via.placeholder.com/600x400?text=Slide+1",
    "https://via.placeholder.com/600x400?text=Slide+2",
    "https://via.placeholder.com/600x400?text=Slide+3",
  ];

  const containerClass = mergeStyles({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    gap: "20px",
    "@media(max-width: 768px)": {
      flexDirection: "column",
    },
  });

  const leftColumnClass = mergeStyles({
    flex: "1 1 300px",
    maxWidth: "500px",
  });

  const rightColumnClass = mergeStyles({
    flex: "1 1 500px",
    maxWidth: "700px",
  });

  return (
    <div className={containerClass}>
      <div className={leftColumnClass}>
        <h1 className="ms-fontSize-xxl">82% of our patients are happy with their care BH!</h1>
        <p className="ms-fontSize-m">patients are happy</p>
        <a
          href="https://www.google.com/"
          title="Click ME"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bh_6f9be369 btn-outline-white_6f9be369 ms-Button"
        >
          Click ME
        </a>
      </div>
      <div className={rightColumnClass}>
        <Slider {...settings}>
          {slideImages.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%", borderRadius: "12px" }} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
