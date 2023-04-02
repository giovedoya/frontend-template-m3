import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { dress } = props;

  return (
<div className="flex justify-center flex-col items-center">
  <img className="rounded-lg shadow-lg h-80 w-80 object-cover" src={dress.image} alt={dress.name} />
  <h2 className="mt-2 text-lg font-medium text-center">
    <Link to={`/dress/${dress._id}`} className="hover:text-gray-500">{dress.name}</Link>
  </h2>
  <h3 className="">€{dress.price}</h3>
  <h3 className="">€{dress.size}</h3>

</div>

  );
}
