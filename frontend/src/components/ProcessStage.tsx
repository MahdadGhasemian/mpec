"use client";

import {
  getCourseContent,
  getCoursePattern,
  getExampleContent,
  getProcessStage,
  getTestQuestion,
  setCourseContent,
  setCoursePattern,
  setExampleContent,
  setExplanatoryChain,
  setProcessStage,
  setTestQuestion,
  setTestSolution,
} from "@/lib/store/features/appSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/services/api";

const stepData = [
  {
    id: 1,
    label: "Course Pattern Extraction",
    placeholder: "Paste LaTeX course content here...",
  },
  {
    id: 2,
    label: "Apply Pattern to Example",
    placeholder: "Paste example LaTeX here...",
  },
  {
    id: 3,
    label: "Solve Test Question",
    placeholder: "Enter test question (e.g. 4 + 2)",
  },
];

export default function ProcessStage() {
  // ** Global Store
  const dispatch = useDispatch();
  const processStage = useSelector(getProcessStage);
  const courseContent = useSelector(getCourseContent);
  const coursePattern = useSelector(getCoursePattern);
  const exampleContent = useSelector(getExampleContent);
  const testQuestion = useSelector(getTestQuestion);

  // for fade animation, track fade state
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [displayedTab, setDisplayedTab] = useState(processStage);

  useEffect(() => {
    if (processStage !== displayedTab) {
      // fade out current content, then switch tab, then fade in
      setFadeState("fade-out");

      const timeout = setTimeout(() => {
        setDisplayedTab(processStage);
        setFadeState("fade-in");
      }, 350); // match CSS animation duration

      return () => clearTimeout(timeout);
    }
  }, [processStage, displayedTab]);

  const handleNextStep = async () => {
    if (processStage === 1) {
      const response = await api.extract({ courseContent });

      dispatch(setCoursePattern(response.coursePattern));
      dispatch(setProcessStage(2));
    } else if (processStage === 2) {
      if (!coursePattern) return;

      const response = await api.applyPattern({
        coursePattern,
        exampleContent,
      });
      dispatch(setExplanatoryChain(response.explanatoryChain));
      dispatch(setProcessStage(3));
    } else if (processStage === 3) {
      if (!coursePattern) return;

      const response = await api.solve({
        coursePattern,
        exampleContent,
        testQuestion,
      });
      dispatch(setTestSolution(response.solution));
    }
  };

  const handleContentChange = (content: string) => {
    if (processStage === 1) {
      dispatch(setCourseContent(content));
    } else if (processStage === 2) {
      dispatch(setExampleContent(content));
    } else if (processStage === 3) {
      dispatch(setTestQuestion(content));
    }
  };

  return (
    <div className="mx-auto">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300">
        {stepData.map((step) => (
          <button
            key={step.id}
            onClick={() => dispatch(setProcessStage(step.id))}
            className={`
              flex-1 text-center py-3 font-medium text-sm
              ${
                processStage === step.id
                  ? "border-b-4 border-primary text-primary"
                  : "dark:text-white text-gray-600 hover:text-primary"
              }
              transition-colors duration-300
            `}
            aria-selected={processStage === step.id}
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
          p-4 border rounded-b-md
          dark:border-gray-700
          dark:bg-[color:var(--surface)]
          bg-white
          transition-opacity duration-250 h-[320px]
          ${fadeState === "fade-in" ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {stepData.map(
              (step) =>
                displayedTab === step.id && (
                  <div
                    key={step.id}
                    role="tabpanel"
                    id={`tabpanel-${step.id}`}
                    aria-labelledby={`tab-${step.id}`}
                    className={`
                      text-base
                      dark:text-white
                      text-gray-700
                      space-y-4
                    `}
                  >
                    <textarea
                      className="w-full border p-2 mt-2 h-[200px] rounded-md"
                      placeholder={step.placeholder}
                      value={
                        step.id === 1
                          ? courseContent
                          : step.id === 2
                          ? exampleContent
                          : step.id === 3
                          ? testQuestion
                          : ""
                      }
                      onChange={(e) => handleContentChange(e.target.value)}
                    />
                  </div>
                )
            )}
          </div>
          <div className="mt-4">
            <button
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
              onClick={handleNextStep}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
