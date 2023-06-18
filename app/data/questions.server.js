import fs from 'fs/promises'
import { prisma } from './database.server';


export async function getQuestionsDBJSON() {
    const rawFileContent = await fs.readFile('./app/data/questions.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const questions = data.questions ?? [];
    return questions;
}

export async function getQuestions() {
    const q = prisma.questions.findMany();
    console.log(q);
    return q;
}

export async function saveLocalQuestions(questions) {
    return fs.writeFile('questionsLocal.json', JSON.stringify({ questions: questions || [] }));
}

export async function getStoredQuestions() {
    const rawFileContent = await fs.readFile('questionsLocal.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.questions ?? [];
    return storedNotes;
}

export function storeNotes(notes) {
    return fs.writeFile('notes.json', JSON.stringify({ questions: questions || [] }));
}

export function answeredQuestion(questions) {
    const questionsList = questions.shift();
    return fs.writeFile('questionsLocal.json', JSON.stringify({ questions: questions || [] }));
}

export async function saveLocalEnglishScores(data) {
    return fs.writeFile('EnglishScoreLocal.json', JSON.stringify(data));
}

export async function getStoredEnglishScore() {
    const rawFileContent = await fs.readFile('EnglishScoreLocal.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    console.log("Data from getStoredScores: ", data);
    //const storedNotes = data.questions ?? [];
    return data;
}

export async function unansweredQuestions(userSession) {
    var questionsIncomplete = [];
    questions = await prisma.questions.findMany({
        where: {
            userid: userSession,
        }
    });

    for (i in questions) {
        if (questions[i].completed != 1) {
            const question = await prisma.questionPool.findUnique({
                where: {
                    id: questions[i].questionid,
                }
            });
            questionsIncomplete.push(question);
            console.log("Question not completed: ", question);
        }
    }
    //console.log(questionsIncomplete); 
    await saveLocalQuestions(questionsIncomplete);
    return questionsIncomplete;
}

export async function getQuestionsDB(userId) {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    const evaluationType = await prisma.evaluation.findFirst({ where: { id: user.evaluation_type } })
    // console.log(evaluationType)
    const englishQuestions = await prisma.questionPool.findMany({ where: { categoria: 'english' } });
    console.log(englishQuestions)
    const specificQuestions = await prisma.questionPool.findMany({ where: { categoria: evaluationType.name } });
    console.log(specificQuestions)

    var questions = [];
    const array = getRand(4, 6);
    for (let i = 0; i < array.length; i++) {
        questions.push(englishQuestions[array[i] - 1]);
    }
    questions.push(...specificQuestions);
    console.log(questions);

    return questions;
}

function getRand(nums, maxValue) {
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

export async function getEnglishQuestionScore(questionId){
    const question = await prisma.questionPool.findUnique({
        where: {
            id: parseInt(questionId)
        }
    }); 

    return question.value; 
}

export async function getUserQuestions(userId) {

    let questionIDs = [];

    const questions = await prisma.questions.findMany({
        where: {
            userid: +userId
        }
    });

    for (i in questions) {
        questionIDs.push(questions[i].questionid);
    }

    const questionDesc = await prisma.questionPool.findMany({
        where: { id: { in: questionIDs } },
        select: {
            description: true,
            value: true,
            subcategoria: true,
        },
    });

    return [questions, questionDesc];
}
