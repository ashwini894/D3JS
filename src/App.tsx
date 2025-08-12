import { useState } from "react";

import './App.css'
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import HierarchicalBarChart from './HierarchicalBarChart';

type HierarchyData = {
  name: string;
  value?: number;
  children?: HierarchyData[];
};

function App() {
  const [lineData, setLineData] = useState([10, 20, 15, 25, 30, 22, 18]);
  const sampleData: HierarchyData = {
    name: "root",
    children: [
      { name: "A", value: 100, children: [{ name: "A1", value: 60 }, { name: "A2", value: 40 }] },
      { name: "B", value: 80, children: [{ name: "B1", value: 50 }, { name: "B2", value: 30 }] },
      { name: "C", value: 50 }
    ]
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>D3.js Charts</h1>

        {/* First chart */}
        <div className="chart-container">
          <div className="chart-box">
            <BarChart />
          </div>
        </div>

        {/* Second chart */}
        <div className="chart-container">
          <h2>Line Chart</h2>
          <button
            onClick={() =>
              setLineData(lineData.map(() => Math.floor(Math.random() * 40) + 5))
            }
            style={{ marginTop: "10px" }}
          >
            Update Data
          </button>
          <div className="chart-box">
            <LineChart data={lineData} />
          </div>
        </div>

        {/* Third chart */}
        <div className="chart-container">
          <h2>Hierarchical Bar Chart</h2>
          <div className="chart-box">
            <HierarchicalBarChart data={sampleData} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
