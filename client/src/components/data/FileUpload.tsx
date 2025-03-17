import React, { useState } from "react";
import { useData } from "../../context/dataContext";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { uploadCSV, loading } = useData();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        setFileError("Будь ласка, виберіть файл з розширенням .csv");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setFileError(null);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setFileError("Будь ласка, виберіть файл для завантаження");
      return;
    }

    try {
      await uploadCSV(file);
      setFile(null);
      const fileInput = document.getElementById("csv-file") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const containerStyle: React.CSSProperties = {
    margin: "20px 0",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const fileInputContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    marginTop: "5px",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmit} style={formStyle}>
        <div style={fileInputContainerStyle}>
          <input id="csv-file" type="file" accept=".csv" onChange={onChange} />
          <button type="submit" style={buttonStyle} disabled={loading || !file}>
            {loading ? "Завантаження..." : "Завантажити CSV"}
          </button>
        </div>
        {fileError && <div style={errorStyle}>{fileError}</div>}
        {file && <div>Вибрано файл: {file.name}</div>}
      </form>
    </div>
  );
};

export default FileUpload;
