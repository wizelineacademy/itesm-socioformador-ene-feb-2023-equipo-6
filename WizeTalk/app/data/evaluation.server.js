import { prisma } from './database.server';

export async function getUserInfo(userId){
    try{
        const user = await prisma.user.findFirst({
            where: { id : userId },
        });
        return user;
    } catch (error) {
        throw new Error('Failed to get user info');
    }
}

export async function getInfo(){
    console.log("GetInfoPre"); 
    const ev = await prisma.questions.findMany(); 
    console.log("GetInfo"); 
    return ev; 
}