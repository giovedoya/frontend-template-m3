import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { dress } = props;

    return (
<div >
  <img style={{ width: "300px" }} src={dress.image} alt={dress.name} />
  <h2 >
    <Link to={`/dress/${dress._id}`} >{dress.name}</Link>
  </h2>
  <h3 className="">€ {dress.price}</h3>
  <h3 className="">Size: {dress.size}</h3>
</div>
  );
}
