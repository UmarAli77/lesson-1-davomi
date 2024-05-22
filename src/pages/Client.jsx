import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constanta/BackendUrl';
import star from '../assets/star-removebg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Client() {
  const navigate = useNavigate();
  const [ getCard, setGetCard ] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      navigate('/login')
    }
  }, [])
  const cartDelete = async (cardId) => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: token
      }
      const response = await axios.delete(`${backendUrl}/products/${cardId}`, {
        headers: headers
      })
      if(response.data) {
        navigate(0)
        toast('Malomot ochirildi 🪣')
      }
    } catch(error) {
      console.log('Xatolik yuzaga keldi', error);
    }
  }
  useEffect(() => {
    async function getCard() {
      try {
        const response = await axios.get(`${backendUrl}/products`);
        setGetCard(response.data)
      } catch(err) {
        console.log('Xatolik yuz berdi', err);
      }
    }
    getCard();
  }, [])
  
  return (
    <div className='grid grid-cols-3 justify-evenly'>
      {
        getCard.map((element) => 
          <div className='p-3 bg-gradient-to-r from-neutral-50 to-slate-800 w-[300px] rounded-md my-6'>
            <img className='w-[300px]' src={element.image} alt="" />
            <div className=''>
              <h1 className='text-3xl font-semibold'>{element.title}</h1>
              <h2 className='text-lg mt-1 font-medium'>{element.description}</h2>
              <h3 className='font-medium text-lg my-2'>Price {element.price}</h3>
              <p className='flex items-center text-2xl font-normal uppercase'><img className='w-[35px]' src={star} alt="" />{element.rate} star</p>
              <div className='flex items-center gap-5 text-lg font-normal'>
                <p className=''>Size: {element.size}</p>
                <p>Color: {element.color}</p>
              </div>
              <button onClick={() => cartDelete(element._id)} type='button' className='font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-2 px-6 rounded-md text-white my-2 transition duration-700 ease-in-out'>Delete</button>
              <ToastContainer />
            </div>
          </div>
        )
      }
    </div>
  )
}
export default Client
