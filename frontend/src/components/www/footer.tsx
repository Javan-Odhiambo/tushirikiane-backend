import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full py-10 flex items-center justify-center bg-gradient-to-b from-white to-blue-200">
      <div className="flex items-center gap-4">
        <div className="relative md:w-16 md:h-16 w-12 h-12">
          <Image 
            src="/footer-logo.svg" 
            alt="Tushirikiane logo" 
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-blue-400 uppercase leading-10 tracking-wider">
          TUSHIRIKIANE
        </h2>
      </div>
    </div>
  );
};

export default Footer;