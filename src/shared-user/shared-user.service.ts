import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SharedUserService {
    constructor( private readonly dbClient:PrismaService) {
    }
    async findUserByEmail(email: string) {
        return this.dbClient.user.findUnique({
          where:{
            email
          }
        })
      }
      async updateUserState(id: string) {
        return this.dbClient.user.update({
          where: {
            id,
          },
          data: {
            state:true,
          },
        });
      }
}
