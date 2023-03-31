import React, { useEffect, useRef, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../actions.js";
import User from "../components/User";
import Text from "../components/Text";
import { initSocket } from "../socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Room = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const navigator = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);

  const handleErrors = (err) => {
    console.log(err);
    navigator("/");
  };

  const leaveRoom = () => {
    navigator("/");
  };

  if (!location.state || !location.state?.username) {
    <Navigate to="/" />;
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast(`${username} has joined the room!`, { theme: "light" });
            console.log("all clients", clients);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast(`${username} has left the room!`, { theme: "light" });
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  return (
    <div
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", padding: 15, alignItems: "center" }}>
        <p style={{ color: "white", fontSize: 17 }}>Users in room:</p>
        {clients.map((client, index) => (
          <User key={index} username={client.username} />
        ))}
        <button
          onClick={leaveRoom}
          style={{ marginLeft: 25, padding: 8, borderRadius: 5 }}
        >
          Leave
        </button>
      </div>
      <div>
        <Text
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Room;
