
import { faker } from '@faker-js/faker';
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient();


async function generateDate()
{
    const password=await bcrypt.hash("Password@123",10);
    
    for(let i=0;i<1000; i++)
    {
        const firstName=faker.person.firstName();
        const lastName=faker.person.lastName();
        const email=faker.internet.email();
        const birthDate=faker.date.birthdate();
        const u=await prisma.user.create(
            {data:{
                firstName,
                lastName,
                email,
                password,
                birthDate,
                state: true   
            },}
        );
        for (let k = 0; k < 100; k++) {
            await prisma.post.create({
              data: {
                userId: u.id,
                title: faker.lorem.sentence({min:1,max:3}),
                content: faker.lorem.paragraphs({min:10,max:200}),
                isDeleted: false
              }
            })
        }

    }
}

async function generar()
{
    try{
        await generateDate();
        console.log("DB Generada correctamente")
    }
    catch(error)
    {
        console.log("Error al llenar Base de Datos ",error);
    }
    finally {
        await prisma.$disconnect();
      }
}

generar();