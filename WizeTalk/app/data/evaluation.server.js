import { redirect } from '@remix-run/node';
import { prisma } from './database.server';
import { getEnglishQuestionScore, saveLocalQuestions } from './questions.server';
import { getFinalSoftSkills } from './openai';

export async function getUserInfo(userId) {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
        });
        return user;
    } catch (error) {
        throw new Error('Failed to get user info');
    }
}

export async function getInfo(){
    console.log("GetInfoPre"); 
    const ev = await prisma.questions.findMany(); 
    console.log("GetInfo"); 
    return ev; 
}

//Guardar preguntas de la evaluación del usuario en la tabla Questions de la base de datos
export async function saveEvaluationQuestions(questions, userId){
    firstQuestion = questions[0].id; 
    var questionList = []; 

    for(i in questions){
        var values = {}; 
        values["questionid"] = questions[i].id; 
        values["userid"] = userId; 
        values["score"] = 0; 
        values["transcript"] = ""; 
        values["video_path"] = ""; 
        values["completed"] = 0; 
        questionList.push(values); 
    }

    console.log(questionList); 
    
     await prisma.questions.createMany({
        data: questionList
    });  

    await prisma.user.update({
        where: {
            id: userId
        }, 
        data: {
            status: 1
        }
    })

    const link = "/evaluation/questions";

    return link; 
}

export async function saveEnglishScores(questionId, userId, scores, transcript, videoName){
    const overall = Math.round((scores.grammar + scores.vocabulary + scores.coherence) / 3); 
    var id; 
    const f = await prisma.questions.findMany({
        where: {userid: parseInt(userId),}, 
        select: {
            id: true, questionid: true
        }
    }); 

    for(i in f){
        if(f[i].questionid == parseInt(questionId)){
            id = f[i].id; 
            console.log(id); 
            break; 
        }
    }

    console.log("FindMany: ", f); 
    const done = await prisma.questions.update({
        where: {
            id: id,
        }, 
        data: {
            grammar: scores.grammar, 
            vocabulary: scores.vocabulary, 
            coherence: scores.coherence, 
            completed: 1, 
            score: overall, 
            transcript: transcript,
            video_path: videoName
        }
    });  
    return done; 
}

export async function saveSoftSkills(questionId, userId, scores, transcript, videoName){
    const overall = Math.round((scores.grammar + scores.vocabulary + scores.coherence) / 3); 
    var id; 
    const f = await prisma.questions.findMany({
        where: {userid: parseInt(userId),}, 
        select: {
            id: true, questionid: true
        }
    }); 

    for(i in f){
        if(f[i].questionid == parseInt(questionId)){
            id = f[i].id; 
            console.log(id); 
            break; 
        }
    }

    const questionValue = await getEnglishQuestionScore(questionId); 
    console.log("SoftSkill question value: ", questionValue); 
    const finalScore = Math.round(overall / 100 * questionValue); 

    console.log("FindMany: ", f); 
    const done = await prisma.questions.update({
        where: {
            id: id,
        }, 
        data: {
            grammar: scores.grammar, 
            vocabulary: scores.vocabulary, 
            coherence: scores.coherence, 
            completed: 1, 
            score: finalScore, 
            transcript: transcript,
            video_path: videoName, 
            softskills: scores.softskills
        }
    });  
    return done; 
}

export async function saveTechAnswers(questionId, userId, scores, transcript, videoName){
    //const overall = Math.round((scores.grammar + scores.vocabulary + scores.coherence) / 3); 
    var id; 
    const f = await prisma.questions.findMany({
        where: {userid: parseInt(userId),}, 
        select: {
            id: true, questionid: true
        }
    }); 

    for(i in f){
        if(f[i].questionid == parseInt(questionId)){
            id = f[i].id; 
            console.log(id); 
            break; 
        }
    }

    console.log("FindMany: ", f); 
    const done = await prisma.questions.update({
        where: {
            id: id,
        }, 
        data: {
            grammar: scores.grammar, 
            vocabulary: scores.vocabulary, 
            coherence: scores.coherence, 
            completed: 1, 
            score: Math.round(scores.overall), 
            transcript: transcript,
            video_path: videoName, 
        }
    });  
    return done; 
}

export async function finishTest(keys, userId){
    var grammar = 0, vocabulary = 0, coherence = 0; 
    var softskills = ""; 
    var finalTechScore = 0; 
    var totalTechScore = 0; 
    await prisma.user.update({
        where: {
            id: parseInt(userId)
        }, 
        data: {
            status: 2, 
            date_finished: new Date().toISOString()
        }
    }); 

    const scores = await prisma.questions.findMany({
        where: {
            userid: parseInt(userId)
        }
    });

    for(i in scores){
        grammar = grammar + scores[i].grammar; 
        vocabulary = vocabulary + scores[i].vocabulary;
        coherence = coherence + scores[i].coherence;
        
        if(scores[i].softskills != null){
            softskills = softskills + scores[i].softskills + ','; 
        }

        else{
            const questionScore = await prisma.questionPool.findUnique({
                where: {
                    id: scores[i].questionid
                }                
            }); 
            console.log("questionScore value: ", questionScore.value); 
            totalTechScore = totalTechScore + questionScore.value; 
            finalTechScore = finalTechScore + scores[i].score; 
        }
    }

    console.log("totalTechScore: ", totalTechScore); 
    console.log("Final tech score 1: ", finalTechScore); 
    grammar = grammar/7; 
    vocabulary = vocabulary/7; 
    coherence = coherence/7; 
    finalTechScore = Math.round(finalTechScore * 100 / totalTechScore); 
    const overall = (finalTechScore + grammar + vocabulary + coherence) / 4; 
    console.log("Overall: ", overall); 
    const finalsoftskills = await getFinalSoftSkills(keys, softskills); 
    await prisma.user.update({
        where: {
            id: parseInt(userId),
        }, 
        data: {
            grammar: Math.round(grammar), 
            vocabulary: Math.round(vocabulary), 
            coherence: Math.round(coherence), 
            overall: Math.round(overall), 
            softskills: finalsoftskills
        }
    }); 
    return null; 
}


export async function testStatus(request) {
    const userId = await getUserFromSession(request);
    // console.log(userId);
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user.status == 0) {
        await prisma.user.update({ where: { id: userId, }, data: { status: 1, }, });
        return redirect('/evaluation/instructions');
    }
    else if (user.status == 1) {
        return redirect('/evaluation/results');
    }
}

export async function getSoftSkills() {
    var randomNum, randomNumArray = [];
    for (let i = 0; i < 3; i++) {
        randomNum = Math.floor(Math.random() * 7) + 1;
        while (randomNum == randomNumArray[0] || randomNum == randomNumArray[1]) {
            randomNum = Math.floor(Math.random() * 7) + 1;
        }
        randomNumArray[i] = randomNum;
        // console.log(randomNum)
    }

    const softSkills = await prisma.softSkills.findMany({ where: { OR: [{ id: randomNumArray[0] }, { id: randomNumArray[1] }, { id: randomNumArray[2] }], } })
    var skillsArray = [];
    for (let i = 0; i < softSkills.length; i++) {
        skillsArray[i] = softSkills[i].name
    }
    return skillsArray
}

