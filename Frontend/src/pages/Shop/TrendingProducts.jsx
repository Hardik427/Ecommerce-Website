import React, { useState } from 'react'
import Productcards from './ProductCards';
// import products from '../../data/products.json'
import { useFetchAllProductsQuery } from '../../redux/features/product/productsApi';


const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 4)
  }

  const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: '',
    page: 1,
    limit: 100 
  }); 

  if (isLoading) {
    return (
      <div className='text-center text-2xl font-semibold py-12'>
        <span className="animate-spin mr-2 inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
        Loading...
      </div>
    );
  }
  if (error) {
    return <div className='text-center text-2xl font-semibold'>Something went wrong!</div>
  }

  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader pb-12'>Discover the Hottest picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.</p>

      <Productcards products={products.slice(0, visibleProducts)} />
      <div className='product__btn'>
        {
          visibleProducts < products.length && (
            <button className='btn' onClick={loadMoreProducts}>Load More</button>
          )
        }
      </div>
    </section>
  )
}

export default TrendingProducts
