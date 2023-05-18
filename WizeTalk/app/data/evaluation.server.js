import { prisma } from './database.server';
import { getUserFromSession } from './auth.server';
import { redirect } from '@remix-run/node';

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
export async function testStatus(request) {
    const userId = await getUserFromSession(request);
    // console.log(userId);
    const user = await prisma.user.findFirst({ where: { id: userId }});
    if (user.status == 0){
        await prisma.user.update({ where: { id: userId, }, data: { status: 1, },});
        return redirect('/evaluation/instructions');
    }
    else if (user.status == 1){
        return redirect('/evaluation/results');
    }
}
export async function getSoftSkills() {
    var randomNum, randomNumArray = [];
    for (let i = 0; i < 3; i++){
        randomNum = Math.floor(Math.random() * 7 ) + 1;
        while (randomNum == randomNumArray[0] || randomNum == randomNumArray[1]){
            randomNum = Math.floor(Math.random() * 7 ) + 1;
        }
        randomNumArray[i] = randomNum;
        // console.log(randomNum)
    }
    // for (let i = 0; i < 3; i++){
    //     var softSkillsArray = [], softSkills
    //     // console.log(sofrandomNumArray[i])
    //     softSkills = await prisma.softSkills.findFirst({ where: { id: randomNumArray[i]}})
    //     const softSkillName = softSkills.name
    //     softSkillsArray[i] = softSkillName
    //     // console.log(softSkillName)
    // }
    const softSkills = await prisma.softSkills.findMany({ where: { OR: [{ id: randomNumArray[0] }, { id: randomNumArray[1] }, { id: randomNumArray[2] }],}})
    var skillsArray = [];
    for (let i = 0; i < softSkills.length; i++){
        skillsArray[i] = softSkills[i].name
    }
    return skillsArray
}

