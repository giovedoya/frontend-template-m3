import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dressService from "../services/dressService";
import { Link } from "react-router-dom";

export default function DressDetail() {
  const { dressId } = useParams();
  const [ dress, setDress ] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const getDress = async () => {
    try {
      const response = await dressService.getDress(dressId);
      setDress(response);
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDress();
       // eslint-disable-next-line
  }, [dressId]);

  const handleDelete = async (dressId) => {
    try {
      const deletedDress = await dressService.deletedDress(dressId);
      setDress(deletedDress);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      getDress();
    }
  };

  return (
    <div>
      <h2>Dress details</h2>
      {dress !== null ? (
        <>
          <h3>{dress.name}</h3>
          <p>{dress.designer}</p>
          <img src={dress.image} alt={dress.title} />
          <p>{dress.description}</p>
          <div>
            <button>
              <Link to={`/edit/${dress._id}`}>Edit dress</Link>
            </button>
            <button type="button" onClick={() => handleDelete(dress._id)}>
              Delete dress
            </button>
          </div>
        </>
      ) : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
