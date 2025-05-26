"use client";

import ExplanatoryChainView from "@/components/ExplanatoryChainView";
import api from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoursePattern,
  getExampleContent,
  getExplanatoryChain,
  setExampleContent,
  setExplanatoryChain,
  setStage,
} from "@/lib/store/features/appSlice";

export default function ApplyPatternToExampleTab() {
  // ** Global Store
  const dispatch = useDispatch();
  const exampleContent = useSelector(getExampleContent);
  const coursePattern = useSelector(getCoursePattern);
  const explanatoryChain = useSelector(getExplanatoryChain);

  const handleApplyExample = async () => {
    if (!coursePattern) return;

    const response = await api.applyPattern({ coursePattern, exampleContent });
    dispatch(setExplanatoryChain(response.explanatoryChain));
    dispatch(setStage(3));
  };

  return (
    <section>
      <textarea
        className="w-full border p-2 mt-2"
        rows={4}
        placeholder="Paste example LaTeX here..."
        value={exampleContent}
        onChange={(e) => dispatch(setExampleContent(e.target.value))}
      />
      <button
        onClick={handleApplyExample}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
      >
        Apply to Example
      </button>
      {explanatoryChain && (
        <ExplanatoryChainView explanatoryChain={explanatoryChain} />
      )}
    </section>
  );
}
