import {
  ExplanatoryChain,
  Entity,
  Relation,
  GraphVisualizationConfig,
} from "@/lib/store/types";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

interface Props {
  chain: ExplanatoryChain;
  config: GraphVisualizationConfig;
}

export default function KnowledgeGraph({ chain, config }: Props) {
  const nodes: Node[] = chain.entities.map((entity, index) => {
    const color = config.nodes.colors[entity.type];
    const shape = config.nodes.shapes[entity.type];

    const baseStyle: React.CSSProperties = {
      background: color,
      padding: 10,
      borderRadius: shape === "circle" ? "50%" : shape === "rectangle" ? 8 : 0,
      border: "1px solid #aaa",
      width: config.nodes.defaultSize,
      height: config.nodes.defaultSize,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    };

    if (shape === "diamond") {
      baseStyle.transform = "rotate(45deg)";
    }

    return {
      id: entity.id,
      type: "default",
      data: { label: `${entity.label}: ${entity.name}` },
      position: { x: 100 + index * 220, y: 100 + index * 100 },
      style: baseStyle,
    };
  });

  const edges: Edge[] = chain.relations.map((rel, idx) => {
    const color = config.edges.colors[rel.type];
    const styleType = config.edges.styles[rel.type];

    const lineStyle: React.CSSProperties = {
      stroke: color,
      strokeWidth: config.edges.defaultWidth,
      strokeDasharray:
        styleType === "dashed" ? "5,5" : styleType === "dotted" ? "2,2" : "0",
    };

    return {
      id: `e${idx}`,
      source: rel.source,
      target: rel.target,
      label: rel.name,
      type: "smoothstep",
      animated: true,
      style: lineStyle,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
  });

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "600px" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
