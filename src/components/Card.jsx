import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { dress } = props;

    return (
<article className="rounded-lg overflow-hidden shadow-lg">
  <Link to={`/dress/${dress._id}`}>
    <img className="rounded-lg transition transform hover:scale-105" src={dress.image} alt={dress.name} />
  </Link>
  <div className="p-4">
    <h2 className="text-lg font-bold mb-2">
      <Link to={`/dress/${dress._id}`} className="hover:text-gray-700">{dress.designer}</Link>
    </h2>
    <h3 className="text-md font-semibold mb-2">{dress.long}</h3>
    <h3 className="text-md font-medium mb-2">€ {dress.price}</h3>
    <h3 className="text-md font-medium">Size: {dress.size}</h3>
  </div>
</article>
 )}