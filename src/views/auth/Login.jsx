import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth(); 
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(user)
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate('/');
        toast.success('Welcome back!')
      } else {
        setErrorMessage('Unable to authenticate user')
      }
    } catch (error) {
      setErrorMessage('Unable to authenticate user');
    }
  }

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
<div className="flex justify-center items-center h-screen bg-gray-100">
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Log in</h2>
    <div className="mb-4">
      <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
        Email
      </label>
      <input
        required
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        className="border border-gray-400 p-2 rounded w-full focus:outline-none focus:ring focus:ring-indigo-400"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
        Password
      </label>
      <input
        required
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        className="border border-gray-400 p-2 rounded w-full focus:outline-none focus:ring focus:ring-indigo-400"
      />
    </div>
    {errorMessage && (
      <p className="text-red-500 mb-4">{errorMessage}</p>
    )}
    <button
      type="submit"
      className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400"
    >
      Log in
    </button>
  </form>
</div>


  )
}
