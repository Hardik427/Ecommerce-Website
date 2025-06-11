import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bannerimg from '../../assets/header.png';

const Banner = () => {
  const [showContent, setShowContent] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setShowContent(true), 200);
          setTimeout(() => setShowImage(true), 600);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section__container header__container" ref={sectionRef}>
      <div
        className={`header__content z-30 transition-all duration-700 ${
          showContent
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-16'
        }`}
      >
        <h4>UP TO 20% DISCOUNT ON</h4>
        <h1>Girls Fashion</h1>
        <p>
          Discover the latest trends and express your unique style with our Women's Fashion website. Explore a curated collection of clothing, accessories, and footwear that caters to every taste and occasion.
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div
        className={`header__image transition-all duration-700 ${
          showImage
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-16'
        }`}
      >
        <img src={Bannerimg} alt="Banner Image" />
      </div>
    </div>
  );
};

export default Banner;
