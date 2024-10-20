"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import { toast } from "sonner";

let socket; // Declare the socket variable outside the component

function MyMessages() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  useEffect(() => {
    // Initialize the socket connection
    socket = io();

    // Listen for incoming messages
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() && receiverEmail.trim()) {
      const newMessage = {
        text: input,
        timestamp: new Date().toLocaleTimeString(),
        user: session?.user?.email, // Ensure session exists
        receiverEmail,
      };

      // Emit the message to the server
      socket.emit("message", newMessage);
      // Optimistically add the message to the UI
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(""); // Clear the input field
    } else {
      // Optionally, you can add an alert or some feedback if input is empty
      toast.error("Please enter a message and a receiver's email.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 md:my-8 md:mx-16 border border-gray-300 rounded-lg">
      {/* Left Column: Email Input and Past Conversations */}
      <div className="w-1/4 p-4">
        <input
          type="email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Receiver's Email"
        />
        <div className="mt-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400">
              No conversations yet
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="my-2">
                <strong>
                  {msg.user === session?.user?.email ? "You" : msg.user}
                </strong>
                : {msg.text}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Chat Area */}
      <div className="w-3/4 flex flex-col p-4 bg-white shadow-lg rounded-lg">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start my-2 ${
                msg.user === session?.user?.email
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.user !== session?.user?.email && (
                <img
                  src="https://img.freepik.com/free-vector/c-letter-initial-colorful-gradient-design_474888-2655.jpg"
                  alt="User  Avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
              )}
              <div
                className={`p-3 rounded-lg shadow-md ${
                  msg.user === session?.user?.email
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field and Send Button */}
        <div className="flex items-center p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mr-5"
            placeholder="Type a message..."
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default MyMessages;
