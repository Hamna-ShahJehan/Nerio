"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="nerio-preloader">
        <div className="loader-container">
          <div className="loader-icon">
            <Image
              src="/assets/images/preloader.png"
              alt="Sports News"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`nerio-preloader ${hidden ? "hidden" : ""}`}>
      <div className="loader-container">
        <div className="loader-icon">
          <Image
            src="/assets/images/preloader.png"
            alt="Sports News"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}
