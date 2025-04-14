import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentGateway } from './comment.gateway';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentGateway: CommentGateway,
  ) {}
  @Post('new-comment')
  async CreateComment(
    @CurrentUser() user: JwtPayload,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = user;
    const comment = await this.commentService.createComment(
      createCommentDto,
      userId,
    );
    this.commentGateway.emitNewComment(comment);
    return { success: true, message: 'Comentario creado con exito', comment };
  }

  @Patch(':commentId')
  async EditComment(
    @CurrentUser() user: JwtPayload,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('commentId') commentId: string,
  ) {
    const { userId } = user;
    const comment = await this.commentService.updateCommentById(
      updateCommentDto,
      userId,
      commentId,
    );

    this.commentGateway.emitComment(comment, commentId);
    return { success: true, message: 'Comentario editado con exito', comment };
  }
  
  @Delete(':commentId')
  async DeleteComment(
    @CurrentUser() user: JwtPayload,
    @Param('commentId') commentId: string,
  ) {
    const { userId } = user;
    const comment = await this.commentService.deleteCommentById(
      commentId,
      userId,
    );
    this.commentGateway.emitComment(comment, commentId);
    return { success: true, message: 'Comentario eliminado con exito', comment };
  }
}
