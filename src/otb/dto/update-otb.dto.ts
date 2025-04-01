import { PartialType } from '@nestjs/mapped-types';
import { CreateOtbDto } from './create-otb.dto';

export class UpdateOtbDto extends PartialType(CreateOtbDto) {}
