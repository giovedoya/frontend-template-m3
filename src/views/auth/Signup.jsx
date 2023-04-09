import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    location: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }, [passwordControl, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.location || user.location.length < 3) {
      setErrorMessage('Please provide a valid location');
      return;
    }
    try {
      await authService.signup({ username: user.username, email: user.email, location: user.location, password });
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account')
    }
  }

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          required
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded w-full focus:outline-none focus:ring focus:ring-indigo-400"
        />
      </div>
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
        <label htmlFor="location" className="block font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          required
          type="text"
          id="location"
          name="location"
          value={user.location}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full focus:outline-none focus:ring focus:ring-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="passwordControl" className="block font-medium text-gray-700 mb-2">
          Repeat the password
        </label>
        <input
          required
          type="password"
          id="passwordControl"
          name="passwordControl"
          value={passwordControl}
          onChange={(e) => setPasswordControl(e.target.value)}
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
        Register
      </button>
    </form>
  </main>
  
  )
}
