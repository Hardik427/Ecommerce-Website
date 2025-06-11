import React from 'react';

const Contact = () => {
  return (
    <>
      <section className='section__container bg-primary-light'>
        <div className='text-center'>
          <h2 className='section__header'>Contact Us</h2>
          <p className='section__subheader'>
            We'd love to hear from you! Please use the form below to get in touch.
          </p>
        </div>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-1'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Your Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                name='name'
                type='text'
                placeholder='Your Name'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Your Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                name='email'
                type='email'
                placeholder='Your Email'
                required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
                Message
              </label>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='message'
                name='message'
                rows='5'
                placeholder='Your Message'
                required
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200 focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Send Message
              </button>
            </div>
          </form>

          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-1'>
            <h4 className='text-xl font-semibold text-gray-800 mb-4'>Contact Information</h4>
            <p className='text-gray-700 mb-2 flex items-center'>
              <span>
                <i className='ri-map-pin-2-fill text-primary text-lg mr-2'></i>
              </span>
              123, London Bridge Street, London
            </p>
            <p className='text-gray-700 mb-2 flex items-center'>
              <span>
                <i className='ri-mail-fill text-primary text-lg mr-2'></i>
              </span>
              support@fashion.com
            </p>
            <p className='text-gray-700 mb-2 flex items-center'>
              <span>
                <i className='ri-phone-fill text-primary text-lg mr-2'></i>
              </span>
              (+012) 3456 789
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;