"use client";

import { KnowledgeGraph } from "@/lib/store/types";
import { FC } from "react";

const GraphView: FC<KnowledgeGraph> = (graph) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold">Knowledge Graph</h2>
      <ul className="mt-2">
        {graph.relations.map((rel, i) => {
          // Find entities by id to show their names (optional)
          const fromEntity = graph.entities.find((e) => e.id === rel.source);
          const toEntity = graph.entities.find((e) => e.id === rel.target);

          return (
            <li key={i}>
              {fromEntity?.name ?? rel.source} —[{rel.type}]→{" "}
              {toEntity?.name ?? rel.target}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GraphView;
