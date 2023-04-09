import React from 'react';

export default function SearchDress({ handleSearchValue }) {
  const handleChange = (e) => {
    handleSearchValue(e.target.value);
  };

  return (
    <div>
      <input type="text" name="search" onChange={handleChange} />
    </div>
  );
}
