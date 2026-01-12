import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gadgets from "../assets/carousel/gadgets.jpg";
import smartwatch from "../assets/carousel/smartwatch.jpg";

const images = [
  gadgets,
  "https://www.mobilityindia.com/wp-content/uploads/2019/05/special-story-apr.jpg",
  smartwatch,
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* 🔥 BREAK OUT OF CONTAINER */
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="relative h-[220px] md:h-[380px] overflow-hidden bg-black ml-6 mr-6">

        {/* SLIDES */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-lg p-2 rounded-full hover:scale-105 transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-lg p-2 rounded-full hover:scale-105 transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 w-2 rounded-full transition ${
                current === idx ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
