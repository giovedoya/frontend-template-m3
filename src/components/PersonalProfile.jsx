import React from 'react';
import { useAuth } from "../hooks/useAuth";

function PersonalProfile() {
    const { user } = useAuth();
  return (
    // <div
    //   className="bg-cover bg-center h-screen"
    //   style={{ backgroundImage: `url(${BackgroundImage})` }}
    // >
    <header className="bg-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-start mb-4">Account Information</h2>
        <div className="flex flex-col space-y-4">
          <p className="text-gray-500 text-start font-bold">{user.username} | {user.email} | {user.location}</p>
          {/* <p className="text-gray-500 text-start font-bold"> {user.email}</p>
          <p className="text-gray-500 text-start font-bold">{user.location}</p> */}
        </div>
      </div>
    </header>
    // </div>
  );
}

export default PersonalProfile;