import { prisma } from "./database.server";

//Function that returns questions in QuestionPool table
//given a category.

export async function getCategoryQuestions({ category }) {
    const category_questions = await prisma.questionPool.findMany(
        { where: { categoria: category } }
    );
    return category_questions;
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

    let questionsId = [];

    try {
        data = await prisma.user.findFirst({
            where: { id: +userId },
            include: { questions: true,}
        })

        for (i in data.questions) {
            questionsId.push(data.questions[i].question_id);
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

export async function getDashboardData(){
    try{
        
        evAI_sum = await prisma.user.count({
            where: {
                status: 1,
            },
        })
        evManual_sum = await prisma.user.count({
            where: {
                status: 2,
            }
        })

        recentEvaluations = await prisma.user.findMany({
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
        /* avgEnglish = await prisma.questionPool.findMany({
            include: {questions: true},
        })

        console.log(evAI_sum); */

        return [evAI_sum, evManual_sum, recentEvaluations];
    } catch (error) {
        console.log(error);
        return null;
    }
}