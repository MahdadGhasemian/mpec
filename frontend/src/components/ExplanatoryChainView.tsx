"use client";

import { ExplanatoryChain } from "@/lib/store/types";
import { FC } from "react";

const ExplanatoryChainView: FC<{ explanatoryChain: ExplanatoryChain }> = ({
  explanatoryChain,
}) => {
  return (
    <div
      className={`
      border p-4 rounded-md
      dark:border-gray-700
    `}
    >
      <h2
        className={`
        font-semibold text-lg mb-4
        dark:text-white
        text-gray-900
      `}
      >
        Explanatory Chain
      </h2>
      <ol className="list-decimal list-inside space-y-4">
        {explanatoryChain.steps.map((step) => (
          <li
            key={step.stepNumber}
            className={`
            p-3 rounded
            dark:bg-white/5
            bg-white
            dark:shadow-none
            shadow-sm
            dark:border-gray-700
            border
          `}
          >
            <p
              className={`
              font-semibold mb-1
              dark:text-white
              text-gray-900
            `}
            >
              Step {step.stepNumber}: {step.description}
            </p>
            <p
              className={`
              italic mb-1
              dark:text-white/90
              text-gray-700
            `}
            >
              Calculation: {step.calculation}
            </p>
            <p
              className={`
              dark:text-white/80
              text-gray-600
            `}
            >
              Reasoning: {step.reasoning}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default ExplanatoryChainView;
