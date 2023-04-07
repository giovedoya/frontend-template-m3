import React, { useState, useEffect } from "react";
import dressService from "../services/dressService";
// import { Link } from 'react-router-dom'
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";


export default function Home() {
  const [dresses, setDress] = useState([]);
  const {  user } = useAuth();
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
if (user) {
  console.log('my user role is', user.role )
}
  return (
<div className="flex gap-4">
  {dresses &&
    dresses.length > 0 &&
    dresses.map((elem) => {
      return <Card key={elem._id} dress={elem} />;
    })}
</div>

  );
}
