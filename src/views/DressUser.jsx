import React, { useState, useEffect } from "react";
import profileService from "../services/profileService";

export default function DressUser() {
  const [userDress, setUserDress] = useState([]);

  const getDressesOfUserInSession = async () => {
    try {
      const response = await profileService.getDressesOfUserInSession();
      setUserDress(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDressesOfUserInSession();
  }, []);

  return (
    <div>
      {userDress.map((elem) => (
        <div key={elem._id}>
          <h2>{elem.name}</h2>
          <p>{elem.description}</p>
        </div>
      ))}
    </div>
  );
}
