import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';
const Login = () => {

    const [message,setMessage] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser, {isLoading : loginLoading}] = useLoginUserMutation();
    const navigate = useNavigate();
    console.log(loginUser)
    const handleLogin = async (e) => {
            e.preventDefault();
            const data = {
                email,
                password 
            }
          try {
            const response = await loginUser(data).unwrap();
            // console.log(response)
            const {token,user} = response;
            dispatch(setUser({user}))
            alert("Login successfull")
            navigate('/')
          } catch (error) {
            setMessage("Please Provide valid Email and Password")
          }
    }
  return (
    <section className=' h-screen flex items-center justify-center bg-gray-100 transition-all duration-500 ease-in-out'>
        <div className='max-w-sm border rounded-lg shadow-md bg-white mx-auto p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out'>
            <h2 className='text-2xl font-semibold pt-5 text-gray-800 text-center'>Welcome Back!</h2>
            <form className='space-y-5 max-w-sm mx-auto pt-8' onSubmit={handleLogin}>
                <input type="email" name="email" id="email" placeholder='Email Address' required className='w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block p-2.5 transition-all duration-300' 
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" name="password" id="password" placeholder='Password' required className='w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block p-2.5 transition-all duration-300'
                onChange={(e)=>setPassword(e.target.value)}/>
                {
                    message && <p className='text-red-500 transition-opacity duration-500'>{message}</p>
                }
                <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-red-700 font-medium py-3 rounded-md transition-colors duration-300'>Login</button>
                
            </form>

            <p className='my-5 italic text-sm text-center text-gray-500'>Don't have an Account? <Link to='/register' className='underline text-red-700 px-1 hover:text-red-900 transition-colors duration-300'>Register</Link> Here</p>
        </div>
    </section>
  )
}

export default Login
