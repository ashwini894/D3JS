import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import type { HierarchyNode } from "d3-hierarchy";

type HierarchyData = {
  name: string;
  value?: number;
  children?: HierarchyData[];
};

interface Props {
  data: HierarchyData;
  width?: number;
  barHeight?: number;
}

const HierarchicalBarChart: React.FC<Props> = ({ data, width = 800, barHeight = 25 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [node, setNode] = useState<HierarchyNode<HierarchyData>>();

  useEffect(() => {
    if (!data) return;

    const root = d3.hierarchy(data)
      .sum(d => d.value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    setNode(root);
  }, [data]);

  const handleClick = (d: HierarchyNode<HierarchyData>) => {
    if (!d.children) return;
    setNode(d);
  };

  const handleBackgroundClick = () => {
    if (node?.parent) setNode(node.parent);
  };

  return (
    <svg ref={svgRef} width={width} height={(node ? node.height : 0) * barHeight * 1.2 + 40}>
      {node && (
        <g transform="translate(0, 20)">
          <rect
            width={width}
            height={node.height * barHeight * 1.2 + 20}
            fill="transparent"
            onClick={handleBackgroundClick}
          />
          {node.children && node.children.map((child, i) => (
            <g
              key={i}
              transform={`translate(0, ${i * barHeight * 1.2})`}
              style={{ cursor: child.children ? 'pointer' : 'default' }}
              onClick={() => handleClick(child)}
            >
              <text x={-6} y={barHeight / 2} dy=".35em" textAnchor="end">
                {child.data.name}
              </text>
              <rect
                x="0"
                y="0"
                height={barHeight}
                width={((child.value ?? 0) / (node.value ?? 1)) * width}
                fill={child.children ? 'steelblue' : '#aaa'}
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
};

export default HierarchicalBarChart;
