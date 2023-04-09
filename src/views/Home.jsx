import React, { useState, useEffect } from "react";
import dressService from "../services/dressService";
import Card from "../components/Card";
import SearchDress from "../components/SearchDress";

export default function Home() {
  const [dresses, setDresses] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getDresses = async () => {
    try {
      const response = await dressService.getDresses();
      setDresses(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDresses();
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <div className="search_container">
        <SearchDress handleSearchValue={handleSearch} />
      </div>

      <div className="card_container">
  {dresses
    .filter(
      (elem) =>
        elem.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.neckline.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.court.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.long.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.color.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.designer.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem.location.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((elem) => (
      <Card key={elem._id} dress={elem} />
    ))}
</div>
    </div>
  );
}
