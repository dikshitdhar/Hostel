import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Card } from "@material-tailwind/react";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5800/getData")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteMessage = async (id) => {
    let result = await fetch(`http://localhost:5800/deleteMessage/${id}`, {
      method: "PUT",
    });
    result = await result.json();
    if (result) {
      alert(" deleted");
    }

    console.warn(id);
  };
  return (
    <>
      <Navbar />
      <div className="w-50 mx-auto">
      <Card className="h-70 w-70 my-10 overflow-scroll p-5 bg-gray-200">
          
            {messages.map(
              (message, index) =>
                message.Text && (
                  <div className="rounded-3xl bg-gray-100 py-2 px-3 mt-2 ">
                    <div className="flex justify-evenly space-x-5 text-xs">
                      <p>{message.Name}</p>
                      <p>{message.phoneNumber}</p>
                      <p>{message.roomNumber}-{message.Block}</p>
                    </div>
                    <div className="text-base flex justify-between ">
                      {message.Text}
                      <button
                      className="bg-gray-300 px-2 py-2 rounded-3xl hover:bg-black hover:text-white"
                      type="submit"
                      onClick={() => deleteMessage(message._id)}
                    >
                      Delete
                    </button>
                    </div>
                   
                  </div>

        
                )
            )}
        
       
      </Card>
      </div>
    </>
  );
}

