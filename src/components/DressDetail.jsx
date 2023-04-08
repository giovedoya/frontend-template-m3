import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dressService from "../services/dressService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NewReview from "./NewReview";

export default function DressDetail() {
  const { dressId } = useParams();
  const [ dress, setDress ] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  
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
      const deletedDress = await dressService.deleteDress(dressId);
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
      {dress !== null ? (
  <>
    <h3>{dress.name}</h3>
    <p>Disigner {dress.designer}</p>
    <img className="rounded-lg w-1/5"  src={dress.image} alt={dress.title} />
    <h2>The Dress</h2>
    <p>The Dress {dress.description}</p>
    <h2>characteristics</h2>
    <ul>
      <li>{dress.neckline}</li>
      <li>{dress.court}</li>
      <li>{dress.color}</li>
      <li>{dress.size}</li>
      <li>{dress.long}</li>
      <li>{dress.price}</li>
      <li>{dress.location}</li>
    </ul>
    <div>
      {user && user._id === dress.seller._id && (
        <>
          {/* <button>
            <Link to={`/dress/newdress`}>Create</Link>
          </button> */}
          <button>
            <Link to={`/dress/${dress._id}/edit`}>Edit dress</Link>
          </button>
          <button type="button" onClick={() => handleDelete(dress._id)}>
            Delete dress
          </button>
        </>
      )}
      <NewReview />
    </div>
  </>
) : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
