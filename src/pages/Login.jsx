import axios from 'axios';
import React, { useState } from 'react'
import { backendUrl } from '../constanta/BackendUrl';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  const Submit = async () => {
    if(!email || !password) {
      toast('Maydonlarni toldiring !')
    }
    try {
      const response = await axios.post(`${backendUrl}/auth`, {
        email: email,
        password: password
      })
      if(response.data) {
        navigate('/admin')
        localStorage.setItem('token', response.data)
      }
    }catch(err) {
      console.log('Xatolik yuz berdi: ', err);
    }
  }
  const Reset = () => {
    setEmail('');
    setPassword('');
    toast('Maydonlar tozalandi 🪣')
  }
  return (
    <div className='w-screen h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center'>
        <div className='bg-white p-10 rounded-xl'>
          <h1 className='text-center text-2xl mb-5 font-bold'>Login</h1>
          <div>
            <label htmlFor="email">Enter your Email Address</label>
            <br />
            <input className='border-2 border-slate-950 rounded-md border-solid mt-2 mb-4 cursor-pointer p-2' type="email" id='email' placeholder='user@gmail.com' value={email} onChange={(el) => setEmail(el.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Enter your Password</label>
            <br />
            <input className='border-2 border-slate-950 rounded-md border-solid mt-3 cursor-pointer p-2' type="password" id='password' placeholder='test123' value={password} onChange={(el) => setPassword(el.target.value)} />
          </div>
          <div className=' mt-5 gap-3'>
            <button type='button' onClick={Submit} className='font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-2 px-6 rounded-md text-white my-2 transition duration-700 ease-in-out mr-5'>Login</button>
            <button type='button' onClick={Reset} className='font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-2 px-6 rounded-md text-white my-2 transition duration-700 ease-in-out'>Reset</button>
            <ToastContainer />
          </div>
        </div>
    </div>
  )
}

export default Login
