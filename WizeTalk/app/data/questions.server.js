import fs from 'fs/promises'
import { prisma } from "./database.server";
// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

export async function getQuestionsJSON() {
    const rawFileContent = await fs.readFile('./app/data/questions.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    const questions = data.questions ?? [];
    return questions;
}

export async function getQuestionsDB(){
    const questions = await prisma.questionPool.findMany();
    // console.log(questions);
    return questions;
}
