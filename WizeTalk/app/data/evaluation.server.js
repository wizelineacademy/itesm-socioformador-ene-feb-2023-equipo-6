import { prisma } from './database.server';

export async function getUserInfo(userId){
    try{
        const name = await prisma.user.findFirst({
            where: { id : userId },
        });
        return name;
    } catch (error) {
        throw new Error('Failed to get user info');
    }
}