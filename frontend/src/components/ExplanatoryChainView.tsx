"use client";

import { ExplanatoryChain } from "@/lib/store/types";
import { FC } from "react";

const ExplanatoryChainView: FC<{ explanatoryChain: ExplanatoryChain }> = ({ explanatoryChain }) => {
  return (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="font-semibold text-lg mb-4">Explanatory Chain</h2>
      <ol className="list-decimal list-inside space-y-4">
        {explanatoryChain.steps.map((step) => (
          <li key={step.stepNumber} className="bg-white p-3 rounded shadow-sm">
            <p className="font-semibold mb-1">
              Step {step.stepNumber}: {step.description}
            </p>
            <p className="italic text-gray-700 mb-1">Calculation: {step.calculation}</p>
            <p className="text-gray-600">Reasoning: {step.reasoning}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default ExplanatoryChainView;
