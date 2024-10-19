"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function MyMessages() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        timestamp: new Date().toLocaleTimeString(),
        user: "You", // This can be dynamic based on the logged-in user
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:mx-16 md:my-10">
      <div className="flex-1 overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start my-2 ${
                msg.user === "You" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.user !== "You" && (
                <img
                  src="https://via.placeholder.com/40" // Placeholder for user avatar
                  alt="User  Avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
              )}
              <div
                className={`p-3 rounded-lg shadow-md ${
                  msg.user === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              {msg.user === "You" && (
                <img
                  src="https://via.placeholder.com/40" // Placeholder for user avatar
                  alt="User  Avatar"
                  className="w-10 h-10 rounded-full ml-2"
                />
              )}
            </div>
          ))
        )}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <Button
          onClick={handleSend}
          className="ml-2 bg-primary hover:bg--green-600 p-6
           text-white rounded-md transition duration-200"
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default MyMessages;
