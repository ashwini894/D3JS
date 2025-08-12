import { useRef, useEffect } from "react";
import * as d3 from "d3";

// Define type for each point
type Point = {
  x: number;
  y: number;
};

// Props type
interface ScatterPlotProps {
  data: Point[];
  width?: number;
  height?: number;
}

const ScatterPlot = ({ data, width = 500, height = 400 }: ScatterPlotProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f9f9f9")
      .style("border", "1px solid #ccc");

    svg.selectAll("*").remove(); // Clear old chart

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const xScale = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.x) ?? 0) + 5])
      .range([0, innerWidth]);

    // Y scale
    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.y) ?? 0) + 5])
      .range([innerHeight, 0]);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Y axis
    g.append("g").call(d3.axisLeft(yScale));

    // Circles
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 6)
      .style("fill", "#69b3a2");

    // Labels
    g.selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.x) + 8)
      .attr("y", (d) => yScale(d.y) + 4)
      .text((d) => `(${d.x}, ${d.y})`)
      .style("font-size", "10px")
      .style("fill", "#333");
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
