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

    const fullData = [data, questionData];

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
        /* avgEnglish = await prisma.questionPool.findMany({
            include: {questions: true},
        })

        console.log(evAI_sum); */

        return [evAI_sum, evManual_sum, recentEvaluations, userScores];
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