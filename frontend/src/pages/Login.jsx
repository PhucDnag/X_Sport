import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const Login = () => {
  
  const [currentState , setCurrentState] = useState('Đăng nhập');
  const {token, setToken , navigate , backendUrl , setUser} = useContext(ShopContext)
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');


  const onSubmitHandler = async (event) =>{
    event.preventDefault(); 
    try {
      if(currentState === 'Đăng ký'){

        const response = await axios.post(backendUrl + '/api/user/register' , {name,email,password});
         if (response.data.success){
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setCurrentState('Đăng nhập');
        setName('');
        setPassword('');
        
    } else {
      toast.error(response.data.message);
    }
      }
      else {

        const response  = await axios.post(backendUrl + '/api/user/login' , {email,password});
        if(response.data.success){
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token' , response.data.token);
          localStorage.setItem('user' , JSON.stringify(response.data.user));
        } else {
          toast.error(response.data.message);
        }
        

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() =>{
    if(token){
      navigate('/');
    }
  },[token])


  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] max-w-md m-auto mt-20 mb-16 gap-4 text-gray-800 bg-white rounded-2xl shadow-xl p-8"
    >
      {/* TITLE */}
      <div className="inline-flex items-center gap-3 mb-4">
        <p className="text-3xl font-semibold tracking-wide">
          {currentState}
        </p>
        <div className="h-[2px] w-10 bg-black"></div>
      </div>
  
      {/* NAME (CHỈ HIỆN KHI ĐĂNG KÝ) */}
      {currentState !== "Đăng nhập" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Tên"
          required
        />
      )}
  
      {/* EMAIL */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Email"
        required
      />
  
      {/* PASSWORD */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Mật khẩu"
        required
      />
  
      {/* LINK CHUYỂN FORM */}
      <div className="w-full flex justify-between text-sm mt-[-6px] text-gray-600">
        <p className="cursor-pointer hover:text-[#E95221] transition">
          Quên mật khẩu?
        </p>
  
        {currentState === "Đăng nhập" ? (
          <p
            onClick={() => setCurrentState("Đăng ký")}
            className="cursor-pointer hover:text-[#E95221] transition"
          >
            Tạo tài khoản
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Đăng nhập")}
            className="cursor-pointer hover:text-[#E95221] transition"
          >
            Đăng nhập tại đây
          </p>
        )}
      </div>
  
      {/* BUTTON */}
      <button
        className="bg-black hover:bg-gray-800 transition text-white font-medium px-10 py-2.5 mt-6 rounded-lg"
      >
        {currentState === "Đăng nhập" ? "Đăng nhập" : "Đăng ký"}
      </button>
    </form>
  );
  
}

export default Login