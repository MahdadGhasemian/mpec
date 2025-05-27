"use client";

import { KnowledgeGraph } from "@/lib/store/types";
import { FC } from "react";

const GraphView: FC<KnowledgeGraph> = (graph) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Knowledge Graph</h2>
      <ul className="space-y-2">
        {graph.relations.map((rel, i) => {
          // Find entities by id to show their names (optional)
          const fromEntity = graph.entities.find((e) => e.id === rel.source);
          const toEntity = graph.entities.find((e) => e.id === rel.target);

          return (
            <li key={i} className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="flex-1">{fromEntity?.name ?? rel.source}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">[{rel.type}]</span>
                <span className="flex-1 text-right">{toEntity?.name ?? rel.target}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GraphView;
