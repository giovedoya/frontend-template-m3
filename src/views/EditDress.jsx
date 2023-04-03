import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dressService from "../services/dressService";

export default function EditDress() {
  const { dressId } = useParams();

  const [dress, setDress] = useState({});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dressService.editDress(dressId, dress);
      navigate(`/dress/${dressId}`);
    } catch (error) {
      console.error(error);
    }
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
          <option value="">Choose a neckline</option>
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
          <option value="">Choose a court</option>
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
          <option value="">Choose a long</option>
          <option value="ship">Long</option>
          <option value="v-shaped">Half</option>
          <option value="square">Short</option>          
        </select>
        <label>Color:</label>
        <select
          type="text"
          name="color"
          value={dress.color}
          onChange={handleChange}
        >
          <option value="">Choose a color</option>
          <option value="princess">Black</option>
          <option value="straight">Light Blue</option>
          <option value="evaded">Brown</option>
          <option value="in A">Golden</option>
          <option value="siren">Grey</option>
          <option value="empire">Green</option>
          <option value="others">Ivory</option>
          <option value="others">Multicolored</option>
          <option value="others">Pink</option>
          <option value="others">Red</option>
          <option value="others">Silver</option>
          <option value="others">White</option>
          <option value="others">Dark blue</option>
          <option value="others">Others</option>
        </select>
        <label>Size:</label>
      <select
        type="number"
        name="size"
        value={dress.size}
        onChange={handleChange}
      >
        <option value="">Choose a size</option>
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
        <button type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
