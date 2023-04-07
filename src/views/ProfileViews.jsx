import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import profileService from '../services/profileService';
import { Link } from 'react-router-dom';


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
    getProfile();
  }, []);


  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <h3>Username: {user.username}</h3>
          <p>Email: {user.email}</p>
          <button>
                <Link to={`/dress/newdress`}>Create a new dress</Link>
              </button>            
        </div>
      )}     
    </div>
  );
}


// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import profileService from '../services/profileService';
// import { Link } from 'react-router-dom';

// export default function ProfileViews() {
//   const { user } = useContext(AuthContext);
//   const [profile, setProfile] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const getProfile = async () => {
//     try {
//       const response = await profileService.getProfile();
//       setProfile(response);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//   }, []);

//   return (
//     <div>
//       {isLoading && <div>Loading...</div>}
//       {!isLoading && (
//         <div>
//           <h3>Username: {user.username}</h3>
//           <p>Email: {user.email}</p>
//           {user && user._id === dress.seller._id && (
//         <>
//           <button>
//             <Link to={`/dress/newdress`}>Create</Link>
//           </button>     
//         </>
//       )}
//         </div>
//       )}     
//     </div>
//   );
// }
