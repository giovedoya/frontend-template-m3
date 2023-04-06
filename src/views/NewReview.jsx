import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import reviewService from '../services/reviewService';

function Star({ selected, onClick }) {
  return <div onClick={onClick}>{selected ? '★' : '☆'}</div>;
}

export default function NewReview() {
  const initialState = {
    rating: '',
    comment: '',
  };
  const { dressId } = useParams();
  const [newReview, setNewReview] = useState(initialState);
  const [error, setError] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewReview((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleStarClick = (starCount) => {
    setSelectedStars(starCount);
    setNewReview((prev) => {
      return {
        ...prev,
        rating: starCount,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewNew = await reviewService.createReview({...newReview, dressId: dressId});

      if (reviewNew && reviewNew._id) {
        setError('');
        navigate(`/review/${reviewNew._id}`);
        setNewReview(initialState);
      } else {

      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <div>
      <h2>Post new</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your review</p>}
        <label>Rating</label>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            selected={i <= selectedStars}
            onClick={() => handleStarClick(i)}
          />
        ))}
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