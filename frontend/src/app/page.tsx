"use client";

import { useState } from "react";
import ExplanatoryChainView from "@/components/ExplanatoryChainView";
import api from "@/services/api";
import { ExplanatoryChain, KnowledgeGraph } from "@/lib/store/types";

export default function HomePage() {
  const [courseContent, setCourseContent] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [exampleContent, setExampleContent] = useState("");
  const [coursePattern, setCoursePattern] = useState<KnowledgeGraph | null>(
    null
  );
  const [explanatoryChain, setExplanatoryChain] =
    useState<ExplanatoryChain | null>(null);
  const [solution, setSolution] = useState<{
    answer: string;
    explanatoryChain: ExplanatoryChain;
  } | null>(null);

  const handleExtractPattern = async () => {
    const response = await api.extract({ courseContent });

    console.log(response.coursePattern);
    setCoursePattern(response.coursePattern);
  };

  const handleApplyExample = async () => {
    if (!coursePattern) return;

    const response = await api.applyPattern({ coursePattern, exampleContent });

    console.log(response.explanatoryChain);
    setExplanatoryChain(response.explanatoryChain);
  };

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">MPEC Proof Reasoning Tool</h1>

      <section>
        <h2 className="font-semibold">1. Course Pattern Extraction</h2>
        <textarea
          className="w-full border p-2 mt-2"
          rows={6}
          placeholder="Paste LaTeX course content here..."
          value={courseContent}
          onChange={(e) => setCourseContent(e.target.value)}
        />
        <button
          onClick={handleExtractPattern}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Extract Pattern
        </button>
        {/* {graph && <GraphView graph={graph} />} */}
      </section>

      <section>
        <h2 className="font-semibold">2. Apply Pattern to Example</h2>
        <textarea
          className="w-full border p-2 mt-2"
          rows={4}
          placeholder="Paste example LaTeX here..."
          value={exampleContent}
          onChange={(e) => setExampleContent(e.target.value)}
        />
        <button
          onClick={handleApplyExample}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Apply to Example
        </button>
        {/* {chain && <ExplanatoryChain steps={chain} />} */}
      </section>

      <section>
        <h2 className="font-semibold">3. Solve Test Question</h2>
        <input
          className="w-full border p-2 mt-2"
          placeholder="Enter test question (e.g. 4 + 2)"
          value={testQuestion}
          onChange={(e) => setTestQuestion(e.target.value)}
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
            <ExplanatoryChainView
              explanatoryChain={solution.explanatoryChain}
            />
          </div>
        )}
      </section>
    </div>
  );
}
