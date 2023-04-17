import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dressService from "../services/dressService";
import reviewService from "../services/reviewService";
import NewReview from "./NewReview";
import Ship from "../assets/ship.png";
import Asymetric from "../assets/asymetric.png";
import FalleShoulders from "../assets/fallen-shoulders.png";
import WordHonor from "../assets/word-of-honor.png";
import Square from "../assets/square.png";
import Round from "../assets/round.png";
import QueenAnne from "../assets/queen-anne.png";
import Others from "../assets/others.png";
import InV from "../assets/In V.png";
import Ilusion from "../assets/ilusion.png";
import Heart from "../assets/heart.png";
import Halter from "../assets/halter.png";
import Princess from "../assets/princesa.png";
import InA from "../assets/en-A.png";
import Evase from "../assets/evase.png";
import Imperio from "../assets/imperio.png";
import Otros from "../assets/otros.png";
import Recto from "../assets/recto.png";
import Sirena from "../assets/sirena.png";
import NewMessage from "./NewMessage";
import RelatedDreses from "./RelatedDreses";
import { useAuth } from "../hooks/useAuth";

export default function DressDetail() {
  const { user } = useAuth();
  const { dressId } = useParams();
  const [dress, setDress] = useState(null);
  const [review, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

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
      const filteredReviews = response.filter(
        (review) => review.dressId === dressId
      );
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

  const handleShowReview = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4">
          {dress !== null ? (
            <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <img
                className="rounded-lg w-full mb-4 sm:mb-0"
                src={dress.image}
                alt={dress.title}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Designer {dress.designer}
                  </h1>
                  <div className="mb-9 text-center">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                      The Dress
                    </h2>
                    <p>{dress.description}</p>
                  </div>
                  <div className="mb-7">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                      Characteristics
                    </h2>
                    <div className="space-y-2 bg-white p-4 rounded shadow-lg">
                      <div className="flex items-center">
                        <span className="font-bold">
                          Neckline:{" "}
                          {dress.neckline.charAt(0).toUpperCase() +
                            dress.neckline.slice(1)}{" "}
                        </span>
                        <img
                          src={handleNeckline(dress.neckline)}
                          alt={dress.title}
                          className="ml-2 h-15 w-auto"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold">
                          Court:{" "}
                          {dress.court.charAt(0).toUpperCase() +
                            dress.court.slice(1)}{" "}
                        </span>
                        <img
                          src={handleCourt(dress.court)}
                          alt={dress.title}
                          className="ml-2 h-15 w-auto"
                        />
                      </div>
                      <div className="font-bold">
                        Color:{" "}
                        {dress.color.charAt(0).toUpperCase() +
                          dress.color.slice(1)}
                      </div>
                      <div className="font-bold">Size: {dress.size}</div>
                      <div className="font-bold">
                        Length:{" "}
                        {dress.long.charAt(0).toUpperCase() +
                          dress.long.slice(1)}
                      </div>

                      <div className="font-bold">
                        Location: {dress.location}
                      </div>
                    </div>
                  </div>
                </div>
                {user && user._id === dress.seller._id ? null : (
                  <>
                    <div className="font-bold text-center">
                      Seller:{" "}
                      {dress.seller.username.charAt(0).toUpperCase() +
                        dress.seller.username.slice(1)}
                    </div>
                    <div className="font-bold text-center">
                      Price: € {dress.price}
                    </div>
                  </>
                )}

                <div className="mb-6">
                  <div className="bg-white p-4 rounded shadow-lg md:w-3/4 lg:w-3/4 mx-auto">
                    <div className="flex justify-between items-center space-x-4">
                      <NewMessage dressOwner={dress.seller._id} />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-white p-4 rounded shadow-lg md:w-3/4 lg:w-3/4 mx-auto">
                    <div className="flex justify-between items-center space-x-4">
                      <button
                        className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                        onClick={handleShowReview}
                      >
                        {showReviewForm ? "Hide Review Form" : "Write a Review"}
                      </button>
                    </div>
                    {showReviewForm && <NewReview />}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {error ? <p className="text-red-500">{error}</p> : null}
          <RelatedDreses />
          <h2 className="text-xl font-bold mb-4">What brides think</h2>
          {review &&
            review.length > 0 &&
            review.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-1 gap-4 md:w-3/4 mx-auto mb-1"
              >
                <div className="flex flex-col justify-between">
                  <div className="">
                    <div className="space-y-2 p-4 rounded-lg shadow-lg w-full">
                      <div className="font-bold">{review.rating}</div>
                      <p>
                        By{" "}
                        {review.buyerId.username.charAt(0).toUpperCase() +
                          review.buyerId.username.slice(1)}
                      </p>
                      <p className="mb-4">{review.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
