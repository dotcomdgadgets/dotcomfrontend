import React from "react";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import phones from "../assets/categories/phones.jpg"
import buds from "../assets/categories/buds.jpg"
import gadgets from "../assets/categories/gadgets.avif"
import headphone from "../assets/categories/headphone.jpg"
import soundbox from "../assets/categories/soundbox.jpg"
import watch from "../assets/categories/watch.jpg"
import covers from "../assets/categories/covers.avif"
import laptop from "../assets/categories/laptop.jpg"
import { Truck, Star, Headset, RefreshCcw } from "lucide-react";

export default function ProductCategories() {
  const navigate = useNavigate();
  const categories = [
    {
      label: "Mobile",
      img: phones,
      category: "mobiles",
    },
    {
      label: "Smart-watches",
      img: watch,
      category: "watches",
    },
    {
      label: "Ear-buds",
      img: buds,
      category: "earbuds",
    },
    {
      label: "Head-phone",
      img: headphone,
      category: "head-phones",
    },
    {
      label: "Gadgets",
      img: gadgets,
      category: "gadgets",
    },
    {
      label: "Sound-Box",
      img: soundbox,
      category: "sound-boxes",
    },

    {
      label: "phone-covers",
      img: covers,
      category: "covers",
    },
    {
      label: "Laptop",
      img: laptop,
      category: "laptop",
    },
  ];

  return (
    <div className=" mx-auto p-4">
      {/* Category cards – always in one row */}
      <div className="mt-5 category-scroll">
        <div className="flex gap-4 min-w-max">
          {categories.map((c, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden bg-white shadow 
                   hover:scale-105 transition w-32 sm:w-36 md:w-40 flex-shrink-0
                   cursor-pointer"
              onClick={() => navigate(`/products/${c.category}`)}
            >
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-28 sm:h-32 md:h-36 object-cover"
              />
            </div>
          ))}
        </div>
      </div>



      {/* Carousel Section with fullscreen trigger */}
      <section className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="mt-4">
          <Carousel />
        </div>
      </section>

      {/* FEATURES ROW */}

      <section className="py-5 max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-6 text-center">
          {[
            {
              title: "Fast Delivery",
              desc: "Quick & safe shipping",
              icon: Truck,
              path: "/shipping-delivery-policy",
            },
            {
              title: "Premium Quality",
              desc: "Top-rated gadgets",
              icon: Star,
              path: "/",
            },
            {
              title: "Tech Support",
              desc: "expert help",
              icon: Headset,
              path: "/contact-us",
            },
            {
              title: "Easy Returns",
              desc: "Hassle-free returns",
              icon: RefreshCcw,
              path: "/cancellation-refund-policy",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2 p-0 rounded-xl hover:bg-gray-50 transition"  >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>

                <h3 className="font-medium text-gray-800 text-[11px] md:text-xs leading-tight">
                {item.title}
              </h3>
              </div>
            );
          })}
        </div>
      </section>


      {/* Marquee Banner */}
      <div className="mt-3 bg-indigo-700 rounded p-2 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee py-1 text-white text-sm">
          <span className="mr-8">Flat 400 off on 9999. Code: DOTCOM4U</span>
          <span className="mr-8">Flat 200 off on 1999. Code: DOTCOM4U</span>
          <span className="mr-8">Free Shipping over 1999 Orders!</span>
        </div>
      </div>


      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 12s linear infinite;
        }
      `}</style>

    </div>
  );
}



