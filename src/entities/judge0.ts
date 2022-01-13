import axios from 'axios';

interface ISubmission {
  sourceCode: string;
  languageID: number;
  stdin?: string;
}

interface ITestCase {
  input: string;
  expectedOutput: string;
}

export interface IJudgeResult {
  input: string;
  verdict: string;
  expectedOutput: string;
  compile_output: string | null;
  stdout: string | null;
  stderr: string | null;
}

interface ICheckerResult {
  result: boolean;
  description: string;
}

export class Judge0 {
  private URL = `${process.env.HOST_JUDGE0}/submissions/?base64_encoded=true&wait=true`;

  async runCode({ sourceCode, languageID, stdin }: ISubmission) {
    const response = await axios.post(
      this.URL,
      {
        source_code: this.encode(sourceCode),
        stdin: this.encode(stdin),
        language_id: languageID,
      },
      {
        headers: {
          'x-rapidapi-host': `${process.env.X_RAPIDAPI_HOST}`,
          'x-rapidapi-key': `${process.env.X_RAPIDAPI_KEY}`,
        },
      },
    );
    return response.data;
  }

  async judge({ sourceCode, languageID }: ISubmission, testCases: ITestCase[]) {
    const results: IJudgeResult[] = await Promise.all(
      testCases.map(({ input, expectedOutput }) =>
        axios
          .post(
            this.URL,
            {
              source_code: this.encode(sourceCode),
              stdin: this.encode(input),
              language_id: languageID,
              expected_output: this.encode(expectedOutput),
            },
            {
              headers: {
                'x-rapidapi-host': `${process.env.X_RAPIDAPI_HOST}`,
                'x-rapidapi-key': `${process.env.X_RAPIDAPI_KEY}`,
              },
            },
          )
          .then(({ data }) => {
            let stdout = data.stdout;
            let stderr = data.stderr;
            let compile_output = data.compile_output;
            const description = data.status.description;

            if (compile_output !== null) {
              compile_output = this.decode(compile_output);
            }

            if (stdout !== null) {
              stdout = this.decode(stdout);
            }

            if (stderr !== null) {
              stderr = this.decode(stderr);
            }

            return {
              input,
              expectedOutput,
              verdict: description,
              compile_output,
              stdout,
              stderr,
            };
          }),
      ),
    );

    return {
      verdict: this.getVerdict(results.map((result) => result)),
      testCases: results,
    };
  }

  private encode(str: string): string {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  private decode(str: string): string {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  private checkWrongAnswer(results: IJudgeResult[]): ICheckerResult {
    return {
      result: results.some((result) => result.verdict === 'Wrong Answer'),
      description: 'Wrong Answer',
    };
  }

  private checkCompilationError(results: IJudgeResult[]): ICheckerResult {
    return {
      result: results.some((result) => result.verdict === 'Compilation Error'),
      description: 'Compilation Error',
    };
  }

  private checkAccepted(results: IJudgeResult[]): ICheckerResult {
    return {
      result: results.every((result) => result.verdict === 'Accepted'),
      description: 'Accepted',
    };
  }

  private checkTimeLimitExceeded(results: IJudgeResult[]): ICheckerResult {
    return {
      result: results.some(
        (result) => result.verdict === 'Time Limit Exceeded',
      ),
      description: 'Time Limit Exceeded',
    };
  }

  private checkRuntimeError(results: IJudgeResult[]): ICheckerResult {
    return {
      result: results.some((result) =>
        result.verdict.includes('Runtime Error'),
      ),
      description: 'Runtime Error',
    };
  }

  private getVerdict(results: IJudgeResult[]) {
    let verdict = '';

    const checkers = [
      this.checkCompilationError,
      this.checkRuntimeError,
      this.checkTimeLimitExceeded,
      this.checkWrongAnswer,
      this.checkAccepted,
    ];

    for (const checker of checkers) {
      const { result, description } = checker(results);
      if (result) {
        verdict = description;
        break;
      }
    }

    return verdict;
  }
}
