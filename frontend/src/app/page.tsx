"use client";

import ExplanatoryChainView from "@/components/ExplanatoryChainView";
import KnowledgeGraphView from "@/components/KnowledgeGraphView";
import Steps from "@/components/Steps";
import { getTestSolution } from "@/lib/store/features/appSlice";
import { useSelector } from "react-redux";

export default function HomePage() {
  // ** Global Store
  const testSolution = useSelector(getTestSolution);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">MPEC Proof Reasoning Tool</h1>

      <Steps />

      {testSolution && (
        <div className="mt-4">
          <p>
            <strong>Answer:</strong> {testSolution.answer}
          </p>
          <KnowledgeGraphView chain={testSolution.explanatoryChain} />
          <ExplanatoryChainView
            explanatoryChain={testSolution.explanatoryChain}
          />
        </div>
      )}
    </div>
  );
}
