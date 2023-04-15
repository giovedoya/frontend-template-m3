import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dressService from "../services/dressService";
// import profileService from "../services/profileService";
import reviewService from "../services/reviewService";
import NewReview from "./NewReview";
import Ship from '../assets/ship.png';
import Asymetric from '../assets/asymetric.png';
import FalleShoulders from '../assets/fallen-shoulders.png';
import WordHonor from '../assets/word-of-honor.png';
import Square from '../assets/square.png';
import Round from '../assets/round.png';
import QueenAnne from '../assets/queen-anne.png';
import Others from '../assets/others.png';
import InV from '../assets/In V.png';
import Ilusion from '../assets/ilusion.png';
import Heart from '../assets/heart.png';
import Halter from '../assets/halter.png';
import Princess from '../assets/princesa.png';
import InA from '../assets/en-A.png';
import Evase from '../assets/evase.png';
import Imperio from '../assets/imperio.png';
import Otros from '../assets/otros.png';
import Recto from '../assets/recto.png';
import Sirena from '../assets/sirena.png';
import NewMessage from "./NewMessage";


export default function DressDetail() {
  const { dressId } = useParams();
  const [ dress, setDress ] = useState(null);
  const [ review, setReviews] = useState([]);
  const [error, setError] = useState(false);

  
  const getDress = async () => {
    try {
      const response = await dressService.getDress(dressId);
      setDress(response);
      
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getReview = async () => {
    try {
      const response = await reviewService.getReviews();
      const filteredReviews = response.filter(review => review.dressId === dressId);
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error reviews:", error);
    }
  };
  
  useEffect(() => {
    getDress();
    getReview();
       // eslint-disable-next-line
  }, [dressId]);

  const handleNeckline = (type) => {
    switch (type) {
      case "ship":
        return Ship;
      case "v-shaped":
        return InV;
      case "square":
        return Square;
      case "round":
        return Round;
      case "queen anne":
        return QueenAnne;
      case "asymmetric":
        return Asymetric;
      case "fallen shoulders":
        return FalleShoulders;
      case "word of honor":
        return WordHonor;
      case "halter":
        return Halter;
      case "illusion":
        return Ilusion;
      case "heart":
        return Heart;
      case "others":
        return Others;
      default:
        return null;
    }
  }; 

  const handleCourt = (type) => {
    switch (type) {
      case "princess":
        return Princess;
      case "straight":
        return Recto;
      case "evaded":
        return Evase;
      case "in A":
        return InA;
      case "siren":
        return Sirena;
      case "empire":
        return Imperio;
      case "others":
        return Otros;
      default:
        return null;
    }
  }; 
  


  return (
    <div className="container mx-auto py-6">
    {dress !== null ? (
      <div className="flex flex-wrap mb-8">
        <img className="rounded-lg w-full sm:w-1/2 mb-4 sm:mb-0 sm:mr-4" src={dress.image} alt={dress.title} />
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{dress.designer}</h1>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">The Dress</h2>
            <p>{dress.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Characteristics</h2>
            <ul>
              <li className="mb-2">Neckline: {dress.neckline} <img src={handleNeckline(dress.neckline)} alt={dress.title}/></li>
              <li className="mb-2">Court: {dress.court} <img src={handleCourt(dress.court)} alt={dress.title}/></li>
              <li className="mb-2">Color: {dress.color}</li>
              <li className="mb-2">Size: {dress.size}</li>
              <li className="mb-2">Length: {dress.long}</li>
              <li className="mb-2">Seller: {dress.name}</li>
              <li className="mb-2">Price: €{dress.price}</li>
              <li className="mb-2">Location: {dress.location}</li>
            </ul>
          </div>
          <div className="mb-6 flex justify-between items-center"> 
            <NewMessage dressOwner={dress.seller._id}/>
            <NewReview />
          </div>
        </div>
      </div>
    ) : null}
    {error ? <p className="text-red-500">{error}</p> : null}   
    {review && review.length > 0 && review.map((review) => (
        <div key={review._id} className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/4 mx-auto mb-8">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg font-bold mb-4">Rating: {review.rating}</p>
              <p className="mb-4">{review.comment}</p>
            </div>
            <div>
              <p>By {review.buyerId.username}</p>
            </div>
          </div>
        </div>
    ))}
  </div>
  )}