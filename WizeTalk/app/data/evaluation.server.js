import { prisma } from './database.server';
import { getUserFromSession } from './auth.server';
import { redirect } from '@remix-run/node';

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

export async function getEvaluationQuestions(userId) {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (user.evaluation_type === 1) {
        const englishQuestions = await prisma.questionPool.findMany({ where: { categoria: 'english' } });
        const questions = getRandomSubarray(englishQuestions, 7);
        return questions;
    }
    else if (user.evaluation_type === 2) {
        const englishQuestions = await prisma.questionPool.findMany({ where: { categoria: 'english' } });
        const questions = getRandomSubarray(englishQuestions, 7);
        return questions;
    }
    else if (user.evaluation_type === 3) {
        const englishQuestions = await prisma.questionPool.findMany({ where: { categoria: 'english' } });
        const questions = getRandomSubarray(englishQuestions, 7);
        return questions;
    }

    const questions = await prisma.questionPool.findMany();
    // console.log(questions);
}

export async function getUserInfo(userId) {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
        });
        return user;
    } catch (error) {
        throw new Error('Failed to get user info');
    }
}

export async function testStatus(request) {
    const userId = await getUserFromSession(request);
    // console.log(userId);
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user.status == 0) {
        await prisma.user.update({ where: { id: userId, }, data: { status: 1, }, });
        return redirect('/evaluation/instructions');
    }
    else if (user.status == 1) {
        return redirect('/evaluation/results');
    }
}

export async function getSoftSkills() {
    var randomNum, randomNumArray = [];
    for (let i = 0; i < 3; i++) {
        randomNum = Math.floor(Math.random() * 7) + 1;
        while (randomNum == randomNumArray[0] || randomNum == randomNumArray[1]) {
            randomNum = Math.floor(Math.random() * 7) + 1;
        }
        randomNumArray[i] = randomNum;
        // console.log(randomNum)
    }

    const softSkills = await prisma.softSkills.findMany({ where: { OR: [{ id: randomNumArray[0] }, { id: randomNumArray[1] }, { id: randomNumArray[2] }], } })
    var skillsArray = [];
    for (let i = 0; i < softSkills.length; i++) {
        skillsArray[i] = softSkills[i].name
    }
    return skillsArray
}

