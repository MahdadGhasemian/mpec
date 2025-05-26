"use client";

import api from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoursePattern,
  getExampleContent,
  getTestQuestion,
  setTestQuestion,
  setTestSolution,
} from "@/lib/store/features/appSlice";

export default function SolveTestQuestionTab() {
  // ** Global Store
  const dispatch = useDispatch();
  const coursePattern = useSelector(getCoursePattern);
  const testQuestion = useSelector(getTestQuestion);
  const exampleContent = useSelector(getExampleContent);

  const handleSolveQuestion = async () => {
    if (!coursePattern) return;

    const response = await api.solve({
      coursePattern,
      exampleContent,
      testQuestion,
    });

    console.log(response.solution);

    dispatch(setTestSolution(response.solution));
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
      {/* {solution && (
        <div className="mt-4">
          <p>
            <strong>Answer:</strong> {solution.answer}
          </p>
          <KnowledgeGraphView chain={solution.explanatoryChain} />
          <ExplanatoryChainView explanatoryChain={solution.explanatoryChain} />
        </div>
      )} */}
    </section>
  );
}
