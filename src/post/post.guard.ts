import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly dbClient: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const JwtPayload: JwtPayload = request.user; //Del authGuard
    const postId = request.params.id;

    if (!postId || !JwtPayload) {
      throw new ForbiddenException(
        'No tienes permiso para realizar esta acción',
      );
    }
    const post = await this.dbClient.post.findUnique({
      where: { id: postId },
    });

    if (post!.userId !== JwtPayload.userId) {
      throw new ForbiddenException(
        'No tienes permiso para manipular este post',
      );
    }
    return true;
  }
}
