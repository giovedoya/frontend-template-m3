import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import profileService from "../services/profileService";
import dressService from "../services/dressService";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProfileViews() {
  const { user } = useAuth();
  const [dresses, setDresses] = useState([]);
  const navigate = useNavigate();

  const getdresses = async () => {
    try {
      const response = await profileService.getDressesOfUserInSession();
      setDresses(response);
    } catch (error) {
      console.error("Error dresses:", error);
    }
  };

  useEffect(() => {
    getdresses();
  }, []);

  const handleDelete = async (dressId) => {
    try {
      const deletedDress = await dressService.deleteDress(dressId);
      setDresses(deletedDress);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      getdresses();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">Username: {user.username}</p>
              <p className="text-gray-500">Email: {user.email}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Create a New Dress</h2>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">
                Are you ready to sell? It will only take a few minutes.
              </p>
              <Link
                to={`/dress/newdress`}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400"
              >
                Create a new dress
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Look at your messages</h2>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">
              Here you can see all the messages of interested people.
              </p>
              <Link
                to={`/message/messages`}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400"
              >
                Check your messages
              </Link>
            </div>
          </div>
          {user && user.role === "admin" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Create a new Post</h2>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-500">
                  Here you can create a new post to keep the brides informed.
                </p>
                <Link
                  to={`/post/newpost`}
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400"
                >
                  Create a new post
                </Link>
              </div>
            </div>
          )}
          {dresses &&
            dresses.length > 0 &&
            dresses.map((dress) => (
              <div
                key={dress._id}
                className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <img
                  className="rounded-lg w-full"
                  src={dress.image}
                  alt={dress.title}
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-4">{dress.designer}</h3>
                    <p className="mb-4">{dress.description.substring(0, 100)}...</p>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2  text-black rounded-lg shadow-md hover:bg-blue-700 mr-2">
                      <Link to={`/dress/${dress._id}/edit`}>
                        <FaEdit className="inline-block mr-2" />
                      </Link>
                    </button>
                    <button
                      className="px-4 py-2 text-black rounded-lg shadow-md hover:bg-red-700"
                      type="button"
                      onClick={() => handleDelete(dress._id)}
                    >
                      <FaTrash className="inline-block mr-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
