import { JwtService } from '@nestjs/jwt';
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
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { UseFilters } from '@nestjs/common';
import { PrismaWsExceptionFilter } from 'src/web-socket.filter';
import { Like } from '@prisma/client';

@UseFilters(PrismaWsExceptionFilter)
@WebSocketGateway()
export class LikeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
      private readonly likeService: LikeService,
      private jwtService: JwtService,
    ) {}
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    const token = client.handshake.headers['token'] as string;
    try {
      const payload = this.jwtService.verify(token);
      client.data.userId = payload.userId;
      console.log(`Client connected: ${client.id} as user ${payload.userId}`);
    } catch (error) {
      console.log('Token inválido');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emitNewLike(createdLike:Like,idLike:string)
  {
    this.server.emit(`reaction-${createdLike.postId}`, {
      postId: createdLike.postId,
      idLike:idLike,
      reaction:createdLike.reaction
    });
  }

  emitAllReactions(reactions:any,postId:string)
  {
    this.server.emit(`reactions-${postId}`, {
      postId: postId,reactions
    });
  }

  @SubscribeMessage('like-create')
  async handleCreateLike(
    @ConnectedSocket() client: Socket,
    @MessageBody() createLikeDto: CreateLikeDto,
  ) {
    const userId = client.data.userId;
    const createdLike = await this.likeService.createLike(createLikeDto, userId);
    client.broadcast.emit('like-created', createdLike);
    this.server.emit(`reactionUpdated-${createLikeDto.postId}`, {
      postId: createLikeDto.postId,
      idLike:createdLike.id,
      reaction:createdLike.reaction
    });
    return createdLike;
  }
  @SubscribeMessage('like-update')
  async handleUpdateLike(
    @ConnectedSocket() client: Socket,
    @MessageBody()  updateLikeDto: UpdateLikeDto ,
  ) {
    const updatedLike = await this.likeService.updateReaction(updateLikeDto);
    client.broadcast.emit('like-updated', updatedLike);
    this.server.emit(`reactionUpdated-${updatedLike.postId}`, {
      postId: updatedLike.postId,
      likeId:updatedLike.id,
      reaction:updatedLike.reaction
    });
    return updatedLike;
  }
  @SubscribeMessage(`like-getReactions`)
  async handleGetReactions(
    @MessageBody() data:{postId: string},
  ) {
    const reactions = await this.likeService.getAllReactionsPost(data.postId);
    this.server.emit(`reactionUpdated-${data.postId}`, {
      postId: data.postId,reactions
    });
    return reactions;
  }
  @SubscribeMessage('like-delete')
  async handleDeleteLike(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { likeId: string; postId: string },
  ) {
    const likeRecord = await this.likeService.findOne(data.likeId);
    if (!likeRecord) {
      client.broadcast.emit('error', { message: 'Like no encontrado' });
      return;
    }
    if (likeRecord.userId !== client.data.userId) {
      client.broadcast.emit('error', { message: 'No autorizado para eliminar esta reacción' });
      return;
    }

    const deletedLike = await this.likeService.deleteLike(data.likeId);
    client.broadcast.emit('like-deleted', deletedLike);
    this.server.emit(`reactionUpdated-${data.postId}`, {
      postId: data.postId,message:"like-deleted"
    });
    return deletedLike;
  }
}
