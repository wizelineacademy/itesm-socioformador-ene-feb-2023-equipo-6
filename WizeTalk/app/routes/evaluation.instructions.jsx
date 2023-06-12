import { Form, Link } from "@remix-run/react"
import { getUserFromSession, requireUserSession } from "../data/auth.server";
import { prisma } from "../data/database.server";
import { redirect } from "@remix-run/node";
import { saveEvaluationQuestions } from "../data/evaluation.server";
import { saveLocalQuestions, unansweredQuestions } from "../data/questions.server";

export default function () {
    return (
        < >
            <container>
                <div className="mx-[25%] py-8">
                    <section className="flex items-center flex-col ">
                        <h1 className="font-bold text-lg">Instructions</h1>
                        <p className="text-center py-8">
                            During this evaluation you will be scored based on your ability to speak in a clear and coherent manner. Additionally you will be evaluated on the correct use of vocabulary and grammar.
                        </p>
                    </section>
                    <section>
                        <p className="pb-8">Instructions:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>You will have 30 minutes to complete a set of 7 questions.</li>
                            <li>All answers will be recorded on video for their evaluation, make sure your camera and microphone are working correctly and the room you are in is as silent as possible.</li>
                            <li>For each question, there will be an audio explaining it. You will have 15 seconds after the audio finishes to start developing your answer.</li>
                            <li>Be aware that not all questions are the same length, a message will be visible telling you the recommended length for the answer. </li>
                            <li>Once the timer of the question has finished, the answer you provided will be uploaded as your final answer.  </li>
                        </ol>
                    </section>
                    <div className="flex justify-between py-10">
                        <Link>
                            <span className="block w-32 bg-wizeblue-300 font-bold border-solid border-4 border-wizeblue-100 text-center rounded-md">
                                Test Video
                            </span>
                        </Link>
                        <Form method="post" id="start-test">
                            <button type="submit" className="block w-32 bg-wizeblue-100 text-white font-bold border-solid border-4 border-wizeblue-100 rounded-md text-center">
                                Start Test
                            </button>
                        </Form>
                    </div>
                </div>
            </container>
        </ >
    );
}


export async function loader({ request }) {
    await requireUserSession(request);
    return null;
}

export async function action({request}){
    const userSession = await requireUserSession(request); 
    
    const userTest = await prisma.user.findUnique({
        where: {
            id: userSession,
        }
    }); 

    //Extraer preguntas por primera vez
    if(userTest.status == 0){
        
        var techQuestions = [];
        const englishQuestions = await prisma.questionPool.findMany({
            where: {
                categoria: "english"
            }
        }); 

        if(userTest.evaluation_type == 1){
            techQuestions = await prisma.questionPool.findMany({
                where: {
                    categoria: "frontend"
                }
            }); 
        }

        else if(userTest.evaluation_type == 1){
            frontend = ["HTML/CSS", "JavaScript", "Frontend Frameworks", "Web Accessibility", "User Interface (UI) Design"]; 

            for(subCategory in frontend){
                const questionsSubcategory = await prisma.questionPool.findMany({
                    where: {
                        subcategoria: frontend[subCategory]
                    }
                }); 
                techQuestions.push(...shuffleQ(questionsSubcategory, 1)); 
            }

            console.log("Updated techQuestions: ", techQuestions); 
            
        }

        else if(userTest.evaluation_type == 2){
            backend = ["Testing and Debugging", "System Architecture and Scalability", "API Development", "Programming Languages and Frameworks", "Database Management"]; 

            for(subCategory in backend){
                const questionsSubcategory = await prisma.questionPool.findMany({
                    where: {
                        subcategoria: backend[subCategory]
                    }
                }); 
                techQuestions.push(...shuffleQ(questionsSubcategory, 1)); 
            }

            console.log("Updated techQuestions: ", techQuestions); 
            
        }

        else if(userTest.evaluation_type == 3){
            fullstack = ["Frontend Development", "Backend Development", "Database Management", "API Development", "System Architecture and Deployment"]; 

            for(subCategory in fullstack){
                const questionsSubcategory = await prisma.questionPool.findMany({
                    where: {
                        subcategoria: fullstack[subCategory]
                    }
                }); 
                techQuestions.push(...shuffleQ(questionsSubcategory, 1)); 
            }

            console.log("Updated techQuestions: ", techQuestions); 
            
        }

        else{
            techQuestions = await prisma.questionPool.findMany({
                where: {
                    categoria: "fullstack"
                }
            }); 
        }

        questions = [...shuffleQ(englishQuestions, 2), ...shuffleQ(techQuestions,5)]; 
        console.log("Questions shuffled: ", questions); 
        await saveLocalQuestions(questions); 
        const link = await saveEvaluationQuestions(questions, userSession); 
        return redirect(link); 
    }

    else if(userTest.status == 1){
        await unansweredQuestions(userSession);
        return redirect('/evaluation/questions');
    }

    else{
        redirect('evaluation/results'); 
    }   

    console.log(userTest);
    return redirect('/evaluation/questions'); 
}

function shuffleQ(array, n){
    const shuffledArray = array.slice();

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  const result = shuffledArray.slice(0, n);

  return result;
}