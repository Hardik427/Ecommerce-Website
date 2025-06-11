import React, { useEffect, useRef, useState } from 'react'
import card1 from '../../assets/card-1.png'
import card2 from '../../assets/card-2.png'
import card3 from '../../assets/card-3.png'

const cards = [
    {
        id: 1,
        image: card1,
        trend: "2024 Trend",
        title: "Women's Shirt"
    },
    {
        id: 2,
        image: card2,
        trend: "2024 Trend",
        title: "Women's Dresses"
    },
    {
        id: 3,
        image: card3,
        trend: "2024 Trend",
        title: "Women's Casuals "
    }
]

const Herosection = () => {
    const [visible, setVisible] = useState([false, false, false]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    cards.forEach((_, idx) => {
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
    }, []);

    return (
        <section className='section__container hero__container' ref={sectionRef}>
            {
                cards.map((card, idx) => (
                    <div
                        key={card.id}
                        className={`hero__card transition-all duration-700 transform
                            ${visible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                        `}
                        style={{ transitionDelay: `${idx * 120}ms` }}
                    >
                        <img src={card.image} alt={card.title} />
                        <div className='hero__content'>
                            <p>{card.trend}</p>
                            <h4>{card.title}</h4>
                            <a href="#">Discover More</a>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default Herosection
