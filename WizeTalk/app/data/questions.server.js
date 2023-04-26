import fs from 'fs/promises'

export async function getQuestions() {
    const rawFileContent = await fs.readFile('./app/data/questions.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    const questions = data.questions ?? [];
    return questions;
}
