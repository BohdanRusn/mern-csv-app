import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { DataItem, DataContextType } from "../types";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/data");
      setData(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadCSV = useCallback(
    async (file: File) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("/api/data/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await fetchData();
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error uploading file");
        setLoading(false);
      }
    },
    [fetchData],
  );

  const contextValue = useMemo(
    () => ({
      data,
      loading,
      error,
      fetchData,
      uploadCSV,
    }),
    [data, loading, error, fetchData, uploadCSV],
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
