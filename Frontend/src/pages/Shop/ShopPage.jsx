import React, { useEffect, useState } from 'react'
// import productsData from '../../data/products.json'
import Productcards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/product/productsApi';

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

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : undefined,
        color: color !== 'all' ? color : undefined,
        minPrice: isNaN(minPrice) ? undefined : minPrice,
        maxPrice: isNaN(maxPrice) ? undefined : maxPrice,
        page: currentPage,
        limit: productsPerPage
    });

    // Some Error is occurring in the API call, so will solve it tomorrow
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        })
    }
    if(isLoading) {
        return (
            <div className='text-center text-2xl font-semibold py-12'>
                <span className="animate-spin mr-2 inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                Loading...
            </div>
        );
    }

    if (error) return <div className='text-center text-2xl font-semibold'>Something went wrong!</div>

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;



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
                        <h3 className='text-xl font-medium mb-4 '>
                            Showing {startProduct} - {endProduct} of {totalProducts} Products
                        </h3>
                        <Productcards products={products} />

                        {/* // pagination */}
                        <div className='mt-6 flex justify-center'>
                            <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >Previous</button>
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 ${currentPage === index + 1 ?
                                            "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"} rounded-md mx-2`}
                                        onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}</button>
                                ))

                            }
                            <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'
                                disabled={currentPage === totalPages || totalProducts === 0}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            >Next</button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
