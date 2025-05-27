import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { ExtractCoursePatternDto } from '../src/mpecs/dto/extract-course-pattern-dto';
import { ApplyPatternToExampleDto } from '../src/mpecs/dto/apply-pattern-to-example-dto';
import { SolveTestQuestionDto } from '../src/mpecs/dto/solve-test-question-dto';
import request from 'supertest';
import { RelationshipNameType } from '../src/mpecs/dto/graph-dto';
import { ValidationPipe } from '@nestjs/common';

describe('MPEC Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('extract course pattern', () => {
    it('should extract course pattern successfully', async () => {
      const payload: ExtractCoursePatternDto = {
        courseContent: 'Addition of numbers',
      };

      return request(app.getHttpServer())
        .post('/api/extract-course-pattern')
        .send(payload)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('coursePattern');
          expect(res.body.coursePattern).toHaveProperty('entities');
          expect(res.body.coursePattern).toHaveProperty('relations');
        });
    });
  });

  describe('apply pattern to example', () => {
    it('should apply pattern to example successfully', async () => {
      const payload: ApplyPatternToExampleDto = {
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
        exampleContent: '3 + 2',
      };

      return request(app.getHttpServer())
        .post('/api/apply-pattern-to-example')
        .send(payload)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('explanatoryChain');
          expect(res.body.explanatoryChain).toHaveProperty('steps');
          expect(res.body.explanatoryChain.steps[0]).toHaveProperty(
            'stepNumber',
            1,
          );
          expect(res.body.explanatoryChain.steps[0]).toHaveProperty(
            'description',
          );
          expect(res.body.explanatoryChain.steps[0]).toHaveProperty(
            'calculation',
          );
          expect(res.body.explanatoryChain.steps[0]).toHaveProperty(
            'reasoning',
          );
        });
    });
  });

  describe('solve test question', () => {
    it('should solve test question successfully', async () => {
      const payload: SolveTestQuestionDto = {
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
        exampleContent: '3 + 2',
        testQuestion: '5 + 4',
      };

      return request(app.getHttpServer())
        .post('/api/solve-test-question')
        .send(payload)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('solution');
          expect(res.body.solution).toHaveProperty('answer', '9');
          expect(res.body.solution).toHaveProperty('explanatoryChain');
          expect(res.body.solution.explanatoryChain).toHaveProperty('steps');
          expect(res.body.solution.explanatoryChain.steps[0]).toHaveProperty(
            'stepNumber',
            1,
          );
          expect(res.body.solution.explanatoryChain.steps[0]).toHaveProperty(
            'description',
          );
          expect(res.body.solution.explanatoryChain.steps[0]).toHaveProperty(
            'calculation',
          );
          expect(res.body.solution.explanatoryChain.steps[0]).toHaveProperty(
            'reasoning',
          );
        });
    });
  });

  describe('error handling', () => {
    it('should handle invalid course content', async () => {
      const payload: ExtractCoursePatternDto = {
        courseContent: '', // Invalid empty content
      };

      return request(app.getHttpServer())
        .post('/api/extract-course-pattern')
        .send(payload)
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });

    it('should handle invalid pattern application', async () => {
      const payload: ApplyPatternToExampleDto = {
        coursePattern: {
          entities: [],
          relations: [],
        } as any, // Invalid empty pattern
        exampleContent: '', // Empty example content should trigger validation error
      };

      return request(app.getHttpServer())
        .post('/api/apply-pattern-to-example')
        .send(payload)
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });
  });
});
