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

export async function saveLocalQuestions(questions){
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

export function answeredQuestion(questions){
  const questionsList = questions.shift(); 
  return fs.writeFile('questionsLocal.json', JSON.stringify({ questions: questions || [] })); 
}

export async function saveLocalEnglishScores(data){
  return fs.writeFile('EnglishScoreLocal.json', JSON.stringify(data));
}

export async function getStoredEnglishScore() {
  const rawFileContent = await fs.readFile('EnglishScoreLocal.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  console.log("Data from getStoredScores: ", data); 
  //const storedNotes = data.questions ?? [];
  return data;
}

export async function unansweredQuestions(userSession){
  var questionsIncomplete = []; 
  questions = await prisma.questions.findMany({
      where: {
          userid: userSession, 
      }
  }); 

  for(i in questions){
      if(questions[i].completed != 1){
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



