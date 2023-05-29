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

export async function getEvaluationUsers(){

    try {
        await prisma.user.findMany({
            orderBy : {
                lastname : 'desc',
            }
        });
    } catch (error) {
        //add error handling
        
    }
}