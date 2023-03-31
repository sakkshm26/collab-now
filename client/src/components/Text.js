import React, { useEffect, useRef, useState } from "react";
import ACTIONS from "../actions";

const Text = ({ socketRef, roomId, onCodeChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onCodeChange(e.target.value);
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: e.target.value,
    });
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <textarea
      onChange={handleChange}
      style={{
        height: "100vh",
        width: "96vw",
        backgroundColor: "#232323",
        color: "#00b6b6",
        fontSize: 18,
        padding: 20,
        lineHeight: 1.2,
      }}
      value={value}
      placeholder="Start writing here!"
    ></textarea>
  );
};

export default Text;
