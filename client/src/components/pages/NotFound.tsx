import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "48px",
    color: "#333",
    marginBottom: "20px",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#666",
    marginBottom: "30px",
  };

  const linkStyle: React.CSSProperties = {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <p style={textStyle}>Сторінку не знайдено</p>
      <Link to="/" style={linkStyle}>
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFound;
