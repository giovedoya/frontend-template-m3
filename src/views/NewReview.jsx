import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewService from '../services/reviewService';

function Star({ selected, onClick }) {
  return <div onClick={onClick}>{selected ? '★' : '☆'}</div>;
}

export default function NewReview() {
  const initialState = {
    rating: '',
    comment: '',
  };
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
      const reviewNew = await reviewService.createReview(newReview);
      console.log('datos encontrados', reviewNew);
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





// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import reviewService from "../services/reviewService";
// import { FaStar, FaRegStar } from 'react-icons/fa';

// export default function NewReview() {
//     const initialState = {
//         rating: "",
//         comment: "",
//     };
   
//     const [ newReview, setNewReview] = useState(initialState);
//     const [ error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setNewReview((prev) => {
//           return {
//             ...prev,
//             [e.target.name]: e.target.value,
//           };
//         });
//       };

//       const ratingStars = (rating) => {
//         const stars = [];
//         for (let i = 0; i < 5; i++) {
//           if (i < rating) {
//             stars.push(<FaStar key={i} />);
//           } else {
//             stars.push(<FaRegStar key={i} />);
//           }
//         }
//         return stars;
//       };

//       const handleSubmit = async (e) => {    
//         e.preventDefault();
//         try {
            
//           const reviewNew = await reviewService.createReview(newReview);     
//             console.log('datos encontrados', reviewNew)
//           if (reviewNew && reviewNew._id) {
//             setError("");
//             navigate(`/review/${reviewNew._id}`);
//             setNewReview(initialState);
//           } else {
//           }
//         } catch (err) {
//           console.error(err);
//           setError(err);
//         }
//       };      

//   return (
//     <div>
//       <h2>Post new</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p>Something went wrong. Couldn't find your review</p>}
//         <div>
//           <label>Rating</label>
//           <div>
//             {ratingStars(newReview.rating)}
//           </div>
//         </div>
//         <div>
//           <label>Comment</label>
//           <textarea
//             type="text"
//             name="comment"
//             value={newReview.comment}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">
//           Save changes
//         </button>
//       </form>
//     </div>
//   )
// }
