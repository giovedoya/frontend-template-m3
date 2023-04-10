import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dressService from "../services/dressService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NewReview from "./NewReview";

export default function DressDetail() {
  const { dressId } = useParams();
  const [ dress, setDress ] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  
  const getDress = async () => {
    try {
      const response = await dressService.getDress(dressId);
      setDress(response);
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDress();
       // eslint-disable-next-line
  }, [dressId]);

  const handleDelete = async (dressId) => {
    try {
      const deletedDress = await dressService.deleteDress(dressId);
      setDress(deletedDress);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      getDress();
    }
  };

  return (
    <div className="container mx-auto py-6">
      {dress !== null ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{dress.name}</h1>
          <div className="flex flex-wrap mb-8">
            <img className="rounded-lg w-full sm:w-1/2 mb-4 sm:mb-0 sm:mr-4" src={dress.image} alt={dress.title} />
            <div className="flex flex-col justify-between w-full sm:w-1/2">
              <h2 className="text-lg font-bold text-gray-800 mb-4">The Dress</h2>
              <p className="mb-6">{dress.description}</p>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Characteristics</h2>
              <ul className="mb-6">
                <li>Neckline: {dress.neckline}</li>
                <li>Court: {dress.court}</li>
                <li>Color: {dress.color}</li>
                <li>Size: {dress.size}</li>
                <li>Length: {dress.long}</li>
                <li>Price: {dress.price}</li>
                <li>Location: {dress.location}</li>
              </ul>
              <div className="flex justify-between items-center">
                {user && user._id === dress.seller._id && (
                  <>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
                      <Link to={`/dress/${dress._id}/edit`}>Edit dress</Link>
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700" type="button" onClick={() => handleDelete(dress._id)}>
                      Delete dress
                    </button>
                  </>
                )}
                <NewReview />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}