import { ExplanatoryChain } from "@/lib/store/types";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 80;

function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" | "BT" | "RL" = "LR"
) {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: x - nodeWidth / 2,
        y: y - nodeHeight / 2,
      },
      // Required for smooth transitions:
      positionAbsolute: { x: x - nodeWidth / 2, y: y - nodeHeight / 2 },
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
    };
  });

  return { nodes: layoutedNodes, edges };
}

interface Props {
  chain: ExplanatoryChain;
}

export default function KnowledgeGraphWithDagre({ chain }: Props) {
  const rawNodes: Node[] = chain.entities.map((entity) => ({
    id: entity.id,
    type: "default",
    data: { label: `${entity.label}: ${entity.name}` },
    position: { x: 0, y: 0 }, // Dagre will handle position
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

  const rawEdges: Edge[] = chain.relations.map((rel, idx) => ({
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

  // const { nodes, edges } = getLayoutedElements(rawNodes, rawEdges, "TB");
  const { nodes, edges } = getLayoutedElements(rawNodes, rawEdges, "LR");

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        panOnDrag
        zoomOnScroll
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
