import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseFilters } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeGateway } from "./like.gateway";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtPayload } from "src/auth/dto/jwt-payload.dto";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { PrismaWsExceptionFilter } from "src/web-socket.filter";

@Controller('like')
export class LikeController{

    constructor(
        private readonly likeService:LikeService,
        private readonly likeGateway:LikeGateway
    ){}

    @Post('like-create')
    async createLike( 
        @CurrentUser() user: JwtPayload,
        @Body() createLikeDto: CreateLikeDto,)
    {
        const {userId}=user
        if(!userId)
        {
            return {success: false, message:'Unauthorized', status:HttpStatus.UNAUTHORIZED}
        }
        const createdLike = await this.likeService.createLike(createLikeDto, userId);
        this.likeGateway.emitNewLike(createdLike,createdLike.id)
        return { success: true, message: 'Se ha reaccionado a la publicacion', createdLike};
    }

    @Patch('like-update')
    async updateLike(
        @CurrentUser() user: JwtPayload,
        @Body() updateLike: UpdateLikeDto
    )
    {
        const {userId}=user
        if(!userId)
        {
            return {success: false, message:'Unauthorized', status:HttpStatus.UNAUTHORIZED}
        }
        const updatedLike= await this.likeService.updateReaction(updateLike);
        this.likeGateway.emitNewLike(updatedLike,updatedLike.id);
        return {sucess: true, message: 'Reaccion actualizada',updatedLike}
    }

    @Get('getReactions/:idPost')
    async getReactions(
        @CurrentUser() user: JwtPayload,
        @Param() data:{idPost:string}
    )
    {
        const {userId}=user;
        if(!userId)
        {
            return {success: false, message:'Unauthorized', status:HttpStatus.UNAUTHORIZED}
        }
        const reactions= await this.likeService.getAllReactionsPost(data.idPost);
        this.likeGateway.emitAllReactions(reactions,data.idPost);
        return {success: true, reactions}
    }

    @Delete('/like-delete/:likeId')
    async deleteLike(
        @CurrentUser() user: JwtPayload,
        @Param() data:{likeId:string}
    )
    {
        await this.likeService.deleteLike(data.likeId);
        return {success: true, message:"Reaccion eliminada"}
    }
}