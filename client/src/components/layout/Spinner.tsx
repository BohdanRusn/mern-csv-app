import React from "react";

const Spinner: React.FC = () => {
  const spinnerStyle: React.CSSProperties = {
    display: "block",
    margin: "20px auto",
    width: "50px",
    height: "50px",
    border: "5px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    borderTopColor: "#007bff",
    animation: "spin 1s ease-in-out infinite",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
