import axios, { AxiosInstance } from "axios";
import { BaseApiUrl } from "@/configs/settings";
import {
  ApplyPatternToExampleRequest,
  ApplyPatternToExampleResponse,
  ExtractCoursePatternRequest,
  ExtractCoursePatternResponse,
  SolveTestQuestionRequest,
  SolveTestQuestionResponse,
} from "@/lib/store/types";

const api: AxiosInstance = axios.create({
  baseURL: BaseApiUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

class BasicService {
  extract(
    extractCoursePatternRequest: ExtractCoursePatternRequest
  ): Promise<ExtractCoursePatternResponse> {
    return api
      .post(`/api/extract-course-pattern`, extractCoursePatternRequest)
      .then((response) => {
        return response?.data;
      });
  }

  applyPattern(
    extractCoursePatternRequest: ApplyPatternToExampleRequest
  ): Promise<ApplyPatternToExampleResponse> {
    return api
      .post(`/api/apply-pattern-to-example`, extractCoursePatternRequest)
      .then((response) => {
        return response?.data;
      });
  }

  solve(
    extractCoursePatternRequest: SolveTestQuestionRequest
  ): Promise<SolveTestQuestionResponse> {
    return api
      .post(`/api/solve-test-question`, extractCoursePatternRequest)
      .then((response) => {
        return response?.data;
      });
  }
}

const basicService = new BasicService();
export default basicService;