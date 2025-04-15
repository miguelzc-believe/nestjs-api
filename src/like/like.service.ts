import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly dbClient: PrismaService) {}

  async createLike(likeDto: CreateLikeDto,userId:string) {    return await this.dbClient.like.create({
      data: {
        postId:likeDto.postId,
        reaction:likeDto.reaction,
        userId,
      },
    });
  }

  async findOne(likeId:string){
    return await this.dbClient.like.findFirst({
        where:{
            id:likeId
        }
    })
  }
  async updateReaction(updateLikeDto: UpdateLikeDto) {
    return await this.dbClient.like.update({
      where: {
        id: updateLikeDto.likeId,
      },
      data: {
        reaction: updateLikeDto.reaction,
      },
    });
  }

  async getAllReactionsPost(postId: string) {
    const groupedReactions = await this.dbClient.like.groupBy({
      by: ['reaction'],
      where: {
        postId
      },
      _count: {
        reaction: true,
      },
    });
    const reactionsTotals = {
      total: 0,
      LIKE: 0,
      LOVE: 0,
      HAHA: 0,
      WOW: 0,
      SAD: 0,
      ANGRY: 0,
    };

    groupedReactions.forEach((item) => {
      const reactionType = item.reaction;
      const countValue = item._count.reaction;
      reactionsTotals[reactionType] = countValue;
      reactionsTotals.total += countValue;
    });

    return reactionsTotals;
  }

  async deleteLike(likeId: string) {
    return await this.dbClient.like.delete({
      where: {
        id: likeId,
      },
    });
  }
}
