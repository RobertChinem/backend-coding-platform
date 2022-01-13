export class CreateCommitDto {
  code: {
    source_code: string;
    language_id: number;
    stdin: string;
  };
  parent_commit: string;
}
