import React from "react";

const User = ({ username }) => {
  return (
    <div
      style={{
        marginLeft: 10,
        border: "1px solid #7f7f7f",
        padding: 8,
        borderRadius: 10,
      }}
    >
      <p style={{ color: "white" }}>{username}</p>
    </div>
  );
};

export default User;
