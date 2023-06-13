import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { answeredQuestion, getStoredQuestions, unansweredQuestions } from "../data/questions.server"
import { requireUserSession } from "../data/auth.server";
import { BsPlay, BsFillPlayFill } from "react-icons/bs";
import { Form, useNavigate } from "@remix-run/react";
import VideoFunctionality from '../components/evaluation/VideoFunctionality';
import { createContext, useEffect, useState } from "react";
import useSound from "use-sound";
import { finishTest, getUserInfo, saveEnglishScores, saveSoftSkills, saveTechAnswers } from "../data/evaluation.server";
import { prisma } from "../data/database.server";
import { redirect } from "@remix-run/node";
import { s3Upload } from "../components/aws/s3";
import { s3GetTranscript } from "../components/aws/getTranscript";
import { getEnglishScore, getSoftSkills, getTechSkills } from "../data/openai";
import GeneratingResults from "../components/GeneratingResults";



export const audiosContext = createContext({isAudioDone: false})

export default function Questions(){
    const [_questions, userId, env_val, numberQuestion, count] = useLoaderData(); 
    //var question = questions[0];
    //console.log("Audio path: ", question.audio_path); 
    const [questions, setQuestions] = useState(_questions); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(numberQuestion); 
    const [question, setQuestion] = useState(questions[0]); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState();
    const [audio, setAudio] = useState(question.audio_path); 
    const [isRecording, setIsRecording] = useState(false); 
    const [isAudioDone, setIsAudioDone] = useState(false); 
    const [isNextAvailable, setIsNextAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log("IsNextAvailable: ", isNextAvailable); 
    console.log("Current question Index: ", currentQuestionIndex); 
    console.log("Current Question: ", question); 
    console.log("All Questions: ", questions); 
    console.log("currentQuestion: ", currentQuestion); 
    const submit = useSubmit(); 
    

    //Modificar el path del audio por el del servidor
    const [play, { pause, duration, sound }] = useSound(question.audio_path, {onend: () => {
        console.log('Audio finished'); 
        setIsAudioDone(true); 
    },});

    const navigate = useNavigate();

    async function playBtn() {
        setIsPlaying(true);
        setAudio(question.audio_path); 
        console.log("AUDIO PLAYING: ", audio); 
        play();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 500);
        return () => clearInterval(interval);
    }, [sound]);

    async function nextQuestion(){
        setIsNextAvailable(false); 
        setIsAudioDone(false); 
        if(isRecording){
            setIsRecording(false); 
        }
        if(currentQuestionIndex + 1 <= count){
            console.log("Current question: ", question); 
            console.log("All questions: ", questions); 
            //question = questions[currentQuestionIndex + 1];
            setCurrentQuestionIndex(currentQuestionIndex + 1);  
            setCurrentQuestion(currentQuestion + 1); 
            setQuestion(questions[currentQuestionIndex + 1]); 
            setIsPlaying(false); 
        } 

    }

    async function endTest(){
        if(isRecording){
            setIsRecording(false); 
        }
        await smth(2000); 
        setIsLoading(true); 
    }

    return(
        <>
            {!isLoading ? (<section className="flex flex-col justify-between">
                <div className="my-[1%]">
                    <div className="flex justify-center mx-[20%] py-5">
                        <h1 className="text-center font-sans text-lg font-bold">
                            Q{currentQuestion}. {question.instruction}
                        </h1>
                    </div>

                    <div className="flex justify-center drop-shadow-xl h-16 bg-white mx-[35%] items-center rounded-lg px-5">
                        {!isPlaying ?
                            (<button onClick={playBtn}>
                                <BsFillPlayFill size={40} color="#43C2FF" />
                            </button>)
                            : (
                                <BsPlay size={40} color="#43C2FF" />
                            )}
                        <input className="w-[60%]" type="range" value={seconds} disabled={true} max={Math.ceil((duration / 1000))} />
                    </div>
                </div>

                <audiosContext.Provider value={{isAudioDone: isAudioDone, isRecording: isRecording, setIsRecording: setIsRecording, isNextAvailable: isNextAvailable, setIsNextAvailable: setIsNextAvailable, question:question, userId:userId, env_val: env_val, currentQuestion: currentQuestion}}>
                    <div className="flex justify-center my-[3%] rounded-md">
                        <VideoFunctionality/>
                    </div>       
                </audiosContext.Provider>

                <div className="flex justify-center">
                    {(currentQuestion !== 7)?
                        <button disabled={!isNextAvailable} onClick={() => nextQuestion()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                            Next {audiosContext.time}
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button> : 
                        <button disabled={!isNextAvailable} onClick={() => endTest()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">End Test</button>
                    }
                </div> 
                                

            </section>) : (<GeneratingResults />)}
        </>
    )
}

export async function loader({request}){
    
    const userId = await requireUserSession(request);
    var env = process.env; 

    const questions = await unansweredQuestions(userId); 
    var count = 0; 
    
    for(question in questions){
        count = parseInt(question) + 1; 
    }

    console.log("Loader"); 

    const numberQuestion = 7 - count + 1; 

    if(numberQuestion <= 7){
        return [questions, userId, env, numberQuestion, count];
    }

    else{
        return redirect('/evaluation/results'); 
    }

}

export async function action({request}){
    var env = process.env; 
    if(request.method == "PUT"){
        answeredQuestion(await getStoredQuestions()); 
        return redirect('/evaluation/questions'); 
    }

    else if(request.method == "POST"){
        const formData = await request.formData(); //Get the newNote Forms information
        const noteData = Object.fromEntries(formData);
        console.log("Question JSON in questions: ", JSON.stringify(noteData.questionJSON)); 
        console.log("FormData: ", noteData); 
         const blob = noteData.blob; 
        console.log("Blob: ", blob);
        const videoName = noteData.videoName; 
        const keys = process.env; 
        console.log("Keys: ", noteData.keys);
        const user = noteData.user; 
        const question = noteData.question;  
        const questionId = noteData.questionId; 
        console.log("-----------------------------------------")
        console.log("Question Info ", question); 
        console.log("User: ", user); 
        console.log("questionId: ", questionId); 
        const questionCategory = noteData.questionCategory; 
        const questionValue = noteData.questionValue; 
        
        await smth(20000); 

        const transcript = await s3GetTranscript(videoName, keys, question, user);
        console.log("transcript questions: ", transcript);
        if(questionCategory == "english"){
            const result = await getSoftSkills(transcript, question, keys, user); 
            console.log("Softskills answer in questions: ", result); 
            await saveSoftSkills(questionId, user, result, transcript, videoName);
        }

        else{
            const result = await getTechSkills(transcript, question, keys, user, questionValue); 
            console.log("Tech answer in questions: ", result); 
            await saveTechAnswers(questionId, user, result, transcript, videoName);
        }
        if(noteData.currentQuestion == 7){
            await finishTest(env, user); 
            redirect('/evaluation/results'); 
        }
        /* const result = await getEnglishScore(transcript, question, keys, user); 
        
        console.log("Resultados de OPEN AI: ", result);  
        
        await saveEnglishScores(questionId, user, result, transcript, videoName);  */
        //answeredQuestion(await getStoredQuestions()); 
        //return redirect('/evaluation/questions');  
        
/*         const scores = noteData.scores;
        console.log("Scores: ", scores);  */
/*         const s3 = await s3Upload(blob, videoName, keys, user, question);
        console.log(s3);  */  
    }

    else{
        console.log("SMTH"); 
    }
    return null; 
}


async function smth(n){
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
      await sleep(n); 
      console.log("Hello from questions prev"); 
    return null; 
}