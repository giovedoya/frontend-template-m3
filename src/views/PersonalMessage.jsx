import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import messageService from "../services/messageService";

export default function DressDetail() {
  const { messageId } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const getMessage = async () => {
    try {
      const response = await messageService.getMessage(messageId);
      setMessage(response);
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line
  }, [messageId]);

  return (
    <div className="container mx-auto py-6">
      {message !== null ? (
        <div className="flex flex-wrap mb-8">
          <div className="flex flex-col justify-between w-full sm:w-1/2">
            <div className="mb-6">
              <p>{message.subject}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Characteristics
              </h2>
              <ul>
                <li className="mb-2">Message: {message.message} </li>
                <li className="mb-2">Phone: {message.phone} </li>
              </ul>
            </div>
            <div className="mb-6 flex justify-between items-center"></div>
          </div>
        </div>
      ) : null}
      {error ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
}
