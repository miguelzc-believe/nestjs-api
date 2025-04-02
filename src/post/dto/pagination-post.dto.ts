import { Type } from "class-transformer";
import { IsInt, Min} from "class-validator";

export class PaginationPostDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;
  
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize: number;
  }