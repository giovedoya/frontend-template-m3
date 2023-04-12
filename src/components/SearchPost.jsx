import React from 'react'

export default function SearchReviews(handleSearchValueReview) {
    const handleChange = (e) => {
        handleSearchValueReview(e.target.value);
      };
  return (
    <div >
    <input  type="text" name="search" placeholder="Search posts" className="border border-gray-300 px-4 py-2 rounded-md w-full p-4 flex justify-center items-center" onChange={handleChange} />
  </div>

  )
}
