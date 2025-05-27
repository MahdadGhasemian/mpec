"use client";

import ExplanatoryChainView from "@/components/ExplanatoryChainView";
import GraphView from "@/components/GraphView";
import KnowledgeGraphView from "@/components/KnowledgeGraphView";
import ProcessStage from "@/components/ProcessStage";
import { getCoursePattern, getExplanatoryChain, getTestSolution } from "@/lib/store/features/appSlice";
import { useSelector } from "react-redux";

export default function HomePage() {
  // ** Global Store
  const coursePattern = useSelector(getCoursePattern);
  const explanatoryChain = useSelector(getExplanatoryChain);
  const testSolution = useSelector(getTestSolution);

  return (
    <div className="space-y-6">

      <ProcessStage />

      {coursePattern && (
        <GraphView
          entities={coursePattern.entities}
          relations={coursePattern.relations}
        />
      )}

      {!testSolution && explanatoryChain && (
        <ExplanatoryChainView explanatoryChain={explanatoryChain} />
      )}

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
