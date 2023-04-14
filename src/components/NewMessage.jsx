import React, { useState } from "react";
import messageService from "../services/messageService";
import { useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function NewMessage() {
  const initialState = {
    subject: "",
    message: "",
    phone: "",
  };
  const { dressId } = useParams();
  const [newMessage, setNewMessage] = useState(initialState);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleChange = (e) => {
    setNewMessage((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageNew = await messageService.createMessage(dressId, {
        ...newMessage,
        dressId: dressId,
      });

      if (messageNew && messageNew._id) {
        setError("");
        setNewMessage(initialState);
      } else {
        setError("Couldn't create message");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto max-w-md p-4">
      <h2>Contact Seller</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {error && (
          <p className="text-red-500">{`Something went wrong. Couldn't find your message`}</p>
        )}
        <div>
          <label htmlFor="subject" className="font-semibold mb-1 block">
          I'm interested
          </label>
          <input
            type="text"
            name="subject"
            value={newMessage.subject}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="message" className="font-semibold mb-1 block">
            Message
          </label>
          <textarea
            name="message"
            value={newMessage.message}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-semibold mb-1 block">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={newMessage.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
