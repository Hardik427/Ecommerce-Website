import React, { useEffect, useRef, useState } from 'react'
import dealsImg from '../../assets/deals.png'

const DealsSection = () => {
  const [showContent, setShowContent] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setShowContent(true), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className='section__container deals__container' ref={sectionRef}>
      <div className={`deals__image transition-all duration-[1800ms] ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
        <img src={dealsImg} alt="" />
      </div>
      <div className={`deals__content transition-all duration-[1800ms] ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of The Month</h4>
        <p>
          Our Women's Fashion Deals of the Month are here to make your style dreams a reality without breaking the bank. Discover a curated collection of exquisite clothing, accessories, and footwear, all handpicked to elevate your wardrobe
        </p>
        <div className='deals__countdown flex-wrap'>
          <div className='deals__countdown__card'>
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsSection
