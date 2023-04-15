import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dressService from "../services/dressService";

export default function EditDress() {
  const { dressId } = useParams();
  const [dress, setDress] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

 
  const getDress = async () => {
    try {
      const response = await dressService.getDress(dressId);
      setDress({
        ...response,
        name: response.name || '',
        neckline: response.neckline || '',
        court: response.court || '',
        long: response.long || '',
        color: response.color || '',
        size: response.size || '',
        designer: response.designer || '',
        description: response.description || '',
        price: response.price || '',
        location: response.location || '',
        image: response.image || '',
      });
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  
  useEffect(() => {
    getDress();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setDress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  
  const handleFileUpload = (e) => {
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);     
    dressService
      .uploadImage(uploadData)
      .then(response => {
        setIsUploading(false);
        setImageUrl(response.fileUrl);
      })
      .catch(err => {
        setIsUploading(false); 
        console.log("Error while uploading the file: ", err)
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {    
      const updatedDress = {
        neckline: dress.neckline,
        court: dress.court,
        long: dress.long,
        color: dress.color,
        size: dress.size,
        designer: dress.designer,
        name: dress.name,
        description: dress.description,
        price: dress.price,
        location: dress.location,
        image: imageUrl,
      };      
      await dressService.editDress(dressId, updatedDress);
      navigate(`/dress/${dressId}`);
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
  };
   

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Enter the dress you want to sell</h2>
      {error && <p>Something went wrong. Couldn't find your dress</p>}
      {dress && <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="font-semibold">
            Dress Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={dress.name}
            onChange={handleChange}
            required
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="neckline" className="font-semibold">
            Neckline
          </label>
          <select
            name="neckline"
            id="neckline"
            value={dress.neckline}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value="" disabled>
              Select an option
            </option>
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
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="court" className="font-semibold">
            Court:
          </label>
          <select
            name="court"
            id="court"
            value={dress.court}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="princess">Princess</option>
            <option value="straight">Straight</option>
            <option value="evaded">Evaded</option>
            <option value="in A">In A</option>
            <option value="siren">Siren</option>
            <option value="empire">Empire</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="long" className="font-semibold">
            Long
          </label>
          <select
            name="long"
            id="long"
            value={dress.long}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="long">Long</option>
            <option value="half">Half</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Color:</label>
          <select
            type="text"
            name="color"
            value={dress.color}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value="" disabled>
              Select an option
            </option>
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
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Size:</label>
          <select
            type="number"
            name="size"
            value={dress.size}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value="" disabled>
              Select an option
            </option>
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
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Designer</label>
          <input
            type="text"
            name="designer"
            value={dress.designer}
            onChange={handleChange}
            required
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={dress.price}
            onChange={handleChange}
            required
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={dress.location}
            onChange={handleChange}
            required
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => handleFileUpload(e)}
          />
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={dress.description}
            onChange={handleChange}
            required
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          > {isUploading ? 'loading...' : 'Save changes'}

          </button>
        </div>
      </form>}
    </div>
  );
}
