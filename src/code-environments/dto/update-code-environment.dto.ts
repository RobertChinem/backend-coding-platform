import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeEnvironmentDto } from './create-code-environment.dto';

export class UpdateCodeEnvironmentDto extends PartialType(CreateCodeEnvironmentDto) {}
