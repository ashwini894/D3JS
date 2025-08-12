import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface Props {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export default function LineChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}: Props) {
  const gxRef = useRef<SVGGElement | null>(null);
  const gyRef = useRef<SVGGElement | null>(null);

  // X scale — index-based
  const x = d3
    .scaleLinear<number, number>()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);

  // Y scale — avoid undefined in extent
  const yDomain = d3.extent(data) as [number, number]; // Cast to remove undefined
  const y = d3
    .scaleLinear<number, number>()
    .domain(yDomain)
    .range([height - marginBottom, marginTop]);

  // Line generator with tuple type for data points
  const line = d3
    .line<[number, number]>()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

  // Convert your data array into [index, value] tuples
  const lineData: [number, number][] = data.map((d, i) => [i, d]);

  // Render axes
  useEffect(() => {
    if (gxRef.current) {
      d3.select<SVGGElement, unknown>(gxRef.current).call(d3.axisBottom(x));
    }
    if (gyRef.current) {
      d3.select<SVGGElement, unknown>(gyRef.current).call(d3.axisLeft(y));
    }
  }, [x, y]);

  return (
    <svg width={width} height={height}>
      {/* X axis */}
      <g ref={gxRef} transform={`translate(0,${height - marginBottom})`} />
      {/* Y axis */}
      <g ref={gyRef} transform={`translate(${marginLeft},0)`} />
      {/* Line path */}
      <path
        fill="none"
        stroke="steelblue"
        strokeWidth="1.5"
        d={line(lineData) || undefined}
      />
      {/* Data points */}
      <g fill="white" stroke="steelblue" strokeWidth="1.5">
        {lineData.map(([xi, yi], i) => (
          <circle key={i} cx={x(xi)} cy={y(yi)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
