import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { PaginationPostDto } from './dto/pagination-post.dto';
import { PostOwnerGuard } from './post.guard';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(
    @CurrentUser() user: JwtPayload,
    @Body() createPostDTO: CreatePostDto,
  ) {
    const post = await this.postService.createPost(user, createPostDTO);
    return {
      message: 'Post created successfully',
      postId: post.id,
    };
  }

  @Get()
  async getAllPosts(@Query() paginationPostDto: PaginationPostDto) {
    const posts = await this.postService.getAllPosts(paginationPostDto);
    const totalItems = await this.postService.getTotalItems();
    return {
      pageSize: paginationPostDto.pageSize,
      page: paginationPostDto.page,
      totalItems: totalItems,
      posts: posts,
    };
  }
  @Delete(':id')
  @UseGuards(PostOwnerGuard)
  async deletePostById(@Param('id') id: string) {
    const post = await this.postService.deletePostById(id);
    return {
      message: 'Post deleted successfully',
      postId: post.id,
    };
  }

  @Patch(':id')
  @UseGuards(PostOwnerGuard)
  async updatePostById(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    await this.postService.updatePostById(id, updatePostDto);
    return {
      message: 'Post updated successfully',
    };
  }
}
