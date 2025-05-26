"use client";

import { useState } from "react";
import ExplanatoryChainView from "@/components/ExplanatoryChainView";
import api from "@/services/api";
import { ExplanatoryChain, GraphVisualizationConfig } from "@/lib/store/types";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoursePattern,
  getExampleContent,
  getTestQuestion,
  setTestQuestion,
} from "@/lib/store/features/appSlice";
import KnowledgeGraph from "./KnowledgeGraph";

const graphConfig: GraphVisualizationConfig = {
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

export default function SolveTestQuestionTab() {
  // ** Global Store
  const dispatch = useDispatch();
  const coursePattern = useSelector(getCoursePattern);
  const testQuestion = useSelector(getTestQuestion);
  const exampleContent = useSelector(getExampleContent);

  const [solution, setSolution] = useState<{
    answer: string;
    explanatoryChain: ExplanatoryChain;
  } | null>(null);

  const handleSolveQuestion = async () => {
    if (!coursePattern) return;

    const response = await api.solve({
      coursePattern,
      exampleContent,
      testQuestion,
    });

    console.log(response.solution);

    setSolution(response.solution);
  };

  return (
    <section>
      <input
        className="w-full border p-2 mt-2"
        placeholder="Enter test question (e.g. 4 + 2)"
        value={testQuestion}
        onChange={(e) => dispatch(setTestQuestion(e.target.value))}
      />
      <button
        onClick={handleSolveQuestion}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Solve Question
      </button>
      {solution && (
        <div className="mt-4">
          <p>
            <strong>Answer:</strong> {solution.answer}
          </p>
          <KnowledgeGraph chain={solution.explanatoryChain} config={graphConfig} />

          <ExplanatoryChainView explanatoryChain={solution.explanatoryChain} />
        </div>
      )}
    </section>
  );
}
