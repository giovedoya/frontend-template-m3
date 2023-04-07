import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div className="container mx-auto flex justify-between items-center py-4">
  <div className="flex items-center">
    <NavLink to="/" className="text-lg font-semibold text-black">
      WeddSell
    </NavLink>
  </div>

  <ul className="flex items-center">
    {user && <li className="mr-6 text-black">Hello {user.username}</li>}
    <li>
      <NavLink to="/" className="hover:text-black px-3 py-2 rounded">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/post" className="hover:text-black px-3 py-2 rounded">
        Post
      </NavLink>
    </li>
    {!isLoggedIn && (
      <>
        <li>
          <NavLink to="/signup" className="hover:text-black px-3 py-2 rounded">
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="hover:text-black px-3 py-2 rounded">
            Login
          </NavLink>
        </li>
      </>
    )}
    {isLoggedIn && (
      <>
        <li>
          <NavLink
            to="/profile"
            className="hover:text-black px-3 py-2 rounded"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/private"
            className="hover:text-black px-3 py-2 rounded"
          >
            Private view
          </NavLink>
        </li>
        <li>
          <button
            className="hover:text-black px-3 py-2 rounded"
            onClick={() => logOutUser()}
          >
            Log out
          </button>
        </li>
      </>
    )}
    <li>
      <button
        className="hover:text-black px-3 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </li>
  </ul>
</div>

  )
}
