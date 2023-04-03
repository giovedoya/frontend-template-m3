import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import dressService from "../services/dressService";

export default function NewDress() {
    const initialState = {
        neckline: "",
        court: "",
        long: "",
        color: "",
        size: "",
        designer: "",
        name: "",
        description: "",
        price: "",
        location: "",
        image: "",
        sold: "",
    };
    const [ newDress, setNewDress] = useState(initialState);
    const [ error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewDress((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const dressNew = await dressService.createDress(newDress);
          setError("");
          navigate(`/dress/${dressNew._id}`);
          setNewDress(initialState);
        } catch (err) {
          console.error(err);
          setError(err);
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
          value={newDress.name}
          onChange={handleChange}
          required
        />
        <label>Neckline</label>
        <select
          type="text"
          name="neckline"
          value={newDress.neckline}
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
          value={newDress.court}
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
          value={newDress.long}
          onChange={handleChange}
        >         
          <option value="ship">Long</option>
          <option value="v-shaped">Half</option>
          <option value="square">Short</option>          
        </select>
        <label>Color:</label>
        <select
          type="text"
          name="color"
          value={newDress.color}
          onChange={handleChange}
        >          
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
        value={newDress.size}
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
          value={newDress.designer}
          onChange={handleChange}
          required
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={newDress.price}
          onChange={handleChange}
          required
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={newDress.location}
          onChange={handleChange}
          required
        />
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={newDress.image}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={newDress.description}
          onChange={handleChange}
          required
        />
        <button type="submit">
          Save changes
        </button>
      </form>
    </div>
  )
}
