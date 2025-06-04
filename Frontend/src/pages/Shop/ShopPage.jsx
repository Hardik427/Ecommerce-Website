import React, { useEffect, useState } from 'react'
import productsData from '../../data/products.json'
import Productcards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/product/ProductsApi';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100 ', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity },
    ]
}

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    const {data,error ,isLoading} = useFetchAllProductsQuery({
        category: category !== 'all' ? category : undefined,
        color: color !== 'all' ? color : undefined,
        minPrice: isNaN(minPrice) ? undefined : minPrice,
        maxPrice: isNaN(maxPrice) ? undefined : maxPrice,
        page: currentPage,
        limit: productsPerPage
    });

    // Some Error is occurring in the API call, so will solve it tomorrow
    console.log(data)
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        })
    }
console.log(error)
    if (isLoading) return <div className='text-center text-2xl font-semibold'>Loading...</div>
    if (error) return <div className='text-center text-2xl font-semibold'>Something went wrong!</div>

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header'>Shop Page</h2>
                <p className='section__subheader'>Browse a diverse range of Categories, from chic dresses to versatile accessories.Elivate your style today!</p>
            </section>
            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8 '>
                    <ShopFiltering filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters} />

                    <div>
                        <h3 className='text-xl font-medium mb-4 '>Products Available : {products.length}</h3>
                        <Productcards products={products} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
