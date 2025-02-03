import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        }
        console.log(data)
    }
    return (
        <section className=' h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className=' text-2xl font-semibold pt-5'>Please Register</h2>
                <form className='space-y-5 max-w-sm mx-auto pt-8' onSubmit={handleRegister}>
                <input type="text" name="username" id="username" placeholder='Username' required className=' w-full bg-gray-100 focus:outline-none px-5 py-3'
                        onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" name="email" id="email" placeholder='Email Address' required className=' w-full bg-gray-100 focus:outline-none px-5 py-3'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" id="password" placeholder='Password' required className=' w-full bg-gray-100 focus:outline-none px-5 py-3'
                        onChange={(e) => setPassword(e.target.value)} />
                    {
                        message && <p className='text-red-500'>{message}</p>
                    }
                    <button type='submit' className=' w-full mt-5 bg-primary text-white hover:bg-red-700 font-medium py-3 rounded-md'>Login</button>

                </form>

                <p className='my-5 italic text-sm text-center'>Have an Account? Please<Link to='/login' className=' underline text-red-700 px-1'>Login</Link></p>
            </div>
        </section>
    )
}

export default Register
