import fs from 'fs/promises'
import { prisma } from './database.server';

export async function getQuestionsDB() {
    const rawFileContent = await fs.readFile('./app/data/questions.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    const questions = data.questions ?? [];
    return questions;
}

export async function getQuestions(){
    const q = prisma.questions.findMany();
    console.log(q);
    return q;
}