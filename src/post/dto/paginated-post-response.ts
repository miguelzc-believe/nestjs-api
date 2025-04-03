import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class PaginatedPostsResponse {
  @ApiProperty({ example: 2 })
  pageSize: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 100014 })
  totalItems: number;

  @ApiProperty({ type: [PostDto] })
  posts: PostDto[];
}
