"use client";

import { FC } from "react";

interface GraphProps {
  graph: {
    entities: string[];
    relations: { from: string; to: string; type: string }[];
  };
}

const GraphView: FC<GraphProps> = ({ graph }) => {
  return (
    <div className="border p-4">
      <h2 className="font-semibold">Knowledge Graph</h2>
      <ul className="mt-2">
        {graph.relations.map((rel, i) => (
          <li key={i}>
            {rel.from} —[{rel.type}]→ {rel.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GraphView;
