import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly commentService: CommentService,
    private jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    const token = client.handshake.headers['token'] as string;
    try {
      const payload = this.jwtService.verify(token);
      client.data.userId = payload.userId;
      console.log(
        `Client connected for comment: ${client.id} as ${payload.userId}`,
      );
    } catch (error) {
      console.log('Token inválido');
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected:' ${client.id}`);
  }

  emitNewComment(comment: CreateCommentDto) {
    this.server.emit(`Post-${comment.postId}`, comment);
  }

  emitComment (comment: UpdateCommentDto, commentId: string){
    this.server.emit(`Comment-${commentId}`, comment)
  }

  // Otra Lógica para manejo de sockets
  @SubscribeMessage('comment')
  async handleMessage(
    @MessageBody() createCommentDto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const comment = await this.commentService.createComment(
      createCommentDto,
      userId,
    );
    client.broadcast.emit('comment-listen', comment);
  }
  @SubscribeMessage('comment-edit')
  async handleEdit(
    @MessageBody() updateCommentDto: UpdateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const commentId = client.data.commentId; // dato inventado
    const comment = await this.commentService.updateCommentById(
      updateCommentDto,
      userId,
      commentId
    );
    client.broadcast.emit('comment-listen', comment);
  }
  @SubscribeMessage('comment-delete')
  async handleDelete(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const { commentId } = payload;
    const comment = await this.commentService.deleteCommentById(
      commentId,
      userId,
    );
    client.broadcast.emit('comment-listen', comment);
  }
}
