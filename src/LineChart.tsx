import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function LineChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gxRef = useRef(null);
  const gyRef = useRef(null);

  // Scales
  const x = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([height - marginBottom, marginTop]);

  // Line generator
  const line = d3.line()
    .x((_, i) => x(i))
    .y(d => y(d));

  // Render axes when scales change
  useEffect(() => {
    d3.select(gxRef.current).call(d3.axisBottom(x));
    d3.select(gyRef.current).call(d3.axisLeft(y));
  }, [x, y]);

  return (
    <svg width={width} height={height}>
      {/* X axis */}
      <g
        ref={gxRef}
        transform={`translate(0,${height - marginBottom})`}
      />
      {/* Y axis */}
      <g
        ref={gyRef}
        transform={`translate(${marginLeft},0)`}
      />
      {/* Line path */}
      <path
        fill="none"
        stroke="steelblue"
        strokeWidth="1.5"
        d={line(data)}
      />
      {/* Data points */}
      <g fill="white" stroke="steelblue" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
