import fs from 'fs/promises';

export async function getQuestions() {
  const rawFileContent = await fs.readFile('questions.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.softskills ?? [];
  const shuffle = storedNotes.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffle.slice(0,5);

  //console.log(selectedQuestions);

  return selectedQuestions;
}

export function storeNotes(notes) {
  return fs.writeFile('questions.json', JSON.stringify({ notes: notes || [] }));
}