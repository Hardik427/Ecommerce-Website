import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className='ri-map-pin-2-fill'></i></span>
                123, London Bridge Street, London
            </p>
            <p>
                <span><i className='ri-mail-fill'></i></span>
                support@fashion.com
            </p>
            <p>
                <span><i className='ri-phone-fill'></i></span>
                (+012) 3456 789
            </p>
        </div>
    </footer>
    </>
  )
}

export default Footer
