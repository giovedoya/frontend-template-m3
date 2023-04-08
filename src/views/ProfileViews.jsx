import React, { useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
import profileService from '../services/profileService';
import { Link, useParams } from 'react-router-dom';


export default function ProfileViews() {
  // const { user } = useContext(AuthContext);
  const { userId} = useParams();
  const [ profile, setProfile ] = useState({});
  
  const getProfile = async () => {
    try {
      const response = await profileService.getProfile(userId);
      setProfile(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
      // eslint-disable-next-line
  }, [userId]);


  return (
    <div>
    
        <div>
          <h3>Username: {profile.username}</h3>
          <p>Email: {profile.email}</p>
          <h2>Are you ready to sell? It will only take a few minutes</h2>
          <button>
                <Link to={`/dress/newdress`}>Create a new dress</Link>
              </button>            
        </div>
           
    </div>
  );
}