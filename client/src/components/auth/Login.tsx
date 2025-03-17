import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { authState, login, clearErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      navigate("/");
    }

    return () => {
      if (authState.error) {
        clearErrors();
      }
    };
  }, [
    authState.isAuthenticated,
    authState.user,
    authState.error,
    navigate,
    clearErrors,
  ]);

  const { username, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/");
    }
  };

  const formContainerStyle: React.CSSProperties = {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    marginBottom: "10px",
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: "center" }}>Увійти в систему</h2>
      {authState.error && <div style={errorStyle}>{authState.error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Ім'я користувача"
            name="username"
            value={username}
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;
