import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function BarChart() {
  const ref = useRef();
  const [data, setData] = useState([10, 20, 30, 40, 50]);

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", 300)
      .attr("height", 150);

    const bars = svg.selectAll("rect")
      .data(data);

    bars.enter()
      .append("rect")
      .merge(bars)
      .transition()
      .duration(500)
      .attr("x", (_, i) => i * 60)
      .attr("y", d => 150 - d * 3)
      .attr("width", 50)
      .attr("height", d => d * 3)
      .attr("fill", "steelblue");

    bars.exit().remove();
  }, [data]);

  const updateData = () => {
    const newData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 5);
    setData(newData);
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Animated Bar Chart</h2>
      <button onClick={updateData} style={{ marginBottom: "10px" }}>
        Update Data
      </button>
      <svg ref={ref}></svg>
    </div>
  );
}
