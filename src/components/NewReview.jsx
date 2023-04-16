import React, { useState } from "react";
import { useParams } from "react-router-dom";
import reviewService from "../services/reviewService";
import { useAuth } from "../hooks/useAuth";

export default function NewReview() {
  const initialState = {
    rating: 1,
    comment: "",
  };
  const { dressId } = useParams();
  const [newReview, setNewReview] = useState(initialState);
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setNewReview((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewNew = await reviewService.createReview(dressId, {
        ...newReview,
        dressId: dressId,
      });
      if (reviewNew && reviewNew._id) {
        setError("");
        window.location.reload();
        setNewReview(initialState);
      }
    } catch (err) {
      console.log("Error:", err);
      setError(err);
    }
  };

  return (
    <div className="bg-white rounded-lg w-full">
      <h2 className="mb-4">If you liked the dress and you want to say something nice, do not hesitate to do so</h2>
      <form onSubmit={handleSubmit} className="w-full">
        {error && (
          <p className="text-red-500">{`Something went wrong. Couldn't find your review`}</p>
        )}
        <div>
          <label
            htmlFor="rating"
            className="block text-gray-700 font-bold mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-gray-700 font-bold mb-2"
          >
            Comment
          </label>
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleChange}
            placeholder="Your message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
