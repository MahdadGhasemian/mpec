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
import { toast } from "react-hot-toast";

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

  // ** State
  const [loading, setLoading] = useState(false);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [displayedTab, setDisplayedTab] = useState(processStage);

  useEffect(() => {
    if (processStage !== displayedTab) {
      setFadeState("fade-out");

      const timeout = setTimeout(() => {
        setDisplayedTab(processStage);
        setFadeState("fade-in");
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [processStage, displayedTab]);

  const handleNextStep = async () => {
    setLoading(true);

    try {
      if (processStage === 1) {
        const response = await api.extract({ courseContent });
        if (!response.coursePattern) {
          throw new Error("Failed to extract course pattern");
        }
        dispatch(setCoursePattern(response.coursePattern));
        toast.success("Course pattern extracted successfully!");
      } else if (processStage === 2) {
        if (!coursePattern) {
          toast.error("Please extract course pattern first");
          return;
        }

        const response = await api.applyPattern({
          coursePattern,
          exampleContent,
        });
        if (!response.explanatoryChain) {
          throw new Error("Failed to apply pattern to example");
        }
        dispatch(setExplanatoryChain(response.explanatoryChain));
        toast.success("Pattern applied successfully!");
      } else if (processStage === 3) {
        if (!coursePattern) {
          toast.error("Please extract course pattern first");
          return;
        }

        const response = await api.solve({
          coursePattern,
          exampleContent,
          testQuestion,
        });
        if (!response.solution) {
          throw new Error("Failed to solve test question");
        }
        dispatch(setTestSolution(response.solution));
        toast.success("Test question solved successfully!");
      }

      if (processStage < 3) {
        dispatch(setProcessStage(processStage + 1));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
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
        {loading ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 p-4">
              <div className="h-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="h-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        ) : (
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
                className={`
                  w-full py-2 px-4
                  dark:bg-primary
                  dark:text-white
                  dark:hover:bg-secondary
                  bg-primary text-white
                  hover:bg-secondary
                  rounded-md
                  transition-colors
                `}
                onClick={handleNextStep}
                disabled={loading}
              >
                {loading ? "Processing..." : "Next Step"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
