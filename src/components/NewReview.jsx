import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import reviewService from '../services/reviewService';


export default function NewReview() {
  const initialState = {
    rating: 1,
    comment: '',
  };
  const { dressId } = useParams();
  const [newReview, setNewReview] = useState(initialState);
  const [error, setError] = useState('');
  // const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setNewReview((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewNew = await reviewService.createReview(dressId, {
        ...newReview,
        dressId: dressId
      });
      if (reviewNew && reviewNew._id) {
        setError('');
        window.location.reload();
        setNewReview(initialState);
      }
    } catch (err) {
      console.log('Error:', err);
      setError(err);
    }
  };
  
  
  return (
    <div className="container mx-auto my-8">
  <div className="flex flex-col md:flex-row items-center justify-between mb-8">
    <div className="w-full md:w-1/2 md:mr-8 mb-8 md:mb-0">

    </div>
    <div className="w-full md:w-1/2">
      <div className="flex flex-col justify-center items-center">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">Something went wrong. Couldn't find your review</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="rating">
              Rating
            </label>      
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="rating" 
              min="1"
              max="5"
              value={newReview.rating} 
              onChange={handleChange}
              required
            /> 
          </div>     
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">
              Comment
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="comment"
              value={newReview.comment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  )}  