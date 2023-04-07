import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import reviewService from '../services/reviewService';


export default function NewReview() {
  const initialState = {
    rating: 1,
    comment: '',
  };
  const { dressId } = useParams();
  const [newReview, setNewReview] = useState(initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    console.log('Submitting review...');
    try {
      const reviewNew = await reviewService.createReview({...newReview, dressId: dressId});
      console.log('Review created:', newReview); 
      if (reviewNew && reviewNew._id) {
        setError('');
        navigate(`/dress/${dressId._id}`); // al vestido
        setNewReview(initialState);
      } else {
        // handle error
      }
    } catch (err) {
      console.log('Error:', err);
      setError(err);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your review</p>}
        <label>Rating</label>      
        <input 
          type="number"
          name="rating" 
          min="1"
          max="5"
          value={newReview.rating} 
          onChange={handleChange}
          required
        />        
        <label>Comment</label>
        <textarea
          type="text"
          name="comment"
          value={newReview.comment}
          onChange={handleChange}
          required
        />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}