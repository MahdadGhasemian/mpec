import { ExplanatoryChain, GraphVisualizationConfig } from "@/lib/store/types";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const Config: GraphVisualizationConfig = {
  nodes: {
    defaultSize: 120,
    colors: {
      problem: "#e3f2fd", // light blue
      step: "#fff3e0", // light orange
      conclusion: "#e8f5e9", // light green
      axiom: "#fce4ec", // light pink
      definition: "#ede7f6", // light purple
      operation: "#f3e5f5", // light lavender
    },
    shapes: {
      problem: "rectangle",
      step: "rectangle",
      conclusion: "rectangle",
      axiom: "diamond",
      definition: "circle",
      operation: "diamond",
    },
  },
  edges: {
    defaultWidth: 2,
    colors: {
      decomposes_to: "#2196f3", // blue
      applies: "#4caf50", // green
      evaluates_to: "#ff9800", // orange
    },
    styles: {
      decomposes_to: "solid",
      applies: "dashed",
      evaluates_to: "dotted",
    },
  },
  layout: {
    repulsion: 1000,
    attraction: 0.05,
    gravity: 0.1,
  },
};

interface Props {
  chain: ExplanatoryChain;
}

export default function KnowledgeGraphWithConfig({ chain }: Props) {
  const nodes: Node[] = chain.entities.map((entity, index) => {
    const color = Config.nodes.colors[entity.type];
    const shape = Config.nodes.shapes[entity.type];

    const baseStyle: React.CSSProperties = {
      background: color,
      padding: 10,
      borderRadius: shape === "circle" ? "50%" : shape === "rectangle" ? 8 : 0,
      border: "1px solid #aaa",
      width: Config.nodes.defaultSize,
      height: Config.nodes.defaultSize,
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
    const color = Config.edges.colors[rel.type];
    const styleType = Config.edges.styles[rel.type];

    const lineStyle: React.CSSProperties = {
      stroke: color,
      strokeWidth: Config.edges.defaultWidth,
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
