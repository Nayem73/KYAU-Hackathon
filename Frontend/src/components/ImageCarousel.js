import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  {
    imageUrl:
      "https://www.forbesindia.com/fbimages/900x600/proportional/jpeg/blog/wp-content/uploads/2018/10/BG_shutterstock_1020638500.jpg",
  },
  {
    imageUrl:
      "http://tempiettohomes.com/wp-content/uploads/2015/11/smart-villages.jpg",
  },
  {
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffuturethinkers.org%2Fwp-content%2Fuploads%2F2020%2F09%2Ffuture-thinkers-smart-village.jpg&f=1&nofb=1&ipt=c23d81e56c01aef6c19d3484ce7bcade35af550434d5d2698b4ff5f3e267c1fb&ipo=images",
  },
  {
    imageUrl: "https://i.ytimg.com/vi/1lFYCiRbCYw/maxresdefault.jpg",
  },
  {
    imageUrl:
      "https://www.termcoord.eu/wp-content/uploads/2021/05/Smart-Villages-strategy-IATE-Term.png",
  },
];

function ImageCarousel() {
  const carouselContainerStyle = {
    height: "400px",
    overflow: "hidden",
    // Hide overflow if images are larger
  };

  return (
    <div style={carouselContainerStyle}>
      <Carousel showArrows={true} infiniteLoop={true}>
        {images.map((item, index) => (
          <div key={index}>
            <img
              src={item.imageUrl}
              alt={`Image ${index}`}
              className="object-cover object-center"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
