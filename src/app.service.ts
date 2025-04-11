import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma/prisma.service';


@Injectable()
export class AppService {
  constructor(private readonly dbClient:PrismaService){}
  async getHello(): Promise<string> {
    const password=await bcrypt.hash("Password@123",10);
    console.time("Semilla")
    for(let i=0;i<1000; i++)
    {
        const firstName=faker.person.firstName();
        const lastName=faker.person.lastName();
        const email=faker.internet.email();
        const birthDate=faker.date.birthdate();
        const u=await this.dbClient.user.create(
            {data:{
                firstName,
                lastName,
                email,
                password,
                birthDate,
                state: true,
                // posts:{
                //     create:
                //     {
                //         title: faker.lorem.sentence({min:1,max:3}),
                //         content: faker.lorem.paragraphs({min:10,max:200}),
                //         isDeleted: false
                //     }
                // }   
            },}
        );
        for (let k = 0; k < 100; k++) {
            await this.dbClient.post.create({
              data: {
                userId: u.id,
                title: faker.lorem.sentence({min:1,max:3}),
                content: faker.lorem.paragraphs({min:10,max:200}),
                isDeleted: false
              }
            })
        }

    }
    console.timeEnd("Semilla")
    return 'Hello World!';
  }
  
}
