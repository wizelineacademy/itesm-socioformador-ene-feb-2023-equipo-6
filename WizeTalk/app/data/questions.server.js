import fs from 'fs/promises'
import { prisma } from "./database.server";
import { requireUserSession } from "../data/auth.server";

// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

export async function getQuestionsJSON() {
    const rawFileContent = await fs.readFile('./app/data/questions.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    const questions = data.questions ?? [];
    return questions;
}

export async function getQuestionsDB(userId){
    const user = await prisma.user.findFirst({ where: { id: userId } })
    const evaluationType = await prisma.evaluation.findFirst({ where: { id: user.evaluation_type }})
    // console.log(evaluationType)
    const englishQuestions = await prisma.questionPool.findMany( {where: { categoria: 'english' }});
    console.log(englishQuestions)
    const specificQuestions = await prisma.questionPool.findMany( {where: { categoria: evaluationType.name }});
    console.log(specificQuestions)

    var questions = [];
    const array = getRand(4, 6);
    for (let i = 0; i < array.length; i++){
        questions.push(englishQuestions[array[i] - 1]);
    }
    questions.push(...specificQuestions);
    console.log(questions);

    return questions;
}

function getRand(nums, maxValue){
    const numbers = [];
    while (numbers.length < nums) {
        const randomNumber = Math.floor(Math.random() * maxValue + 1);
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }
    console.log(numbers);
    return numbers
}