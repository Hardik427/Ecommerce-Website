import React from 'react'
import {Link, useParams} from 'react-router-dom'
import RatingStars from './../../../components/RatingStars';
import { useFetchProductByIdQuery } from '../../../redux/features/product/ProductsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
const SingleProduct = () => {
    const {id} = useParams();
    const {data, error, isLoading} = useFetchProductByIdQuery(id);
    const dispatch = useDispatch();
    if(isLoading) {
        return (
            <div className='text-center text-2xl font-semibold py-12'>
                <span className="animate-spin mr-2 inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                Loading...
            </div>
        );
    }
    // console.log(singleProduct);
    if (error) return <div className='text-center text-2xl font-semibold'>Something went wrong!</div>
    
    const singleProduct = data?.product || {};
    const reviews = data?.reviews || [];
    // console.log(singleProduct, reviews);
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
  return (
    <>
    <section className='section__container bg-primary-light'>
            <h2 className='section__header'>Single Product Page</h2>
            <div className='section__subheader space-x-2 '>
                <span className=' hover:text-primary'><Link to="/">home</Link></span>
                <i className='ri-arrow-right-s-line'></i>
                <span className=' hover:text-primary'><Link to="/shop">shop</Link></span>
                <i className='ri-arrow-right-s-line'></i>
                <span className=' hover:text-primary'><Link to="/">{singleProduct.name}</Link></span>
            </div>
    </section>

    <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
        {/*product image*/}
        <div className='md:w-1/2 w-full'>
           <img 
           src={`${singleProduct.image}`}
            alt="" 
           className='rounded-md w-full h-auto'/>
        </div>

        <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>{singleProduct.name}</h3>
            <p className='text-xl text-primary mb-4' >${singleProduct.price} <s>${singleProduct.oldPrice}</s></p>
            <p className='text-gray-700 mb-4'>{singleProduct.description} </p>
                <div>
                    <p><strong>Category :</strong> {singleProduct.category}</p>
                    <p><strong>Color : </strong>{singleProduct.color}</p>
                    <div className='flex gap-1'>
                        <strong>Rating :</strong>
                        <RatingStars rating={singleProduct.rating}/>
                    </div>
                </div>

                <button className='mt-6 px-6 py-3 bg-primary text-white rounded-md'
                onClick={(e)=> {
                    e.stopPropagation();
                    handleAddToCart(singleProduct);
                }}
                >
                    Add to Cart
                </button>
        </div>
        </div>
    </section>

    <section className='section__container mt-8'>
        {/* Reviews */}
        <h3 className='text-2xl font-semibold mb-4'>Customer Reviews</h3>
        <div className='space-y-4'>
            {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className='border p-4 rounded-md'>
                        <div className='flex items-center gap-2 mb-2'>
                            <span className='font-semibold'>{review.userName}</span>
                            <RatingStars rating={review.rating} />
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className='text-gray-500'>No reviews yet.</p>
            )}
        </div>
    </section>
    </>
  ) 
}

export default SingleProduct
