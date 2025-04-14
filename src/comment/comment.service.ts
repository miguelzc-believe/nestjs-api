import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MessageBody } from '@nestjs/websockets';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly dbClient: PrismaService) {}
  async createComment(createCommentDto: CreateCommentDto, userId: string) {
    return await this.dbClient.comment.create({
      data: {
        userId,
        postId: createCommentDto.postId,
        content: createCommentDto.content,
      },
    });
  }
  async getCommentByPost(postId: string) {
    return await this.dbClient.comment.findMany({
      where: { postId },
      select: {
        id: true,
        content: true,
        userComment: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async updateCommentById(
    updateCommentDto: UpdateCommentDto,
    userId: string,
    commentId: string,
  ) {
    return await this.dbClient.comment.update({
      where: { id: commentId, userId },
      data: {
        content: updateCommentDto.content,
      },
    });
  }
  async deleteCommentById(commentId: string, userId: string) {
    return await this.dbClient.comment.update({
      where: { id: commentId, userId },
      data: {
        isDeleted: true,
      },
    });
  }
}
