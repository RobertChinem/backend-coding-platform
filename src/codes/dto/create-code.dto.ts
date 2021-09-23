interface Status {
  id: number;
  description: string;
}

export class CreateCodeDto {
  source_code: string;
  language_id: number;
  stdin?: string;
  stderr?: string;
  stdout?: string;
  compile_output?: string;
  status?: Status;
}
