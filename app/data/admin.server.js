import { prisma } from "./database.server";

//Function that returns questions in QuestionPool table
//given a category.

export async function getCategoryQuestions(category) {
    const category_questions = await prisma.questionPool.findMany(
        { where: { categoria: category } }
    );
    return category_questions;
}
// Function to get all the registered questions

export async function getAllQuestions() {
    const questions = await prisma.questionPool.findMany();
    return questions;
}


//Function that adds a new question to the QuestionPool table

export async function addQuestion(questionData) {
    try {
        return await prisma.questionPool.create({
            data: {
                instruction: questionData.instruction,
                categoria: questionData.category,
                min_time: +questionData.minTime,
                max_time: +questionData.maxTime,
                description: questionData.description,
                value: +questionData.value,
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add question.');
    }
}

//Function that updates given question in the QuestionPool table
//with the new data.

export async function updateQuestion(questionId, questionData) {
    try {
        return await prisma.questionPool.update({
            where: { id: +questionId },
            data: {
                instruction: questionData.instruction,
                categoria: questionData.category,
                min_time: +questionData.minTime,
                max_time: +questionData.maxTime,
                description: questionData.description,
                value: +questionData.value,
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update question.');
    }
}

//Function that deletes given question from the QuestionPool table.

export async function deleteQuestion(questionId) {
    try {
        await prisma.questionPool.delete({
            where: {
                id: +questionId
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete question.');
    }
}

export async function getEvaluationUsers() {

    try {
        return await prisma.user.findMany({
            orderBy: {
                lastname: 'desc',
            }
        });
    } catch (error) {
        //add error handling

    }
}

export async function getUserEvaluation(userId) {

    //Necesito nombre de usuario, resultados de evaluación
    //softskills registradas y preguntas asociadas con el id,
    //posiblemente realizarlo por medio de un join. Falta información
    //en base de datos.
    let questionsId = [], data, questionData;

    try {
        data = await prisma.user.findFirst({
            where: { id: +userId },
            include: {
                Questions: {
                    orderBy: { id: 'asc' },
                },
            }
        })

        for (let i in data.Questions) {
            questionsId.push(data.Questions[i].questionid);
        }

        questionData = await prisma.questionPool.findMany({
            where: { id: { in: questionsId } },
            select: {
                id: true,
                categoria: true,
                value: true,
                description: true,
            }
        });

    } catch (error) {
        //add error handling
        console.log(error);
        throw new Error('Failed to get user evaluation data.');
    }

    const fullData = [data, questionData, data.softskills.split(',').slice(0, 2)];

    //In index 0 the user data is returned and in index 1 the questions data is returned.
    //Both have the same index in the array.
    return fullData;
};

export async function getDashboardData() {
    try {

        const evAI_sum = await prisma.user.count({
            where: {
                status: 1,
            },
        })
        const evManual_sum = await prisma.user.count({
            where: {
                status: 3,
            }
        })

        const recentEvaluations = await prisma.user.findMany({
            where: {
                status: 1,
            },
            select: {
                id: true,
                name: true,
                lastname: true,
                overall: true,
            },
            orderBy: {
                date_finished: 'asc',
            },
            take: 5,
        });

        const userScores = await prisma.user.findMany({
            where: {
                NOT: {
                    overall: null,
                }
            },
            select: {
                overall: true,
                date_finished: true,
            }
        });

        const users = await prisma.user.findMany();
        let userScoresArray = [];
        for (let i = 0; i < users.length; i++){
            userScoresArray.push(users[i].overall)
        }
        const scoreRanges = new Array(10).fill(0);
        for (let i = 0; i < userScoresArray.length; i++){
            if (userScoresArray[i] > 1 && userScoresArray <= 10){
                scoreRanges[0]++;
            }
            else if(userScoresArray[i] >= 11 && userScoresArray[i] <= 20){
                scoreRanges[1]++;
            }
            else if(userScoresArray[i] >= 21 && userScoresArray[i] <= 30){
                scoreRanges[2]++;
            }
            else if(userScoresArray[i] >= 31 && userScoresArray[i] <= 40){
                scoreRanges[3]++;
            }
            else if(userScoresArray[i] >= 41 && userScoresArray[i] <= 50){
                scoreRanges[4]++;
            }
            else if(userScoresArray[i] >= 51 && userScoresArray[i] <= 60){
                scoreRanges[5]++;
            }
            else if(userScoresArray[i] >= 61 && userScoresArray[i] <= 70){
                scoreRanges[6]++;
            }
            else if(userScoresArray[i] >= 71 && userScoresArray[i] <= 80){
                scoreRanges[7]++;
            }
            else if(userScoresArray[i] >= 81 && userScoresArray[i] <= 90){
                scoreRanges[8]++;
            }
            else if(userScoresArray[i] >= 91 && userScoresArray[i] <= 100){
                scoreRanges[9]++;
            }
        }

        const questionDataScores = await prisma.questions.findMany({ 
            include: {
                QuestionPool: {},
            }
        });
        let englishCount = 0, frontendCount = 0, backendCount = 0, fullstackCount = 0;
        let scoreTotal = new Array(4).fill(0);
        let scoreAvgs = new Array(4).fill(0);
        for (let  i = 0; i < questionDataScores.length; i++){
            if (questionDataScores[i].score != 0){
                if (questionDataScores[i].QuestionPool.categoria == 'english'){
                    scoreTotal[0] += questionDataScores[i].score;
                    englishCount++;
                }
                else if (questionDataScores[i].QuestionPool.categoria == 'frontend'){
                    scoreTotal[1] += questionDataScores[i].score;
                    frontendCount++;
                }
                else if (questionDataScores[i].QuestionPool.categoria == 'backend'){
                    scoreTotal[2] += questionDataScores[i].score;
                    backendCount++;
                }
                else if (questionDataScores[i].QuestionPool.categoria == 'fullstack'){
                    scoreTotal[3] += questionDataScores[i].score;
                    fullstackCount++;
                }
            }
        }
        scoreAvgs[0] = Math.round(scoreTotal[0]/englishCount * 10);
        scoreAvgs[1] = Math.round(scoreTotal[1]/frontendCount * 10);
        scoreAvgs[2] = Math.round(scoreTotal[2]/backendCount * 10);
        scoreAvgs[3] = Math.round(scoreTotal[3]/fullstackCount * 10);
        console.log(scoreAvgs);

        return [evAI_sum, evManual_sum, recentEvaluations, userScores, scoreRanges, scoreAvgs];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function setScore(scoreData) {
    
    console.log(scoreData);

    try {
        return await prisma.questions.update({
            where: { id: +scoreData.id },
            data: {
                score: {
                    set: +scoreData.score,
                }
            },
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function setEvaluationState(userId){
    console.log(userId);
    try { 
        return await prisma.user.update({
            where: {id: +userId.id},
            data: {
                status: {
                    set: 3, 
                }
            }

        })
    } catch (error) {
        console.log(error);
        return error;
    }

}

export async function getGraphData(){
    try {
        const users = await prisma.user.findMany();
        let userScores = [];
        for (let i = 0; i < users.length; i++){
            userScores.push(users[i].overall)
        }
        const scoreRanges = new Array(10).fill(0);
        for (let i = 0; i < userScores.length; i++){
            if (userScores[i] > 0 && userScores <= 9){
                scoreRanges[0]++;
            }
            else if(userScores[i] >= 10 && userScores <= 19){
                scoreRanges[1]++;
            }
            else if(userScores[i] >= 20 && userScores <= 29){
                scoreRanges[2]++;
            }
            else if(userScores[i] >= 30 && userScores <= 39){
                scoreRanges[3]++;
            }
            else if(userScores[i] >= 40 && userScores <= 49){
                scoreRanges[4]++;
            }
            else if(userScores[i] >= 50 && userScores <= 59){
                scoreRanges[5]++;
            }
            else if(userScores[i] >= 60 && userScores <= 69){
                scoreRanges[6]++;
            }
            else if(userScores[i] >= 70 && userScores <= 79){
                scoreRanges[7]++;
            }
            else if(userScores[i] >= 80 && userScores <= 89){
                scoreRanges[8]++;
            }
            else if(userScores[i] >= 90 && userScores <= 100){
                scoreRanges[9]++;
            }
        }
        return scoreRanges;
    } catch (error) {
        console.log(error);
        return error;
    }
}