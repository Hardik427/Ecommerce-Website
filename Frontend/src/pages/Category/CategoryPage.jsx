import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import Productcards from '../Shop/ProductCards';

const CategoryPage = () => {
  const {categoryName} = useParams();
  const [filteredProducts,setFilteredProducts] = useState([]);
  useEffect(()=>{
    const filtered = products.filter((product)=> product.category === categoryName.toLowerCase());
    setFilteredProducts(filtered);
  },[categoryName])
  return (
    <>
    <section className='section__container bg-primary-light'>
            <h2 className='section__header'>{categoryName}</h2>
            <p className='section__subheader'>Browse a diverse range of Categories, from chic dresses to versatile accessories.Elivate your style today!</p>
    </section>
    <div className='section__container'>
      <Productcards products={filteredProducts}/>
    </div>
    </>
  )
}

export default CategoryPage
