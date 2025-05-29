import React from "react";
import "./index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderData = [
  {
    heading: "First Slide",
    paragraph: "This is the first slide description.",
    buttonText: "Learn More",
    imageUrl:
      "https://cdn.hubblecontent.osi.office.net/m365content/publish/00b3ca70-09e6-4c0f-9166-e6be56465d9d/1216812369.jpg",
  },
  {
    heading: "Second Slide",
    paragraph: "Second slide content goes here.",
    buttonText: "Discover",
    imageUrl: "https://picsum.photos/800/268?random=2",
  },
  {
    heading: "Third Slide",
    paragraph: "Third slide dynamic content.",
    buttonText: "Get Started",
    imageUrl: "https://picsum.photos/800/268?random=3",
  },
];

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="Container">
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div key={index}>
            <div className="left-box">
              <h1>{item.heading}</h1>
              <p>{item.paragraph}</p>
              <a href="#">{item.buttonText}</a>
            </div>
            <div className="right-box">
              <img
                src={item.imageUrl}
                alt={`Slide ${index + 1}`}
                className="responsive-img"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
