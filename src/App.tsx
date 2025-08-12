import { useState } from "react";

import './App.css'
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import HierarchicalBarChart from './HierarchicalBarChart';
import ScatterPlot from "./ScatterPlot";

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
  const scatterData = [
    { x: 5, y: 10 },
    { x: 15, y: 35 },
    { x: 25, y: 20 },
    { x: 35, y: 50 },
    { x: 45, y: 30 },
    { x: 55, y: 60 },
  ];


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

      {/* forth chart */}
      <div className="chart-container">
        <h2>Scatter Plot </h2>
        <div className="chart-box">
          <ScatterPlot data={scatterData} />
        </div>
      </div>

    </>
  )
}

export default App
