import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({ username: "", roomId: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const joinRoom = (e) => {
    e.preventDefault();

    navigate(`room/${data.roomId}`, {
      state: { username: data.username },
    });
  };

  const createNewRoom = (e) => {
    const id = uuidV4();
    setData((prev) => ({ ...prev, roomId: id }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <form
        onSubmit={joinRoom}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <input
          name="roomId"
          value={data.roomId}
          onChange={handleChange}
          placeholder="Enter Room ID"
          style={{
            margin: 20,
            fontSize: 17,
            padding: 10,
            width: "40vw",
            backgroundColor: "#e5e5e5",
          }}
          required
        />
        <input
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Enter Username"
          style={{
            margin: 20,
            fontSize: 17,
            padding: 10,
            width: "40vw",
            backgroundColor: "#e5e5e5",
          }}
          required
        />
        <button
          type="submit"
          style={{ margin: 20, fontSize: 17, padding: 10, width: 100 }}
        >
          Join!
        </button>
      </form>
      <h3 style={{ color: "white" }}>OR</h3>
      <button
        onClick={createNewRoom}
        style={{ margin: 20, fontSize: 17, padding: 10, width: 200 }}
      >
        Create New Room
      </button>
    </div>
  );
};

export default Home;
