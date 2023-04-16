import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import messageService from "../services/messageService";
import { FaTrash } from "react-icons/fa";

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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Someone is interested in your dress
        </h3>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {messages && messages.length === 0 && (
            <p className="text-gray-500 text-center">
              You have no new messages.
            </p>
          )}
          {messages &&
            messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message._id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-700 font-medium mb-2">Subject:</p>
                    <p className="text-gray-900 mb-4">{message.subject}</p>
                    <p className="text-gray-700 font-medium mb-2">Message:</p>
                    <p className="text-gray-900 mb-4">{message.message}</p>
                    <p className="text-gray-900 mb-4">{message.sender.usermane}</p>

                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-gray-700 font-medium mb-2">
                        Contact me at:
                      </p>
                      <p className="text-gray-900 mb-4">{message.phone}</p>
                    </div>
                    <div className="text-center">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => handleDelete(message._id)}
                      >
                        <FaTrash className="inline-block mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
