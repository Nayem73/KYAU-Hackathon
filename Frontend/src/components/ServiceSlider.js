import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper/bundle";

import "swiper/swiper-bundle.css";

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
const ServiceSlider = () => {
  useEffect(() => {
    // Initialize Swiper when the component mounts
    new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <div className="relative">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <div className="swiper-slide">
            <div className="bg-blue-500 p-4 rounded-lg">
              <img src="/service1.jpg" alt="Service 1" className="mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                AI Firmming
              </h3>
              <p className="text-white">
                Description of Service 1. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
              <a
                href="/service1"
                className="mt-4 block text-white hover:underline"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide">
            <div className="bg-green-500 p-4 rounded-lg">
              <img src="/service2.jpg" alt="Service 2" className="mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Sell Or Buy Product
              </h3>
              <p className="text-white">
                Description of Sell Or Buy Product. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
              <Link
                to="/service2"
                className="mt-4 block text-white hover:underline"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Add more slides for your services */}
        </div>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

export default ServiceSlider;
