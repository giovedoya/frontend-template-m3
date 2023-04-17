import React, { useState, useEffect } from "react";
import dressService from "../services/dressService";
import Card from "../components/Card";
import SearchDress from "../components/SearchDress";
import LandingPage from "../components/LandingPage";

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
      <LandingPage />
      <header className="flex items-center justify-between py-4 px-6 bg-gray-800">
        <div className="w-full flex justify-center bg-gray-800">
          <SearchDress handleSearchValue={handleSearch} />
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
          {dresses
            .filter(
              (elem) =>
                elem.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                elem.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                elem.neckline
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                elem.court.toLowerCase().includes(searchValue.toLowerCase()) ||
                elem.long.toLowerCase().includes(searchValue.toLowerCase()) ||
                elem.color.toLowerCase().includes(searchValue.toLowerCase()) ||
                elem.designer
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                elem.location.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((elem) => (
              <Card key={elem._id} dress={elem} />
            ))}
        </div>
      </main>
    </div>
  );
}
