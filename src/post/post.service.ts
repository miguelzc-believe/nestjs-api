import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { PaginationPostDto } from './dto/pagination-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly dbClient: PrismaService) {}
  async createPost(user: JwtPayload, newPost: CreatePostDto) {
    return this.dbClient.post.create({
      data: {
        userId: user.userId,
        title: newPost.title,
        content: newPost.content,
      },
    });
  }
  async getAllPosts(paginationPostDto: PaginationPostDto) {
    return this.dbClient.post.findMany({
      skip: (paginationPostDto.page - 1) * paginationPostDto.pageSize,
      take: paginationPostDto.pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        isDeleted: false,
      },
    });
  }
  async getTotalItems() {
    return this.dbClient.post.count({
      where: {
        isDeleted: false,
      },
    });
  }
  async deletePostById(id: string) {
    return this.dbClient.post.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
  async updatePostById(id: string, updatePostDto: UpdatePostDto) {
    return this.dbClient.post.update({
      where: {
        id,
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
      },
    });
  }
}
