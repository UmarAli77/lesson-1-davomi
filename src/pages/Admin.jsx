import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {backendUrl} from '../constanta/BackendUrl'

function Admin() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState(0);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('token')
      if(!token) {
        navigate('/login')
      }
  }, [navigate])
  const handleReset = () => {
    setTitle('');
    setSubTitle('');
    setImage('');
    setDescription('');
    setRate(0);
    setPrice(0);
    setSize('');
    setColor('');
    toast('Maydonlar tozalandi 🧹')
  }
  const handleSubmit = async () => {
    if(!title || !subTitle || !image || !description || !rate || !price || !size || !color) {
      toast('Maydonlarni toldiring 💻')
    }
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token,
      }
      const data = {
        title: title,
        subtitle: subTitle,
        image: image,
        description: description,
        rate: rate,
        price: price,
        size: size,
        color: color
      }
      const response = await axios.post(`${backendUrl}/products`, data, {
        headers: headers
      })
      if(response.data) {
        navigate('/')
      }
    } catch(err) {
      console.log('Xatolik yuz berdi: ', err);
    }
  }
  return (
    <div className='w-[1100px] h-screen flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
      <div className='bg-gradient-to-r from-or to-fuchsia-500'>
        <div className='w-[500px] p-4'>
          <h1 className='text-3xl font-semibold text-center mt-2 mb-4'>Create Card</h1>
          <div>
            <div className='flex items-center justify-evenly'>
              <div>
                <label className='text-lg font-normal' htmlFor="title">Card Title</label><br />
                <input name='title'  className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-white border-fuchsia-600 rounded' placeholder='Enter card Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className='text-lg font-normal' htmlFor="subtitle">Card Subtitle</label><br />
                <input name='subtitle'  className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-white border-fuchsia-600 rounded' placeholder='Enter card Sub Title' type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
              </div>
            </div>
            <div className='ml-6'>
              <label className='text-lg font-normal' htmlFor="image">Enter image address</label><br />
              <input  name='image'  className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-black border-sky-600 rounded w-[420px]' placeholder='Enter Image Address' type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className='flex items-center justify-evenly'>
              <div>
                <label className='text-lg font-normal' htmlFor="description">Description</label><br />
                <input name='description'  className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-white border-fuchsia-600 rounded' type="text" placeholder='Enter card Description' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label className='text-lg font-normal' htmlFor="rate">Rate</label><br />
                <input name='rate'  className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-white border-fuchsia-600 rounded' type="number" placeholder='Enter card Rate' value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
            </div>
            <div className='ml-6'>
              <label className='text-lg font-normal' htmlFor="price">Price</label><br />
              <input name='price'  className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-black border-sky-600 rounded w-[420px]' type="number" placeholder='Enter card Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className='flex items-center justify-evenly'>
              <div>
                <label className='text-lg font-normal' htmlFor="size">Size</label><br />
                <input name='size' className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-white border-fuchsia-600 rounded' type="text" placeholder='Enter card Size' value={size} onChange={(e) => setSize(e.target.value)} />
              </div>
              <div>
                <label className='text-lg font-normal' htmlFor="color">Color</label><br />
                <input name='color' className='my-2 bg-transparent border-2 cursor-pointer outline-none p-2 text-white border-fuchsia-600 rounded' type="text" placeholder='Enter card Color' value={color} onChange={(e) => setColor(e.target.value)} />
              </div>
            </div>
            <div className='w-[500px] ml-8 flex items-center justify-around'>
              <button onClick={handleSubmit} className='bg-fuchsia-800 py-2 px-7 rounded-md my-4 text-white hover:bg-transparent hover:border-fuchsia-800 hover:border-2' type='button'>Submit</button>
              <button onClick={handleReset} className='border-fuchsia-800 border-2 bg-transparent py-2 px-7 rounded-md my-4 text-white hover:bg-fuchsia-800' type='button'>Reset</button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
