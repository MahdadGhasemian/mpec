"use client";

import ExplanatoryChainView from "@/components/ExplanatoryChainView";
import KnowledgeGraphView from "@/components/KnowledgeGraphView";
import ProcessStage from "@/components/ProcessStage";
import { getTestSolution } from "@/lib/store/features/appSlice";
import { useSelector } from "react-redux";

export default function HomePage() {
  // ** Global Store
  const testSolution = useSelector(getTestSolution);

  return (
    <div className="space-y-6">

      <ProcessStage />

      {testSolution && (
        <div className="space-y-6">
          <div className="p-4 border rounded-lg bg-white dark:bg-[color:var(--surface)]">
            <p className="font-semibold">
              <strong>Answer:</strong> {testSolution.answer}
            </p>
            <KnowledgeGraphView chain={testSolution.explanatoryChain} />
            <ExplanatoryChainView
              explanatoryChain={testSolution.explanatoryChain}
            />
          </div>
        </div>
      )}
    </div>
  );
}
