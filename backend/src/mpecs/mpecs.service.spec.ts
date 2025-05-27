import { Test, TestingModule } from '@nestjs/testing';
import { MpecsService } from './mpecs.service';
import { CoursePatternExtractionService } from './course-pattern-extraction.service';
import { ExtractCoursePatternResponseDto } from './dto/extract-course-pattern-response-dto';
import { ApplyPatternToExampleResponseDto } from './dto/apply-pattern-to-example-response-dto';
import { SolveTestQuestionResponseDto } from './dto/solve-test-question-response-dto';
import { RelationshipNameType } from './dto/graph-dto';

jest.mock('./course-pattern-extraction.service');

describe('MpecsService', () => {
  let service: MpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpecsService, CoursePatternExtractionService],
    }).compile();

    service = module.get<MpecsService>(MpecsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('extractPattern', () => {
    it('should extract course pattern and wait for 1 second', async () => {
      const mockPattern: ExtractCoursePatternResponseDto = {
        success: true,
        coursePattern: {
          entities: [
            {
              id: '1',
              name: 'number',
              label: 'Number',
              start: false,
              end: false,
            },
          ],
          relations: [
            {
              source: '1',
              target: '1',
              type: RelationshipNameType.EVALUATES_TO,
              name: 'evaluates to',
            },
          ],
        },
      };

      jest
        .spyOn(CoursePatternExtractionService.prototype, 'getAdditionPattern')
        .mockImplementation(() => mockPattern);

      const result = await service.extractPattern({
        courseContent: 'test content',
      });

      expect(result).toEqual(mockPattern);
      expect(
        CoursePatternExtractionService.prototype.getAdditionPattern,
      ).toHaveBeenCalled();
    });
  });

  describe('applyPatternToExample', () => {
    it('should apply pattern to example and wait for 1 second', async () => {
      const mockChain: ApplyPatternToExampleResponseDto = {
        success: true,
        explanatoryChain: {
          entities: [
            {
              id: '1',
              name: 'number',
              label: 'Number',
              start: false,
              end: false,
            },
          ],
          relations: [
            {
              source: '1',
              target: '1',
              type: RelationshipNameType.EVALUATES_TO,
              name: 'evaluates to',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              description: 'Step 1 content',
              calculation: 'Explanation for step 1',
              reasoning: 'Reasoning for step 1',
            },
          ],
        },
      };

      jest
        .spyOn(
          CoursePatternExtractionService.prototype,
          'getExampleAddition3Plus2',
        )
        .mockImplementation(() => mockChain);

      const result = await service.applyPatternToExample({
        coursePattern: {
          entities: [
            {
              id: '1',
              name: 'number',
              label: 'Number',
              start: false,
              end: false,
            },
          ],
          relations: [
            {
              source: '1',
              target: '1',
              type: RelationshipNameType.EVALUATES_TO,
              name: 'evaluates to',
            },
          ],
        },
        exampleContent: 'test example',
      });

      expect(result).toEqual(mockChain);
      expect(
        CoursePatternExtractionService.prototype.getExampleAddition3Plus2,
      ).toHaveBeenCalled();
    });
  });

  describe('solveTestQuestion', () => {
    it('should solve test question and wait for 1 second', async () => {
      const mockSolution: SolveTestQuestionResponseDto = {
        success: true,
        solution: {
          answer: '5',
          explanatoryChain: {
            entities: [
              {
                id: '1',
                name: 'number',
                label: 'Number',
                start: false,
                end: false,
              },
            ],
            relations: [
              {
                source: '1',
                target: '1',
                type: RelationshipNameType.EVALUATES_TO,
                name: 'evaluates to',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                description: 'Step 1 content',
                calculation: 'Explanation for step 1',
                reasoning: 'Reasoning for step 1',
              },
            ],
          },
        },
      };

      jest
        .spyOn(
          CoursePatternExtractionService.prototype,
          'getTestQuestionAddition3Plus2',
        )
        .mockImplementation(() => mockSolution);

      const result = await service.solveTestQuestion({
        coursePattern: {
          entities: [
            {
              id: '1',
              name: 'number',
              label: 'Number',
              start: false,
              end: false,
            },
          ],
          relations: [
            {
              source: '1',
              target: '1',
              type: RelationshipNameType.EVALUATES_TO,
              name: 'evaluates to',
            },
          ],
        },
        exampleContent: 'test example',
        testQuestion: 'test question',
      });

      expect(result).toEqual(mockSolution);
      expect(
        CoursePatternExtractionService.prototype.getTestQuestionAddition3Plus2,
      ).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle errors gracefully', async () => {
      const error = new Error('Test error');
      jest
        .spyOn(CoursePatternExtractionService.prototype, 'getAdditionPattern')
        .mockImplementation(() => {
          throw error;
        });

      await expect(
        service.extractPattern({ courseContent: 'test content' }),
      ).rejects.toThrow(error);
    });

    it('should handle invalid course content', async () => {
      jest
        .spyOn(CoursePatternExtractionService.prototype, 'getAdditionPattern')
        .mockImplementation(() => {
          throw new Error('Invalid course content');
        });

      await expect(
        service.extractPattern({ courseContent: '' }),
      ).rejects.toThrow('Invalid course content');
    });

    it('should handle invalid pattern application', async () => {
      jest
        .spyOn(
          CoursePatternExtractionService.prototype,
          'getExampleAddition3Plus2',
        )
        .mockImplementation(() => {
          throw new Error('Invalid pattern');
        });

      await expect(
        service.applyPatternToExample({
          coursePattern: {
            entities: [],
            relations: [],
          },
          exampleContent: '3 + 2',
        }),
      ).rejects.toThrow('Invalid pattern');
    });
  });
});
