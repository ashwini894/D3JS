import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { partition } from 'd3-hierarchy';

const HierarchicalBarChart = ({ data, width = 800, barHeight = 25 }) => {
  const svgRef = useRef();
  const [node, setNode] = useState();

  useEffect(() => {
    if (!data) return;

    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const layout = partition()
      .size([width, root.height * (barHeight * 1.2)]);

    layout(root);
    setNode(root);

  }, [data, width, barHeight]);

  const handleClick = d => {
    if (!d.children) return;
    setNode(d);
  };

  const handleBackgroundClick = () => {
    if (node.parent) setNode(node.parent);
  };

  return (
    <svg width={width} height={(node ? node.height : 0) * barHeight * 1.2 + 40}>
      {node && (
        <g transform="translate(0, 20)">
          <rect width={width} height={node.height * barHeight * 1.2 + 20}
                fill="transparent" onClick={handleBackgroundClick} />
          {node.children && node.children.map((child, i) => (
            <g key={i} transform={`translate(0, ${i * barHeight * 1.2})`} 
               style={{ cursor: child.children ? 'pointer' : 'default' }}
               onClick={() => handleClick(child)}>
              <text x={-6} y={barHeight / 2} dy=".35em" textAnchor="end">
                {child.data.name}
              </text>
              <rect x="0" y="0" height={barHeight}
                    width={(child.value / node.value) * width}
                    fill={child.children ? 'steelblue' : '#aaa'} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
};

export default HierarchicalBarChart;
