import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dressService from "../services/dressService";

export default function RelatedDreses() {
  const [dresses, setDresses] = useState([]);

  const getDresses = async () => {
    try {
      const response = await dressService.getDresses();
      setDresses(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDresses();
  }, []);

  const getRandomDresses = () => {
    const randomIndex = Math.floor(Math.random() * dresses.length);
    return dresses.slice(randomIndex, randomIndex + 4);
  };

  const randomDresses = getRandomDresses();

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Related Dresses</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {randomDresses.map((dress) => (
          <Link to={`/dress/${dress._id}`} key={dress._id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative cursor-pointer">
                <img
                  className="w-full transform hover:scale-105 transition duration-500 ease-in-out"
                  src={dress.image}
                  alt={dress.title}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <p className="font-bold text-gray-800">{dress.designer}</p>
                  <p className="font-bold text-gray-800">${dress.price}</p>
                </div>
                <p className="text-gray-600">
                  {dress.description.slice(0, 20)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
