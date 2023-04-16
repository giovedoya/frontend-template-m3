import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import messageService from "../services/messageService";
import { FaTrash } from "react-icons/fa";

export default function ProfileViews() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const getMessages = async () => {
    try {
      const response = await messageService.getMessages();
      const filteredMessages = response.filter(
        (message) => message.sender._id !== user._id
      );
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error messages:", error);
    }
  };
  

  useEffect(() => {
    if (user) {
      getMessages();
    }
    // eslint-disable-next-line
  }, [user]);
  

  const handleDelete = async (messageId) => {
    try {
      const deleteMessage = await messageService.deletedMessage(messageId);
      setMessages(deleteMessage);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
        getMessages();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {messages &&
            messages.length === 0&& <p>You have no new messages</p>
        }
          {messages &&
            messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message._id}
                className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              >           
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Who I am: {message.subject}</h3>
                    <p className="mb-4">Message: {message.message}</p>
                    <p className="mb-4">Contact me... {message.phone}</p>
                  </div>
                  <div className="flex justify-end">                    
                    <button
                      className="px-4 py-2 text-black rounded-lg shadow-md hover:bg-red-700"
                      type="button"
                      onClick={() => handleDelete(message._id)}
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
