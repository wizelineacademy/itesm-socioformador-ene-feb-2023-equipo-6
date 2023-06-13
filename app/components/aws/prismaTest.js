import { prisma } from "../../data/database.server";

export async function prismaTest(){
    const n = await prisma.questions.findMany(); 
    console.log(n); 
    return; 
}