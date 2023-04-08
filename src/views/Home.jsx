import React, { useState, useEffect } from "react";
import dressService from "../services/dressService";
// import { Link } from 'react-router-dom'
import Card from "../components/Card";
import SearchDress from "../components/SearchDress";


export default function Home() {
  const [dresses, setDress] = useState([]);


  // all dresses 
  const getDresses = async () => {
    try {
      const response = await dressService.getDresses();
      setDress(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDresses();
  }, []);

  return (
<div >
    <SearchDress />
    <div className="flex gap-3 flex-wrap rounded-lg">    
    {dresses &&
    dresses.length > 0 &&
    dresses.map((elem) => {
      return <Card   key={elem._id} dress={elem} />;
    })}
    </div>

</div>

  );
}
