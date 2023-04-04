import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dressService from "../services/dressService";

export default function EditDress() {
  const { dressId } = useParams();
  const [dress, setDress] = useState({
    neckline: "",
    court: "",
    long: "",
    color: "",
    size: "",
    designer: "",
    name: "",
    description: "",
    price: "",
    image: "",
    wasSold: false,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getDress = async () => {
    try {
      const response = await dressService.getDress(dressId);
      setDress(response);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  console.log(dress)
  useEffect(() => {
    getDress();
    // eslint-disable-next-line
  }, [dressId]);

  const handleChange = (e) => {
    setDress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSold = (e) => {
    setDress(prev => {
      return {
        ...prev,
        wasSold: e.target.checked
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dressService.editDress(dressId, dress);
      navigate(`/dress/${dressId}`);
    } catch (error) {
      console.error(error);
    }
    console.log(handleSubmit)
  };

  return (
    <div>
      <h2>Dress edit</h2>
      <form
        onSubmit={handleSubmit}
      >
        {error && <p>Something went wrong. Couldn't find your dress</p>}
        <label>Dress Name</label>
        <input
          type="text"
          name="name"
          value={dress.name}
          onChange={handleChange}
          required
        />
        <label>Neckline</label>
        <select
          type="text"
          name="neckline"
          value={dress.neckline}
          onChange={handleChange}
        >         
          <option value="ship">Ship</option>
          <option value="v-shaped">V-shaped</option>
          <option value="square">Square</option>
          <option value="strapless">Strapless</option>
          <option value="halter">Halter</option>
          <option value="round">Round</option>
          <option value="heart">Heart</option>
          <option value="delusion">Delusion</option>
          <option value="fallen shoulders">Fallen shoulders</option>
          <option value="queen anne">Queen Anne</option>
          <option value="asymmetric">Asymmetric</option>
          <option value="others">Others</option>
        </select>
        <label>Court:</label>
        <select
          type="text"
          name="court"
          value={dress.court}
          onChange={handleChange}
        >        
          <option value="princess">Princess</option>
          <option value="straight">Straight</option>
          <option value="evaded">Evaded</option>
          <option value="in A">In A</option>
          <option value="siren">Siren</option>
          <option value="empire">Empire</option>
          <option value="others">Others</option>
        </select>
        <label>Long</label>
        <select
          type="text"
          name="long"
          value={dress.long}
          onChange={handleChange}
        >         
          <option value="long">Long</option>
          <option value="half">Half</option>
          <option value="short">Short</option>          
        </select>
        <label>Color:</label>
        <select
          type="text"
          name="color"
          value={dress.color}
          onChange={handleChange}
        >          
          <option value="black">Black</option>
          <option value="light blue">Light Blue</option>
          <option value="brown">Brown</option>
          <option value="golden">Golden</option>
          <option value="grey">Grey</option>
          <option value="green">Green</option>
          <option value="ivory">Ivory</option>
          <option value="multicolored">Multicolored</option>
          <option value="pink">Pink</option>
          <option value="red">Red</option>
          <option value="silver">Silver</option>
          <option value="white">White</option>
          <option value="dark blue">Dark blue</option>
          <option value="others">Others</option>
        </select>
        <label>Size:</label>
      <select
        type="number"
        name="size"
        value={dress.size}
        onChange={handleChange}
      >        
        <option value="32">32</option>
        <option value="34">34</option>
        <option value="36">36</option>
        <option value="38">38</option>
        <option value="40">40</option>
        <option value="42">42</option>
        <option value="44">44</option>
        <option value="46">46</option>
        <option value="48">48</option>
        <option value="50">50</option>
        <option value="52">52</option>
        <option value="54">54</option>
        <option value="56">56</option>
        <option value="58">58</option>
        <option value="60">60</option>
        <option value="62">62</option>
      </select>
        <label>Designer</label>
        <input
          type="text"
          name="designer"
          value={dress.designer}
          onChange={handleChange}
          required
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={dress.price}
          onChange={handleChange}
          required
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={dress.location}
          onChange={handleChange}
          required
        />
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={dress.image}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={dress.description}
          onChange={handleChange}
          required
        />
        <label>Sold</label>
        <input type="checkbox" name="sold" checked={dress.wasSold} onChange={handleSold} />
        <button type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
