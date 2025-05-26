import { ExplanatoryChain } from "@/lib/store/types";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

interface Props {
  chain: ExplanatoryChain;
}

export default function KnowledgeGraphWith({ chain }: Props) {
  const nodes: Node[] = chain.entities.map((entity, index) => ({
    id: entity.id,
    type: "default",
    data: { label: `${entity.label}: ${entity.name}` },
    position: { x: 100 + index * 100, y: 100 + index * 50 },
    style: {
      background:
        entity.type === "problem"
          ? "#e3f2fd"
          : entity.type === "step"
          ? "#fff3e0"
          : entity.type === "conclusion"
          ? "#e8f5e9"
          : "#f3e5f5",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #aaa",
    },
  }));

  const edges: Edge[] = chain.relations.map((rel, idx) => ({
    id: `e${idx}`,
    source: rel.source,
    target: rel.target,
    label: rel.name,
    type: "smoothstep",
    animated: true,
    style: { stroke: "#2196f3" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }));

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
