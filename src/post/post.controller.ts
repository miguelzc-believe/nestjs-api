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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedPostsResponse } from './dto/paginated-post-response';
import { CreatePostResponseDto } from './dto/create-response.dto';
@ApiTags('Posts')
@ApiBearerAuth('access-token')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear nuevo post' })
  @ApiResponse({ status: 200, type: CreatePostResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({ summary: 'Obtener todos los posts con paginación' })
  @ApiResponse({ status: 200, type: PaginatedPostsResponse, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'Tamaño de página',
  })
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
  @ApiOperation({ summary: 'Eliminar un post por ID' })
  @ApiParam({ name: 'id', description: 'ID del post a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Post actualizado exitosamente',
    schema: {
      properties: {
        message: { type: 'string', example: 'Post updated successfully' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para realizar esta acción',
  })
  @ApiResponse({ status: 404, description: 'Post no encontrado' })
  async deletePostById(@Param('id') id: string) {
    const post = await this.postService.deletePostById(id);
    return {
      message: 'Post deleted successfully',
      postId: post.id,
    };
  }

  @Patch(':id')
  @UseGuards(PostOwnerGuard)
  @ApiOperation({ summary: 'Actualizar un post por ID' })
  @ApiParam({ name: 'id', description: 'ID del post a actualizar' })
  @ApiBody({ type: UpdatePostDto , required: false})
  @ApiResponse({
    status: 200,
    description: 'Post actualizado exitosamente',
    schema: {
      properties: {
        message: { type: 'string', example: 'Post updated successfully' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para realizar esta acción',
  })
  @ApiResponse({ status: 404, description: 'Post no encontrado' })
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
