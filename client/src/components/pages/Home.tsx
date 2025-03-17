import React from "react";
import FileUpload from "../data/FileUpload";
import DataTable from "../data/DataTable";

const Home: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>CSV Data Viewer</h1>
      <FileUpload />
      <DataTable />
    </div>
  );
};

export default Home;
