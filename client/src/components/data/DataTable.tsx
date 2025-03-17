import React, { useEffect, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { useData } from "../../context/dataContext";
import Spinner from "../layout/Spinner";

const DataTable: React.FC = () => {
  const { data, loading, error, fetchData } = useData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const headers =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "_id" && key !== "__v")
      : [];

  if (loading) return <Spinner />;
  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        Немає даних для відображення. Завантажте CSV файл.
      </div>
    );
  }

  const ROW_HEIGHT = 35;
  const TABLE_HEIGHT = 500;

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = data[index];
    return (
      <div
        style={{
          ...style,
          display: "flex",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        {headers.map((header) => (
          <div
            key={header}
            style={{
              flex: 1,
              padding: "8px",
              borderRight: "1px solid #dee2e6",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              backgroundColor: "white",
            }}
            title={String(item[header])}
          >
            {String(item[header])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        margin: "20px 0",
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {headers.map((header) => (
          <div
            key={header}
            style={{
              flex: 1,
              padding: "10px",
              fontWeight: "bold",
              borderRight: "1px solid #dee2e6",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={header}
          >
            {header}
          </div>
        ))}
      </div>

      <div style={{ minWidth: "fit-content" }}>
        <List
          height={TABLE_HEIGHT}
          itemCount={data.length}
          itemSize={ROW_HEIGHT}
          width="100%"
        >
          {Row}
        </List>
      </div>

      <div
        style={{
          padding: "10px",
          borderTop: "1px solid #dee2e6",
          backgroundColor: "#f8f9fa",
        }}
      >
        Всього записів: {data.length}
      </div>
    </div>
  );
};

export default DataTable;
