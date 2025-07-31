import { PartialType } from '@nestjs/mapped-types';
import { CreateSignosVitalesDto } from './create-signos-vitales.dto';

export class UpdateSignosVitalesDto extends PartialType(
  CreateSignosVitalesDto,
) {}
