import React, { useEffect, useRef, useState } from 'react'
import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = [
    { name: 'Accessories', path: 'accessories', image: category1 },
    { name: 'Dress collection', path: 'dress', image: category2 },
    { name: 'Jewellery', path: 'jewellery', image: category3 },
    { name: 'Cosmetics', path: 'cosmetics', image: category4 },
  ];

  const [visible, setVisible] = useState([false, false, false, false]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          categories.forEach((_, idx) => {
            setTimeout(() => {
              setVisible((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
            }, 200 + idx * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='product__grid' ref={sectionRef}>
      {categories.map((category, idx) => (
        <Link
          key={category.name}
          to={`/categories/${category.path}`}
          className={`categories__card transition-all duration-700 transform
            ${visible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
          style={{ transitionDelay: `${idx * 120}ms` }}
        >
          <img src={category.image} alt={category.name} />
          <h4>{category.name}</h4>
        </Link>
      ))}
    </div>
  )
}

export default Categories
