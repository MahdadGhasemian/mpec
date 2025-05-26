"use client";

import api from "@/services/api";
import GraphView from "@/components/GraphView";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseContent,
  getCoursePattern,
  setCourseContent,
  setCoursePattern,
  setStage,
} from "@/lib/store/features/appSlice";

export default function CoursePatternExtractionTab() {
  // ** Global Store
  const dispatch = useDispatch();
  const courseContent = useSelector(getCourseContent);
  const coursePattern = useSelector(getCoursePattern);

  const handleExtractPattern = async () => {
    const response = await api.extract({ courseContent });

    dispatch(setCoursePattern(response.coursePattern));
    dispatch(setStage(2));
  };

  return (
    <section>
      <textarea
        className="w-full border p-2 mt-2"
        rows={6}
        placeholder="Paste LaTeX course content here..."
        value={courseContent}
        onChange={(e) => dispatch(setCourseContent(e.target.value))}
      />
      <button
        onClick={handleExtractPattern}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Extract Pattern
      </button>
      {coursePattern && (
        <GraphView
          entities={coursePattern.entities}
          relations={coursePattern.relations}
        />
      )}
    </section>
  );
}
