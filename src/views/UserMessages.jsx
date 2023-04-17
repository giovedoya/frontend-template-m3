import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import messageService from "../services/messageService";
import { FaTrash } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function ProfileViews() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

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
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      getMessages();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen rounded-lg">
      <div className="pt-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Someone is interested in your dress
        </h3>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {messages && messages.length === 0 && (
          <p className="text-center">No messages</p>
        )}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {messages &&
            messages.map((message) => (
              <div
                key={message._id}
                className="bg-white mb-4 shadow-md border border-gray-200 rounded hover:bg-gray-100"
              >
                <div className="p-4">
                  <h4 className="text-lg font-medium mb-2">
                    {message.subject}
                  </h4>
                  <p>
                    {" "}
                    <FiMail className="inline-block mr-2" />
                    {message.message}
                  </p>
                  <p>Phone: {message.phone}</p>
                  <p className="text-gray-500 mb-4">{message.body}</p>
                  <button
                    className="text-black py-2 px-4 rounded"
                    onClick={() => handleDelete(message._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
