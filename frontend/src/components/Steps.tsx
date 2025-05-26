"use client";

import { getStage, setStage } from "@/lib/store/features/appSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoursePatternExtractionTab from "./CoursePatternExtractionTab";
import ApplyPatternToExampleTab from "./ApplyPatternToExampleTab";
import SolveTestQuestionTab from "./SolveTestQuestionTab";
// import { LoadingSpinner } from "./LoadingSpinner";

const stepData = [
  {
    id: 1,
    label: "Course Pattern Extraction",
    content: <CoursePatternExtractionTab />,
  },
  {
    id: 2,
    label: "Apply Pattern to Example",
    content: <ApplyPatternToExampleTab />,
  },
  { id: 3, label: "Solve Test Question", content: <SolveTestQuestionTab /> },
];

export default function Steps() {
  // ** Global Store
  const dispatch = useDispatch();
  const active = useSelector(getStage);

  // for fade animation, track fade state
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [displayedTab, setDisplayedTab] = useState(active);

  useEffect(() => {
    if (active !== displayedTab) {
      // fade out current content, then switch tab, then fade in
      setFadeState("fade-out");

      const timeout = setTimeout(() => {
        setDisplayedTab(active);
        setFadeState("fade-in");
      }, 350); // match CSS animation duration

      return () => clearTimeout(timeout);
    }
  }, [active, displayedTab]);

  return (
    <div className="mx-auto mt-10 p-4">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300">
        {stepData.map((step) => (
          <button
            key={step.id}
            onClick={() => dispatch(setStage(step.id))}
            className={`
              flex-1 text-center py-3 font-medium
              ${
                active === step.id
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }
              transition-colors duration-300
            `}
            aria-selected={active === step.id}
            role="tab"
            id={`tab-${step.id}`}
            aria-controls={`tabpanel-${step.id}`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* <LoadingSpinner size="medium" message="Loading content..." visible /> */}

      {/* Tab Content */}
      <div
        className={`
          p-4 border rounded-b-md border-gray-300 bg-white
          transition-opacity duration-250
          ${fadeState === "fade-in" ? "opacity-100" : "opacity-0"}
        `}
      >
        {stepData.map(
          (step) =>
            displayedTab === step.id && (
              <div
                key={step.id}
                role="tabpanel"
                id={`tabpanel-${step.id}`}
                aria-labelledby={`tab-${step.id}`}
                className="text-gray-700"
              >
                {step.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
