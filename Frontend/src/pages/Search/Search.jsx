import React, { useState } from 'react'
import productsData from '../../data/products.json'
import Productcards from './../Shop/ProductCards';

const Search = () => {
    const [searchQuery,setSearchQuery] = useState('');
    const [filteredProducts,setFilteredProducts] = useState(productsData);

    const handleSearch = () =>
    {
        const query = searchQuery.toLowerCase();

        const filtered = productsData.filter(products => products.name.toLowerCase().includes(query) || products.description.toLowerCase().includes(query));

        setFilteredProducts(filtered);
    }
  return (
    <>
    <section className='section__container bg-primary-light'>
            <h2 className='section__header'>Search Products</h2>
            <p className='section__subheader'>Browse a diverse range of Categories, from chic dresses to versatile accessories.Elivate your style today!</p>
    </section>
    <section className='section__container'>
    <div className='w-full mb-12  flex flex-col md:flex-row items-center justify-center gap-4 '>
        <input type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-bar w-full max-w-4xl p-2 border rounded'
        placeholder='Search For Products...'/>

        <button className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
        onClick={handleSearch}>Search</button>
    </div>

    </section>
  
   <div className='section__container'>
      <Productcards products={filteredProducts}/>
    </div>
    </>
  )
}

export default Search
