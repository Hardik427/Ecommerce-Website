import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RatingStars from './../../components/RatingStars';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice';

const Productcards = ({ products, animate }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    if (!animate) {
      // If not animating, show all products
      setVisible(Array(products.length).fill(true));
      return;
    }
    setVisible(Array(products.length).fill(false));
    let timeouts = [];
    for (let i = 0; i < products.length; i++) {
      timeouts.push(setTimeout(() => {
        setVisible(prev => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, 100 + i * 120));
    }
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [products, animate]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
      {
        products.map((product, index) => (
          <div key={index} className={`transition-all duration-700 transform
            ${visible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className='relative'>
              <Link to={`/shop/${product._id}`}>
                <img src={product.image} alt="" className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-500' />
              </Link>
              <div className='hover:block absolute top-1 right-3'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}>
                  <i className='ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark'></i>
                </button>
              </div>
            </div>
            <div className='product__card__content'>
              <h4>{product.name}</h4>
              <p>{product.price} {product.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>
              <RatingStars rating={product.rating} />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Productcards
