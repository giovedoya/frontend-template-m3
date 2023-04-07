import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import profileService from '../services/profileService';

export default function ProfileViews() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);


 const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile()
  }, [profile]) 

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <h3>Username: {user.username}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}     
    </div>
  );
}
